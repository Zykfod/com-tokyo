function loadPage(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    });
}


function togglePassword(element) {
    const input = element.parentElement.querySelector("input");
    const icon = element.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function handlePasswordValidation(inputId) {
    const passwordInput = document.getElementById(inputId);
    const lengthRule = document.getElementById("length");
    const uppercaseRule = document.getElementById("uppercase");
    const numberRule = document.getElementById("number");
    const specialRule = document.getElementById("special");

    if (!passwordInput) return; // stops if not on that page

    passwordInput.addEventListener("input", function() {
        const value = passwordInput.value;

        // At least 8 characters
        lengthRule.classList.toggle("valid", value.length >= 8);

        // Upper & Lowercase
        uppercaseRule.classList.toggle("valid", /[a-z]/.test(value) && /[A-Z]/.test(value));

        // Number
        numberRule.classList.toggle("valid", /[0-9]/.test(value));

        // Special character
        specialRule.classList.toggle("valid", /[!@#$%^&*(),.?":{}|<>]/.test(value));
    });
}

function showPopup(event) {
  event.preventDefault();
  alert("Password has been reset!");

  window.location.href = "login.html"; // change file name if needed
}