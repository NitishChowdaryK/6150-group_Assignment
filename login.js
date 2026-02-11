(() => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const alertBox = document.getElementById("formAlert");
  const togglePw = document.getElementById("togglePw");

  if (!form || !email || !password || !alertBox) {
    console.error("Missing required element(s). Check IDs in login.html");
    if (alertBox) {
      alertBox.className = "alert alert-danger";
      alertBox.textContent = "Setup error: Missing form fields. Check element IDs in login.html.";
      alertBox.classList.remove("d-none");
    } else {
      alert("Setup error: Missing form fields. Check element IDs in login.html.");
    }
    return;
  }
})();