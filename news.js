document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ news.js loaded");

  const posts = [
    {
      title: "अब हर कोई ले सकेगा करोड़पतियों की गाड़ी Hyundai Aura 2025 शानदार लुक और किफायती कीमत में",
      content: "नमस्कार दोस्तों! एक बार फिर से स्वागत है आपके अपने ब्लॉग पर, जहां हम आपके लिए ले कर आए हैं एक शानदार फोर-व्हीलर कार की जानकारी। ...",
      time: "2025-04-16 04:30 AM",
      address: "post/Aura",
      image: "post/photo/Aura.jpg"
    },
    {
      title: "Mahindra Bolero New Model 2025",
      content: "Mahindra Bolero भारतीय बाजार में एक लोकप्रिय SUV है...",
      time: "2025-04-19 1:00 PM",
      address: "post/bolero",
      image: "post/photo/bolero.jpg"
    },
    {
      title: "Alto K10 की बिक्री ने बनाया नया रिकॉर्ड",
      content: "Maruti Suzuki Alto K10 एक प्रतिष्ठित और लोकप्रिय कार बन चुकी है...",
      time: "2025-04-19 12:30 AM",
      address: "post/alto-k10",
      image: "post/photo/alto-k10.jpg"
    },
    {
      title: "TVS X Electric Scooter 2025",
      content: "भारतीय बाजार में इलेक्ट्रिक स्कूटर की मांग तेजी से बढ़ रही है, और कई कंपनियां नए-नए मॉडल लॉन्च कर रही हैं।...",
      time: "2025-04-19 10:00 AM",
      address: "post/tvs",
      image: "post/photo/TVS.jpg"
    },
    {
      title: "Maruti Suzuki e Vitara 2025",
      content: "भारत में इलेक्ट्रिक व्हीकल्स का बाजार तेजी से बढ़ रहा है, और अब Maruti Suzuki भी इस रेस में पूरी तैयारी के साथ उतरने जा रही है।...",
      time: "2025-04-19 09:40 AM",
      address: "post/Maruti",
      image: "post/photo/Maruti.jpg"
    },
    {
      title: "Toyota Hilux 2025",
      content: "Toyota एक ऐसी कंपनी है जो न केवल भारत में बल्कि पूरी दुनिया में अपने दमदार वाहनों के लिए मशहूर है। यह हमेशा अपनी शानदार तकनीक और विश्वसनीयता के कारण चर्चा में रहती है। ...",
      time: "2025-04-19 11:30 AM",
      address: "post/Toyota",
      image: "post/photo/Toyota.jpg"
    },
    {
      title: "महिंद्रा मराज़ो 2025: दमदार इंजन, शानदार माइलेज और किफायती SUV",
      content: "भारतीय ऑटोमोबाइल बाजार में महिंद्रा अपनी दमदार और किफायती गाड़ियों के लिए पहचाना जाता है। 2025 में कंपनी अपनी नई SUV, महिंद्रा मराज़ो, को लॉन्च करने जा रही है।...",
      time: "2025-04-19 10:30 AM",
      address: "post/Marazzo",
      image: "post/photo/Marazzo.jpg"
    },
    {
      title: "OMG! Suzuki Gixxer SF 250 स्पोर्ट्स बाइक हुई पहले से सस्ती, जानिए नई कीमत और फीचर्स",
      content: "अगर आप एक पावरफुल स्पोर्ट्स बाइक की तलाश में हैं, जो Yamaha R15 से भी ज्यादा दमदार हो और कम कीमत में मिले, तो Suzuki Gixxer SF 250 आपके लिए बेहतरीन विकल्प हो सकता है। ...",
      time: "2025-04-17 09:30 AM",
      address: "post/Suzuki",
      image: "post/photo/Suzuki.jpg"
    },
    {
      title: "TVS Fiero 125 के स्मार्ट फीचर्स",
      content: "अगर आप एक बेहतरीन टू-व्हीलर बाइक खरीदने की सोच रहे हैं, तो आपके लिए एक शानदार विकल्प आ चुका है।  ...",
      time: "2025-04-17 01:30 AM",
      address: "post/TVSFiero125",
      image: "post/photo/TVSFiero125.jpg"
    },
    {
      title: "Rajdoot 350 New Bike 2025: हीरो स्प्लेंडर से भी सस्ती",
      content: "भारतीय बाजार में नई बाइक का इंतजार कर रहे ग्राहकों के लिए एक बड़ी खुशखबरी है। Rajdoot 350 New Bike 2025 आने वाली है,...",
      time: "2025-04-16 09:30 AM",
      address: "post/Rajdoot",
      image: "post/photo/Rajdoot.jpg"
    },
    {
      title: "G-Wagon Electric 2025: लग्जरी SUV अब किफायती कीमत में",
      content: "Mercedes-Benz अपनी मशहूर G-Wagon को इलेक्ट्रिक वर्जन में लॉन्च करने की तैयारी में है। ताजा रिपोर्ट्स के मुताबिक, कंपनी इसे भारतीय बाजार में एक किफायती मॉडल के रूप में पेश करने की योजना बना रही है। ...",
      time: "2025-04-16 07:30 AM",
      address: "post/Wagon",
      image: "post/photo/Wagon.jpg"
    },
    {
      title: "अब बाइक की कीमत में घर लाएं कार, Maruti Alto 800 बनी बेस्ट फैमिली कार",
      content: "भारत में जब किफायती और भरोसेमंद कारों की बात आती है, तो मारुति सुजुकी ऑल्टो 800 का नाम सबसे पहले आता है। यह कार खासतौर पर मिडिल क्लास परिवारों के लिए एक बेहतरीन विकल्प साबित हुई है ...",
      time: "2025-04-16 06:30 AM",
      address: "post/Alto",
      image: "post/photo/Alto.jpg"
    },
    {
      title: "Maruti Cervo सिर्फ ₹2.46 लाख में, जानिए इसके शानदार फीचर्स और लॉन्चिंग डिटेल",
      content: "भारतीय बाजार में किफायती फोर-व्हीलर की मांग लगातार बढ़ रही है। इसी को ध्यान में रखते हुए मारुति सुजुकी एक नया और दमदार वाहन पेश करने की योजना बना रही है। ...",
      time: "2025-04-16 05:30 AM",
      address: "post/Cervo",
      image: "post/photo/Cervo.jpg"
    },
    {
      title: "₹2.4 लाख में खरीदें Maruti Suzuki Cervo, बेहतरीन माइलेज और लेटेस्ट फीचर्स के साथ",
      content: "भारत में छोटी कारों की हमेशा से मांग रही है, और इसी को ध्यान में रखते हुए मारुति सुजुकी ने अपनी नई कार सर्वो लॉन्च की है। यह कार न केवल अपनी किफायती कीमत के लिए जानी जाती है ...",
      time: "2025-04-15 03:30 AM",
      address: "post/SuzukiCervo",
      image: "post/photo/SuzukiCervo.jpg"
    }
  ];

  let currentPage = 1;
  const postsPerPage = 5;

  const latestEl = document.getElementById("latestPost");
  const containerEl = document.getElementById("newsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function createPostHTML(post) {
    return `
      <div class="news-post">
        <a href="${post.address}">
          <img src="${post.image}" alt="${post.title}" onerror="this.src='fallback.jpg'" />
          <div class="content">
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p>
            <p class="timestamp">${post.time}</p>
          </div>
        </a>
      </div>
    `;
  }

  function displayLatestPost() {
    if (latestEl && posts.length > 0) {
      latestEl.innerHTML = createPostHTML(posts[0]);
    }
  }

  function displayPosts() {
    if (!containerEl) return;

    const remainingPosts = posts.slice(1);
    const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    const paginatedPosts = remainingPosts.slice(start, start + postsPerPage);

    containerEl.innerHTML = paginatedPosts.length
      ? paginatedPosts.map(createPostHTML).join("")
      : "<p>No news available.</p>";

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayPosts();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil((posts.length - 1) / postsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayPosts();
      }
    });
  }

  displayLatestPost();
  displayPosts();
});
