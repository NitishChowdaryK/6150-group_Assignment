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

  // Safety check
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

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  function isValidPassword(value) {
    const v = value.trim();
    return v.length >= 8 && v.length <= 20 && /\d/.test(v);
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

  /* ---- Real-time Email Validation ---- */
  email.addEventListener("input", () => {
    const val = email.value.trim();
    clearAlert();

    if (val.length === 0) {
      resetFeedback(email, emailValid, emailInvalid);
      return;
    }

    // Only validate after user types something with an @
    if (val.includes("@")) {
      if (isValidEmail(val)) {
        showFeedback(email, true, emailValid, emailInvalid);
      } else {
        showFeedback(email, false, emailValid, emailInvalid);
      }
    } else if (val.length > 3) {
      // Show hint after a few chars if no @ yet
      showFeedback(email, false, emailValid, emailInvalid);
    } else {
      resetFeedback(email, emailValid, emailInvalid);
    }
  });

  // Also validate on blur (when user leaves field)
  email.addEventListener("blur", () => {
    const val = email.value.trim();
    if (val.length === 0) {
      resetFeedback(email, emailValid, emailInvalid);
      return;
    }
    showFeedback(email, isValidEmail(val), emailValid, emailInvalid);
  });

  /* ---- Real-time Password Validation + Character Counter ---- */
  password.addEventListener("input", () => {
    const val = password.value;
    clearAlert();

    // Update character counter
    if (pwCounter) {
      const len = val.length;
      pwCounter.textContent = `${len}/20`;

      if (len > 20) {
        pwCounter.className = "form-text text-danger small";
      } else if (len >= 8) {
        pwCounter.className = "form-text text-success small";
      } else {
        pwCounter.className = "form-text text-muted small";
      }
    }

    // Enforce max length
    if (val.length > 20) {
      password.value = val.slice(0, 20);
    }

    // Validate
    const trimmed = password.value.trim();
    if (trimmed.length === 0) {
      resetFeedback(password, pwValid, pwInvalid);
      return;
    }

    if (trimmed.length >= 8 && /\d/.test(trimmed) && trimmed.length <= 20) {
      showFeedback(password, true, pwValid, pwInvalid);
    } else if (trimmed.length >= 1) {
      showFeedback(password, false, pwValid, pwInvalid);
    }
  });

  password.addEventListener("blur", () => {
    const val = password.value.trim();
    if (val.length === 0) {
      resetFeedback(password, pwValid, pwInvalid);
      return;
    }
    showFeedback(password, isValidPassword(val), pwValid, pwInvalid);
  });

  /* ---- Password visibility toggle ---- */
  if (togglePw) {
    togglePw.addEventListener("click", () => {
      const isHidden = password.type === "password";
      password.type = isHidden ? "text" : "password";
      const icon = togglePw.querySelector("i");
      if (icon) {
        icon.className = isHidden ? "bi bi-eye-slash" : "bi bi-eye";
      }
    });
  }

  /* ---- Form Submit ---- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert();

    let ok = true;

    // Final email check
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFeedback(email, false, emailValid, emailInvalid);
      ok = false;
    } else {
      showFeedback(email, true, emailValid, emailInvalid);
    }

    // Final password check
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

    setAlert("success", "Login successful! Redirecting to home...");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
})();