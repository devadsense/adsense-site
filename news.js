// news.js

let posts = [
    {
        title:   "Breaking News: Global Climate Summit",
        content: "World leaders gather to discuss urgent climate issues. The summit aims to create new strategies to reduce global warming.",
        time:    "2025-04-18 10:00 AM",
        address: "post/post1.html"
    },
    {
        title:   "Technology Advances: AI in Healthcare",
        content: "Artificial intelligence is revolutionizing the healthcare industry, making diagnosis more accurate and accessible.",
        time:    "2025-04-18 09:30 AM",
        address: "post/post2.html"
    },
    {
        title:   "Sports: Football World Cup Finals",
        content: "The Football World Cup is reaching its final stages with the two most formidable teams about to clash for the trophy.",
        time:    "2025-04-17 08:15 PM",
        address: "post/post3.html"
    }
];

// Save posts to localStorage
localStorage.setItem("newsPosts", JSON.stringify(posts));
