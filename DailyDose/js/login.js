document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the values from the input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;

    // Check if all fields are filled
    if (!email || !password || !fullName) {
      alert("Please fill in all fields.");
      return;
    }

    // Store data in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("userFullName", fullName);
    localStorage.setItem("loggedIn", "true");

    // Redirect to dashboard
    window.location.href = "welcome-dashboard.html";
  });
});