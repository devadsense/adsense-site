const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startButton = document.getElementById('startButton');
const gameMessage = document.getElementById('game-message');

const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const shootButton = document.getElementById('shootButton');

// --- डायनामिक कैनवास साइज़ और गेम स्टेट ---
let GAME_WIDTH;
let GAME_HEIGHT;
let gameRunning = false;
let animationFrameId;

// गति प्रबंधन
let BASE_ENEMY_SPEED = 1.5;
let BASE_BULLET_SPEED = 8;
let currentEnemySpeed = BASE_ENEMY_SPEED;
let currentBulletSpeed = BASE_BULLET_SPEED;
const SPEED_INCREASE_RATE = 0.1;

let score = 0;
let lives = 3;
const explosions = [];

// --- यूटिलिटी फंक्शन्स ---
function detectCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) { 
        explosions.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1, 
            color: color,
            velocity: {
                x: (Math.random() - 0.5) * (Math.random() * 6), 
                y: (Math.random() - 0.5) * (Math.random() * 6)
            },
            life: 50 
        });
    }
}

function drawExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const p = explosions[i];
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.life <= 0) {
            explosions.splice(i, 1);
        }
    }
}

// --- 1. प्लेयर (Player): गनशिप ---
const player = {
    width: 50,
    height: 50,
    x: 0, 
    y: 0,
    speed: 5,
    dx: 0, 
    resetPosition() {
        this.x = GAME_WIDTH / 2 - this.width / 2;
        this.y = GAME_HEIGHT - 70;
    },
    draw() {
        ctx.shadowColor = 'cyan';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x + this.width * 0.75, this.y + this.height * 0.8); 
        ctx.lineTo(this.x + this.width * 0.25, this.y + this.height * 0.8); 
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(this.x + this.width / 2 - 2, this.y - 10, 4, 10);
        
        ctx.shadowBlur = 0;
    },
    move() {
        this.x += this.dx;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > GAME_WIDTH) this.x = GAME_WIDTH - this.width;
    }
};

// --- 2. गोलियाँ (Bullets): लेज़र ---
const bullets = [];
function createBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 2.5,
        y: player.y - 10, 
        width: 5,
        height: 15,
        speed: currentBulletSpeed,
        draw() { 
            ctx.fillStyle = 'lime';
            ctx.shadowColor = 'lime';
            ctx.shadowBlur = 8;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.shadowBlur = 0;
        },
        move() {
            this.y -= this.speed;
        }
    });
}

// --- 3. दुश्मन (Enemies): दुश्मन कार ---
const enemies = [];
let enemySpawnInterval = 1000; 
let lastEnemySpawnTime = 0;

function createEnemy() {
    enemies.push({
        x: Math.random() * (GAME_WIDTH - 50),
        y: -50,
        width: 40,
        height: 40,
        speed: currentEnemySpeed,
        draw() {
            ctx.shadowColor = 'red';
            ctx.shadowBlur = 10;
            
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + 5, this.y + 10, this.width - 10, this.height - 10);
            
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + 5, this.y + 10);
            ctx.lineTo(this.x + this.width - 5, this.y + 10);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = '#222';
            ctx.fillRect(this.x, this.y + this.height - 10, 5, 10);
            ctx.fillRect(this.x + this.width - 5, this.y + this.height - 10, 5, 10);

            ctx.shadowBlur = 0;
        },
        move() {
            this.y += this.speed;
        }
    });
}

// --- मुख्य गेम लूप ---
function update() {
    if (!gameRunning) return;

    ctx.fillStyle = '#000000'; 
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawExplosions();

    player.move();
    player.draw();

    // बुलेट्स और टकराव
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.move();
        bullet.draw();
        if (bullet.y + bullet.height < 0) { bullets.splice(i, 1); continue; }

        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (detectCollision(bullet, enemy)) {
                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'red'); 
                bullets.splice(i, 1);
                enemies.splice(j, 1); 
                score += 10;
                scoreDisplay.textContent = score;
                break; 
            }
        }
    }

    // दुश्मन स्पॉन, गति और अपडेट
    const currentTime = Date.now();
    if (currentTime - lastEnemySpawnTime > enemySpawnInterval) {
        createEnemy();
        lastEnemySpawnTime = currentTime;
        
        currentEnemySpeed += SPEED_INCREASE_RATE;
        currentBulletSpeed += SPEED_INCREASE_RATE / 2;
        enemySpawnInterval = Math.max(700, enemySpawnInterval - 5); 
    }
    
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.move();
        enemy.draw();

        // टक्कर: लाइफ कम करें
        if (detectCollision(player, enemy)) {
            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 'red'); 
            createExplosion(player.x + player.width / 2, player.y + player.height / 2, 'cyan'); 

            enemies.splice(i, 1);
            lives--;
            livesDisplay.textContent = lives;
            if (lives <= 0) {
                endGame();
                return;
            }
        } 
        // नीचे से निकलना: बस हटा दें
        else if (enemy.y > GAME_HEIGHT) {
             enemies.splice(i, 1);
        }
    }

    animationFrameId = requestAnimationFrame(update);
}

// --- 5. गेम कंट्रोल फंक्शन्स ---
function resizeGame() {
    const container = canvas.parentElement;
    GAME_WIDTH = container.clientWidth; 
    GAME_HEIGHT = container.clientHeight;

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    
    player.resetPosition();

    if (!gameRunning) {
        player.draw();
    }
}

function startGame() {
    currentEnemySpeed = BASE_ENEMY_SPEED;
    currentBulletSpeed = BASE_BULLET_SPEED;
    enemySpawnInterval = 1000;
    
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    
    bullets.length = 0; 
    enemies.length = 0; 
    explosions.length = 0; 

    gameMessage.classList.add('hidden'); 
    startButton.textContent = "गेम चल रहा है...";
    startButton.disabled = true;

    if (animationFrameId) { cancelAnimationFrame(animationFrameId); }

    resizeGame(); 
    
    gameRunning = true;
    update(); 
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId); 
    gameMessage.textContent = `गेम ओवर! स्कोर: ${score}`;
    gameMessage.classList.remove('hidden'); 
    startButton.textContent = "नया गेम शुरू करें";
    startButton.disabled = false;
}

// --- 6. इवेंट लिसनर्स (कीबोर्ड और टच) ---
// कीबोर्ड
document.addEventListener('keydown', e => {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = player.speed;
    } else if (e.key === ' ' && !e.repeat) { 
        createBullet(); 
    }
});

document.addEventListener('keyup', e => {
    if (!gameRunning) return;
    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') && player.dx !== 0) {
        player.dx = 0; 
    }
});

// टच कंट्रोल्स
leftButton.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameRunning) player.dx = -player.speed; });
rightButton.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameRunning) player.dx = player.speed; });
shootButton.addEventListener('touchstart', (e) => { e.preventDefault(); if(gameRunning) createBullet(); });

leftButton.addEventListener('touchend', () => { if(player.dx < 0) player.dx = 0; });
rightButton.addEventListener('touchend', () => { if(player.dx > 0) player.dx = 0; });

// माउस इवेंट्स (डेस्कटॉप पर टच बटन इस्तेमाल करने के लिए)
leftButton.addEventListener('mousedown', () => { if(gameRunning) player.dx = -player.speed; });
rightButton.addEventListener('mousedown', () => { if(gameRunning) player.dx = player.speed; });
shootButton.addEventListener('mousedown', () => { if(gameRunning) createBullet(); });

leftButton.addEventListener('mouseup', () => { if(player.dx < 0) player.dx = 0; });
rightButton.addEventListener('mouseup', () => { if(player.dx > 0) player.dx = 0; });


startButton.addEventListener('click', startGame);
window.addEventListener('resize', resizeGame);

window.addEventListener('load', resizeGame);
