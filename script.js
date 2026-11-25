let blogs = JSON.parse(localStorage.getItem("codomaxBlogs")) || [
  {
    title: "Welcome to Codomax Blog App",
    category: "Web Dev",
    content: "This is a responsive frontend blog application built with HTML, CSS, and JavaScript."
  }
];

let currentUser = localStorage.getItem("codomaxUser") || null;

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((sec) => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
  if (sectionId === "home") renderBlogs();
  if (sectionId === "dashboard") updateDashboard();
}

function renderBlogs() {
  const blogList = document.getElementById("blogList");
  blogList.innerHTML = "";

  blogs.forEach((blog) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="category-badge">${blog.category}</span>
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
    `;
    blogList.appendChild(card);
  });
}

function updateDashboard() {
  document.getElementById("userStatus").textContent = currentUser ? currentUser : "Guest";
  document.getElementById("blogCount").textContent = blogs.length;
}

document.getElementById("blogForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("blogTitle").value.trim();
  const category = document.getElementById("blogCategory").value.trim();
  const content = document.getElementById("blogContent").value.trim();

  blogs.unshift({ title, category, content });
  localStorage.setItem("codomaxBlogs", JSON.stringify(blogs));

  this.reset();
  alert("Blog published successfully!");
  showSection("home");
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  currentUser = email;
  localStorage.setItem("codomaxUser", currentUser);
  this.reset();
  alert("Logged in successfully!");
  showSection("dashboard");
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  currentUser = `${name} (${email})`;
  localStorage.setItem("codomaxUser", currentUser);
  this.reset();
  alert("Registered successfully!");
  showSection("dashboard");
});

renderBlogs();
updateDashboard();
