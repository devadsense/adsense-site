document.addEventListener("DOMContentLoaded", () => {
  // Default post data
  const defaultPosts = [
    {
      title: "Mahindra Bolero New Model 2025",
      content: "Mahindra Bolero भारतीय बाजार में एक लोकप्रिय SUV है, जिसे दमदार परफॉर्मेंस और किफायती कीमत के लिए जाना जाता है...",
      time: "2025-04-19 10:00 AM",
      address: "post/bolero.html",
      image: "post/photo/bolero.jpg"
    },
    {
      title: "Alto K10 की बिक्री ने बनाया नया रिकॉर्ड",
      content: "Maruti Suzuki Alto K10 भारतीय ऑटोमोबाइल बाजार में एक प्रतिष्ठित और लोकप्रिय कार बन चुकी है...",
      time: "2025-04-18 09:30 AM",
      address: "post/alto-k10.html",
      image: "post/photo/alto-k10.jpg"
    },
    {
      title: "Sports: Football World Cup Finals",
      content: "The Football World Cup is reaching its final stages...",
      time: "2025-04-17 08:15 PM",
      address: "post/post3.html",
      image: "post/photo/alto-k10.jpg"
    },
    {
      title: "Electric Vehicles: The Future of Cars",
      content: "Electric vehicles are revolutionizing the automotive industry...",
      time: "2025-04-15 06:30 PM",
      address: "post/ev.html",
      image: "post/photo/alto-k10.jpg"
    },
    {
      title: "New Innovations in Autonomous Driving",
      content: "The latest advancements in autonomous driving technology...",
      time: "2025-04-14 04:00 PM",
      address: "post/autonomous-driving.html",
      image: "post/photo/alto-k10.jpg"
    }
  ];

  // Save default posts to localStorage if not already present
  if (!localStorage.getItem("newsPosts")) {
    localStorage.setItem("newsPosts", JSON.stringify(defaultPosts));
  }

  const posts = JSON.parse(localStorage.getItem("newsPosts")) || [];
  let currentPage = 1;
  const postsPerPage = 5;

  const latestEl = document.getElementById("latestPost");
  const containerEl = document.getElementById("newsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Show only the first/latest post
  function displayLatestPost() {
    if (latestEl && posts.length > 0) {
      const p = posts[0];
      latestEl.innerHTML = `
        <div class="news-post">
          <a href="${p.address}">
            <img src="${p.image}" alt="${p.title}" onerror="this.src='fallback.jpg'" />
            <div class="content">
              <h3>${p.title}</h3>
              <p>${p.content.slice(0, 100)}...</p>
              <p class="timestamp">${p.time}</p>
            </div>
          </a>
        </div>
      `;
    }
  }

  // Show remaining posts paginated
  function displayPosts() {
    if (!containerEl) return;

    containerEl.innerHTML = "";

    // Skip the first post for pagination
    const remainingPosts = posts.slice(1);
    const start = (currentPage - 1) * postsPerPage;
    const paginatedPosts = remainingPosts.slice(start, start + postsPerPage);

    if (paginatedPosts.length === 0) {
      containerEl.innerHTML = "<p>No news available.</p>";
      return;
    }

    paginatedPosts.forEach(p => {
      const div = document.createElement("div");
      div.className = "news-post";
      div.innerHTML = `
        <a href="${p.address}">
          <img src="${p.image}" alt="${p.title}" onerror="this.src='fallback.jpg'" />
          <div class="content">
            <h3>${p.title}</h3>
            <p>${p.content.slice(0, 100)}...</p>
            <p class="timestamp">${p.time}</p>
          </div>
        </a>
      `;
      containerEl.appendChild(div);
    });

    // Update pagination buttons
    const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }

  // Handle pagination button events
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

  // Initial load
  displayLatestPost();
  displayPosts();
});
