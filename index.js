(() => {
  /* ---- Toast ---- */
  var toastEl = document.getElementById("cartToast");
  if (toastEl) {
    var bsToast = new bootstrap.Toast(toastEl, { delay: 2000 });

    var trigger = document.getElementById("toastTrigger");
    if (trigger) trigger.addEventListener("click", function () { bsToast.show(); });

    document.querySelectorAll(".add-to-cart").forEach(function (btn) {
      btn.addEventListener("click", function () { bsToast.show(); });
    });
  }

  /* ---- Auth State ---- */
  var authBtns = document.getElementById("authBtns");
  var userArea = document.getElementById("userArea");
  var userNameEl = document.getElementById("userName");
  var logoutBtn = document.getElementById("logoutBtn");

  try {
    var session = JSON.parse(localStorage.getItem("novacart_loggedIn"));
    if (session && session.name) {
      if (authBtns) authBtns.classList.add("d-none");
      if (userArea) {
        userArea.classList.remove("d-none");
        userArea.classList.add("d-flex");
      }
      if (userNameEl) userNameEl.textContent = "Hi, " + session.name;
    }
  } catch (e) {
    /* not logged in */
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("novacart_loggedIn");
      window.location.reload();
    });
  }
})();