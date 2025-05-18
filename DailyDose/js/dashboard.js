// Check if user is logged in
const isLoggedIn = localStorage.getItem("loggedIn");
const userFullName = localStorage.getItem("userFullName");

// If not logged in, redirect to login page
if (!isLoggedIn) {
  window.location.href = "login.html"; // Redirect to login
}

// Show welcome message if logged in
document.querySelector('header').innerHTML = `
  <h1>Welcome, ${userFullName}!</h1>
  <nav>
    <a href="index.html">Home</a>
    <a href="dashboard.html">Dashboard</a>
    <a href="about.html">About</a>
    <a href="#" id="logout">Logout</a>
  </nav>
`;

// Logout functionality with confirmation popup
document.getElementById("logout").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default link behavior
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  
  if (confirmLogout) {
    // Clear localStorage and redirect to homepage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    window.location.href = "index.html"; // Redirect to homepage
  }
});