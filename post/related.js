// dummyData.js

// Sample 5 posts for testing
const examplePosts = [
  {
    title: "Climate Summit 2025: Global Leaders Unite",
    content: "World leaders have come together to discuss urgent environmental challenges...",
    time: "2025-04-18 10:00 AM",
    address: "post/post1.html",
    image: "post/images/climate.jpg"
  },
  {
    title: "AI in Healthcare: The Next Revolution",
    content: "Artificial Intelligence is reshaping the medical world with diagnostics, surgery, and more...",
    time: "2025-04-18 09:30 AM",
    address: "post/post2.html",
    image: "post/images/ai-health.jpg"
  },
  {
    title: "Football World Cup: Historic Final Ahead",
    content: "The two strongest teams are all set to clash in the most awaited final...",
    time: "2025-04-17 08:15 PM",
    address: "post/post3.html",
    image: "post/images/football.jpg"
  },
  {
    title: "Tech Giants Launch Foldable Tablets",
    content: "Major companies have unveiled next-gen foldable tablets with advanced features...",
    time: "2025-04-17 02:30 PM",
    address: "post/post4.html",
    image: "post/images/foldable.jpg"
  },
  {
    title: "SpaceX Sets Date for Mars Cargo Mission",
    content: "Elon Musk’s SpaceX announces the next Mars cargo launch to deliver supplies...",
    time: "2025-04-16 06:45 PM",
    address: "post/post5.html",
    image: "post/images/spacex.jpg"
  }
];

// Set to localStorage only if not already set
if (!localStorage.getItem("newsPosts")) {
  localStorage.setItem("newsPosts", JSON.stringify(examplePosts));
  console.log("Dummy newsPosts added to localStorage.");
} else {
  console.log("newsPosts already exists in localStorage.");
}
