(() => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const alertBox = document.getElementById("formAlert");
  const togglePw = document.getElementById("togglePw");
  const pwCounter = document.getElementById("pwCounter");

  // Feedback elements
  const emailInvalid = document.getElementById("emailInvalid");
  const emailValid = document.getElementById("emailValid");
  const pwInvalid = document.getElementById("pwInvalid");
  const pwValid = document.getElementById("pwValid");

  if (!form || !email || !password || !alertBox) {
    console.error("Missing required element(s).");
    return;
  }

  /* ---- Helpers ---- */
  function setAlert(type, msg) {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = msg;
    alertBox.classList.remove("d-none");
  }

  function clearAlert() {
    alertBox.classList.add("d-none");
    alertBox.textContent = "";
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  function isValidPassword(v) {
    const t = v.trim();
    return t.length >= 8 && t.length <= 20 && /\d/.test(t);
  }

  function showFeedback(input, isValid, validEl, invalidEl) {
    if (isValid) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      if (invalidEl) invalidEl.classList.add("d-none");
      if (validEl) validEl.classList.remove("d-none");
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (validEl) validEl.classList.add("d-none");
      if (invalidEl) invalidEl.classList.remove("d-none");
    }
  }

  function resetFeedback(input, validEl, invalidEl) {
    input.classList.remove("is-valid", "is-invalid");
    if (validEl) validEl.classList.add("d-none");
    if (invalidEl) invalidEl.classList.add("d-none");
  }

  /* ---- localStorage user lookup ---- */
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("novacart_users")) || [];
    } catch {
      return [];
    }
  }

  /* ---- Show success message if redirected from registration ---- */
  const params = new URLSearchParams(window.location.search);
  if (params.get("registered") === "1") {
    setAlert("success", "Account created successfully! Please sign in.");
    // Clean URL
    window.history.replaceState({}, "", "login.html");
  }

  /* ---- Real-time Email Validation ---- */
  email.addEventListener("input", () => {
    clearAlert();
    const val = email.value.trim();
    if (val.length === 0) return resetFeedback(email, emailValid, emailInvalid);
    if (val.includes("@")) {
      showFeedback(email, isValidEmail(val), emailValid, emailInvalid);
    } else if (val.length > 3) {
      showFeedback(email, false, emailValid, emailInvalid);
    } else {
      resetFeedback(email, emailValid, emailInvalid);
    }
  });

  email.addEventListener("blur", () => {
    const val = email.value.trim();
    if (val.length === 0) return resetFeedback(email, emailValid, emailInvalid);
    showFeedback(email, isValidEmail(val), emailValid, emailInvalid);
  });

  /* ---- Real-time Password Validation + Counter ---- */
  password.addEventListener("input", () => {
    clearAlert();
    const val = password.value;

    if (pwCounter) {
      const len = val.length;
      pwCounter.textContent = `${len}/20`;
      pwCounter.className = len > 20
        ? "form-text text-danger small"
        : len >= 8
          ? "form-text text-success small"
          : "form-text text-muted small";
    }

    if (val.length > 20) password.value = val.slice(0, 20);

    const trimmed = password.value.trim();
    if (trimmed.length === 0) return resetFeedback(password, pwValid, pwInvalid);

    if (trimmed.length >= 8 && /\d/.test(trimmed) && trimmed.length <= 20) {
      showFeedback(password, true, pwValid, pwInvalid);
    } else {
      showFeedback(password, false, pwValid, pwInvalid);
    }
  });

  password.addEventListener("blur", () => {
    const val = password.value.trim();
    if (val.length === 0) return resetFeedback(password, pwValid, pwInvalid);
    showFeedback(password, isValidPassword(val), pwValid, pwInvalid);
  });

  /* ---- Password toggle ---- */
  if (togglePw) {
    togglePw.addEventListener("click", () => {
      const hidden = password.type === "password";
      password.type = hidden ? "text" : "password";
      const icon = togglePw.querySelector("i");
      if (icon) icon.className = hidden ? "bi bi-eye-slash" : "bi bi-eye";
    });
  }

  /* ---- Form Submit — Authenticate against localStorage ---- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAlert();

    let ok = true;

    // Email check
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFeedback(email, false, emailValid, emailInvalid);
      ok = false;
    } else {
      showFeedback(email, true, emailValid, emailInvalid);
    }

    // Password check
    if (!password.value.trim() || !isValidPassword(password.value)) {
      showFeedback(password, false, pwValid, pwInvalid);
      ok = false;
    } else {
      showFeedback(password, true, pwValid, pwInvalid);
    }

    if (!ok) {
      setAlert("danger", "Please fix the highlighted fields and try again.");
      return;
    }

    // ---- Authenticate against localStorage ----
    const users = getUsers();
    const enteredEmail = email.value.trim().toLowerCase();
    const enteredPw = password.value.trim();

    const user = users.find(
      (u) => u.email.toLowerCase() === enteredEmail && u.password === enteredPw
    );

    if (!user) {
      setAlert("danger", "Invalid email or password. Please try again or create an account.");
      showFeedback(email, false, emailValid, emailInvalid);
      showFeedback(password, false, pwValid, pwInvalid);
      return;
    }

    // Store logged-in user session
    localStorage.setItem("novacart_loggedIn", JSON.stringify({
      name: user.name,
      email: user.email
    }));

    setAlert("success", `Welcome back, ${user.name}! Redirecting...`);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  });
})();