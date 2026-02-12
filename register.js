(() => {
  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("regName");
  const emailInput = document.getElementById("regEmail");
  const pwInput = document.getElementById("regPassword");
  const confirmInput = document.getElementById("regConfirm");
  const alertBox = document.getElementById("regAlert");
  const togglePw = document.getElementById("regTogglePw");
  const pwCounter = document.getElementById("regPwCounter");

  const nameInvalid = document.getElementById("nameInvalid");
  const nameValid = document.getElementById("nameValid");
  const regEmailInvalid = document.getElementById("regEmailInvalid");
  const regEmailValid = document.getElementById("regEmailValid");
  const regPwInvalid = document.getElementById("regPwInvalid");
  const regPwValid = document.getElementById("regPwValid");
  const confirmInvalid = document.getElementById("confirmInvalid");
  const confirmValid = document.getElementById("confirmValid");

  if (!form || !nameInput || !emailInput || !pwInput || !confirmInput || !alertBox) return;

  /* ---- Helpers ---- */
  function setAlert(type, msg) {
    alertBox.className = "alert alert-" + type;
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
    var t = v.trim();
    return t.length >= 8 && t.length <= 20 && /\d/.test(t);
  }

  // Name validation: at least 2 chars, only letters and spaces, no numbers/special chars
  function isValidName(v) {
    var t = v.trim();
    return t.length >= 2 && /^[A-Za-z\s]+$/.test(t);
  }

  function show(input, valid, validEl, invalidEl) {
    if (valid) {
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

  function reset(input, validEl, invalidEl) {
    input.classList.remove("is-valid", "is-invalid");
    if (validEl) validEl.classList.add("d-none");
    if (invalidEl) invalidEl.classList.add("d-none");
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem("novacart_users")) || []; }
    catch (e) { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem("novacart_users", JSON.stringify(users));
  }

  /* ---- Real-time: Name ---- */
  nameInput.addEventListener("input", function () {
    clearAlert();
    var v = nameInput.value.trim();
    if (v.length === 0) return reset(nameInput, nameValid, nameInvalid);

    if (isValidName(v)) {
      show(nameInput, true, nameValid, nameInvalid);
    } else {
      // Update error message based on what's wrong
      if (/[^A-Za-z\s]/.test(v)) {
        nameInvalid.textContent = "Name can only contain letters and spaces (no numbers or special characters).";
      } else {
        nameInvalid.textContent = "Please enter your full name (at least 2 characters).";
      }
      show(nameInput, false, nameValid, nameInvalid);
    }
  });

  nameInput.addEventListener("blur", function () {
    var v = nameInput.value.trim();
    if (v.length === 0) return reset(nameInput, nameValid, nameInvalid);
    if (!isValidName(v)) {
      if (/[^A-Za-z\s]/.test(v)) {
        nameInvalid.textContent = "Name can only contain letters and spaces (no numbers or special characters).";
      } else {
        nameInvalid.textContent = "Please enter your full name (at least 2 characters).";
      }
    }
    show(nameInput, isValidName(v), nameValid, nameInvalid);
  });

  /* ---- Real-time: Email ---- */
  emailInput.addEventListener("input", function () {
    clearAlert();
    var v = emailInput.value.trim();
    if (v.length === 0) return reset(emailInput, regEmailValid, regEmailInvalid);
    if (v.includes("@")) {
      show(emailInput, isValidEmail(v), regEmailValid, regEmailInvalid);
    } else if (v.length > 3) {
      show(emailInput, false, regEmailValid, regEmailInvalid);
    } else {
      reset(emailInput, regEmailValid, regEmailInvalid);
    }
  });

  emailInput.addEventListener("blur", function () {
    var v = emailInput.value.trim();
    if (v.length === 0) return reset(emailInput, regEmailValid, regEmailInvalid);
    show(emailInput, isValidEmail(v), regEmailValid, regEmailInvalid);
  });

  /* ---- Real-time: Password + Counter ---- */
  pwInput.addEventListener("input", function () {
    clearAlert();
    var v = pwInput.value;

    if (pwCounter) {
      pwCounter.textContent = v.length + "/20";
      pwCounter.className = v.length > 20
        ? "form-text text-danger small"
        : v.length >= 8 ? "form-text text-success small" : "form-text text-muted small";
    }

    if (v.length > 20) pwInput.value = v.slice(0, 20);

    var t = pwInput.value.trim();
    if (t.length === 0) return reset(pwInput, regPwValid, regPwInvalid);

    // Dynamic error message
    if (t.length < 8) {
      regPwInvalid.textContent = "Password must be at least 8 characters (" + t.length + "/8).";
      show(pwInput, false, regPwValid, regPwInvalid);
    } else if (!/\d/.test(t)) {
      regPwInvalid.textContent = "Password must contain at least 1 number.";
      show(pwInput, false, regPwValid, regPwInvalid);
    } else {
      show(pwInput, true, regPwValid, regPwInvalid);
    }

    // Re-check confirm if filled
    if (confirmInput.value.length > 0) {
      show(confirmInput, confirmInput.value === pwInput.value, confirmValid, confirmInvalid);
    }
  });

  pwInput.addEventListener("blur", function () {
    var t = pwInput.value.trim();
    if (t.length === 0) return reset(pwInput, regPwValid, regPwInvalid);
    show(pwInput, isValidPassword(t), regPwValid, regPwInvalid);
  });

  /* ---- Real-time: Confirm Password ---- */
  confirmInput.addEventListener("input", function () {
    clearAlert();
    var v = confirmInput.value;
    if (v.length === 0) return reset(confirmInput, confirmValid, confirmInvalid);
    show(confirmInput, v === pwInput.value && v.length > 0, confirmValid, confirmInvalid);
  });

  confirmInput.addEventListener("blur", function () {
    var v = confirmInput.value;
    if (v.length === 0) return reset(confirmInput, confirmValid, confirmInvalid);
    show(confirmInput, v === pwInput.value, confirmValid, confirmInvalid);
  });

  /* ---- Password Toggle ---- */
  if (togglePw) {
    togglePw.addEventListener("click", function () {
      var hidden = pwInput.type === "password";
      pwInput.type = hidden ? "text" : "password";
      var icon = togglePw.querySelector("i");
      if (icon) icon.className = hidden ? "bi bi-eye-slash" : "bi bi-eye";
    });
  }

  /* ---- Form Submit ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAlert();

    var ok = true;

    // Name validation
    var name = nameInput.value.trim();
    if (!isValidName(name)) {
      if (/[^A-Za-z\s]/.test(name)) {
        nameInvalid.textContent = "Name can only contain letters and spaces (no numbers or special characters).";
      } else if (name.length === 0) {
        nameInvalid.textContent = "Full name is required.";
      } else {
        nameInvalid.textContent = "Please enter your full name (at least 2 characters).";
      }
      show(nameInput, false, nameValid, nameInvalid);
      ok = false;
    } else {
      show(nameInput, true, nameValid, nameInvalid);
    }

    // Email validation
    var email = emailInput.value.trim();
    if (!isValidEmail(email)) {
      show(emailInput, false, regEmailValid, regEmailInvalid);
      ok = false;
    } else {
      show(emailInput, true, regEmailValid, regEmailInvalid);
    }

    // Password validation
    var pw = pwInput.value.trim();
    if (!isValidPassword(pw)) {
      show(pwInput, false, regPwValid, regPwInvalid);
      ok = false;
    } else {
      show(pwInput, true, regPwValid, regPwInvalid);
    }

    // Confirm validation
    if (confirmInput.value !== pwInput.value || confirmInput.value.trim().length === 0) {
      show(confirmInput, false, confirmValid, confirmInvalid);
      ok = false;
    } else {
      show(confirmInput, true, confirmValid, confirmInvalid);
    }

    if (!ok) {
      setAlert("danger", "Please fix the highlighted fields and try again.");
      return;
    }

    // Check duplicate email
    var users = getUsers();
    var exists = users.find(function (u) {
      return u.email.toLowerCase() === email.toLowerCase();
    });

    if (exists) {
      setAlert("warning", "An account with this email already exists. Please sign in.");
      show(emailInput, false, regEmailValid, regEmailInvalid);
      return;
    }

    // Save user
    users.push({ name: name, email: email, password: pw });
    saveUsers(users);

    setAlert("success", "Account created successfully! Redirecting to login...");
    setTimeout(function () {
      window.location.href = "login.html?registered=1";
    }, 1000);
  });
})();