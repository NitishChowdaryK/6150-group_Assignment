(() => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const alertBox = document.getElementById("formAlert");
  const togglePw = document.getElementById("togglePw");

  // If any required element is missing, show a clear message and stop.
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

  function setAlert(type, msg) {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = msg;
    alertBox.classList.remove("d-none");
  }

  function clearAlert() {
    alertBox.classList.add("d-none");
    alertBox.textContent = "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  function isValidPassword(value) {
    const v = value.trim();
    return v.length >= 8 && /\d/.test(v);
  }

  if (togglePw) {
    togglePw.addEventListener("click", () => {
      const isHidden = password.type === "password";
      password.type = isHidden ? "text" : "password";
      togglePw.textContent = isHidden ? "Hide" : "Show";
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert();

    let ok = true;

    // Email validation
    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      ok = false;
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    // Password validation
    if (!password.value.trim() || !isValidPassword(password.value)) {
      password.classList.add("is-invalid");
      password.classList.remove("is-valid");
      ok = false;
    } else {
      password.classList.add("is-valid");
      password.classList.remove("is-invalid");
    }

    form.classList.add("was-validated");

    if (!ok) {
      setAlert("danger", "Please fix the highlighted fields and try again.");
      return;
    }

    setAlert("success", "Login successful (demo)! Redirecting to home...");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
})();