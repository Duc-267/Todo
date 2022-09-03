const todoList = document.querySelector(".todo-container__list"),
  showHideIcon = document.querySelectorAll(".show-hide"),
  passwordFields = document.querySelectorAll(".password");

showHideIcon.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    passwordFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        showHideIcon.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        showHideIcon.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// function random_code_generate(max, min) {
//     const codeChars =
//         "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^*_";
//     const CharMath = Math.floor(Math.random() * (max - min + 1)) + min;
//     const randCode = Array(CharMath)
//         .fill(codeChars)
//         .map(function (x) {
//             return x[Math.floor(Math.random() * x.length)];
//         })

//         .join("");
//     return randCode;
// }

// console.log(random_code_generate(4, 7))
