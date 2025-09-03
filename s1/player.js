// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, set, update, increment } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCSPNBeymwFh_r1pozKcsqAZgtrkRBQGzg",
  authDomain: "mix-setup.firebaseapp.com",
  databaseURL: "https://mix-setup-default-rtdb.firebaseio.com",
  projectId: "mix-setup",
  storageBucket: "mix-setup.firebasestorage.app",
  messagingSenderId: "534677715300",
  appId: "1:534677715300:web:24d809fce39c458c326271",
  measurementId: "G-VBEYFDZDHC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Get short ID from URL
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let shortID = pathSegments[pathSegments.length - 1] || null;

if (!shortID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center;'>❌ Invalid or Missing ID</h2>";
} else {
  const finalRedirect = `https://1024terabox.com/s/${shortID}`;
  const playerBox = document.getElementById('playerBox');
  const overlay = document.getElementById('overlayText');
  let state = 0;
  let countdown = 6;
  let intervalId = null;

  // Main function to ensure module and count
  async function trackClickAndView() {
    const linkRef = ref(db, `shortLinks/${shortID}`);
    try {
      const snapshot = await get(linkRef);

      // If not exists, set default
      if (!snapshot.exists()) {
        await set(linkRef, {
          views: 1,
          lastClicked: Date.now()
        });
      } else {
        await update(linkRef, {
          views: increment(1),
          lastClicked: Date.now()
        });
      }

      logEvent(analytics, "link_clicked", { shortID: shortID });
    } catch (error) {
      console.error("🔥 Firebase error:", error);
    }
  }

  // Countdown logic
  function startCountdown() {
    overlay.textContent = `⏳ Please wait ${countdown} sec...`;
    intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        countdown--;
        overlay.textContent = `⏳ Please wait ${countdown} sec...`;
        if (countdown <= 0) {
          clearInterval(intervalId);
          overlay.innerHTML = `<button id="openBtn" class="open-btn">✅ Open Now</button>`;
          document.getElementById("openBtn").addEventListener("click", () => {
            trackClickAndView();
            window.location.href = finalRedirect;
          });
          state = 2;
        }
      }
    }, 1000);
  }

  // Ads refresh
  function refreshAds() {
    if (window.googletag && googletag.pubads) {
      googletag.cmd.push(() => googletag.pubads().refresh());
    }
  }

  // Player Click Handler
  playerBox.addEventListener('click', () => {
    if (state === 0) {
      window.open("https://obqj2.com/4/9356126", "_blank");
      state = 1;
    } else if (state === 1) {
      startCountdown();
      refreshAds();
    }
  });

  // Count immediately when page opens
  trackClickAndView();

  // Handle refresh/back
  window.addEventListener("pageshow", function (e) {
    if (e.persisted || window.performance.navigation.type === 2) {
      refreshAds();
    }
  });
}
