document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn");
  const userFullName = localStorage.getItem("userFullName");

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    window.location.href = "login.html"; // Redirect to login page
    return;
  }

  // Update header with welcome message and navigation
  const header = document.querySelector('header');
  header.innerHTML = `
    <h1>Welcome, ${userFullName}!</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="dashboard.html">Dashboard</a>
      <a href="about.html">About</a>
      <a href="#" id="logout">Logout</a>
    </nav>
  `;

  // Attach logout event listener AFTER updating the header
  document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userFullName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
      window.location.href = "index.html"; // Redirect to homepage
    }
  });
});