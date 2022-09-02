const todoList = document.querySelector(".todo-container__list"),
  showHideIcon = document.querySelectorAll(".show-hide"),
  passwordFields = document.querySelectorAll(".password");

let todos = [{ id: 1, content: "Learn JavaScript" }];
let idCounter = 2;

const optionsToggle = () => {
  var toggleBtns = document.getElementsByClassName("options__toggleBtn");
  for (var i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        document.querySelectorAll(".todo__item").forEach((item) => {
          item.classList.remove("active");
        });
      } else {
        this.parentElement.parentElement.parentElement.className += " active";
      }
      // current[0].className = current[0].parentElement.parentElement.parentElement.className.replace(" active", "")
    });
  }
  // for (let i = 0; i < toggleBtns.length; i++) {
  //     toggleBtns[i].addEventListener("click", (e) => {
  //         var current = document.getElementsByClassName("active")
  //         console.log(this.className)
  //         // If there"s no active class
  //         if (current.length > 0) {
  //             current[0].className = current[0].className.replace(" active", "")
  //         }

  //         // Add the active class to the current/clicked button
  //         this.className += " active"
  //     }
  //     )
  // }
  // toggleBtns.forEach(btn => {
  //     btn.addEventListener("click", (e) => {
  //         var current = document.getElementsByClassName("active")
  //         console.log(this.className)
  //         // If there"s no active class
  //         if (current.length > 0) {
  //             current[0].className = current[0].className.replace(" active", "")
  //         }

  //         // Add the active class to the current/clicked button
  //         this.className += " active"
  //     })
  // })

  document.addEventListener("click", (e) => {
    let options = document.querySelectorAll(".todo__options");
    options.forEach((option) => {
      if (e.target.contains(option)) {
        document.querySelectorAll(".todo__item").forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  });
};

const renderTodo = () => {
  let ListItem = "";
  if (todos) {
    todos.forEach((todo, index) => {
      ListItem += `<div class="todo__item" data-id="${todo.id}">
            <div class="item__header">
            <span class="item__id">${index + 1}</span>
            <p class="item__title">${todo.content}</p>
            </div>
            <div class="todo__body">
            <div class="todo__options">
            <button class="options__toggleBtn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="options__dropdown">
            <div class="edit" onclick="editTodo('${encodeURIComponent(
              JSON.stringify(todo)
            )}')"  ><i class="fa-solid fa-pencil"></i> <span>Edit</span></div>
            <div class="delete" onclick="deleteTodo(${
              todo.id
            })"><i class="fa-solid fa-trash"></i> <span>Delete</span></div>
            </div>
            </div>
            </div>
            </div>`;
    });
  }
  todoList.innerHTML = ListItem;
};

const addTodo = () => {
  const newTodoContent =
    document.getElementsByClassName("new-todo__content")[0].value;
  if (newTodoContent != "") {
    todos.push({ id: idCounter++, content: newTodoContent });
    document.getElementsByClassName("new-todo__content")[0].value = "";
  }
  renderTodo();
  optionsToggle();
};

const deleteTodo = (id) => {
  console.log(id);
  todos = todos.filter((todo) => todo.id != id);
  console.log(todos);

  renderTodo();
  optionsToggle();
};
const editTodo = (todo) => {
  todo = JSON.parse(decodeURIComponent(todo));
  let items = document.querySelectorAll(".todo__item");
  items.forEach((item) => {
    if (item.dataset.id == todo.id) {
      console.log(todo.content);
      item.innerHTML = `
            <input type=text value="${todo.content}" class="edit__content">
            <button type="button" class="edit__save" onclick="saveTodo(${todo.id})">Save</button>`;
    }
  });
};

const saveTodo = (id) => {
  const content = document.getElementsByClassName("edit__content")[0].value;
  if (content != "") {
    const index = todos.findIndex((todo) => todo.id == id);
    todos[index].content = content;
    console.log(todos);
    renderTodo();
    optionsToggle();
  }
};

// renderTodo()
// optionsToggle()

// Sign-up validation
function validateForm(account) {
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValidationFlag = true;
  let fullNameValidationFlag = true;
  let passwordValidationFlag = true;
  let confirmPasswordValidationFlag = true;
  if (!account.email.match(mailFormat)) {
    document.getElementById("email-validation").innerHTML =
      "Incorrect email form";
    emailValidationFlag = false;
  } else {
    document.getElementById("email-validation").innerHTML = "";
    emailValidationFlag = true;
  }
  if (account.fullName.split(" ").length < 2) {
    document.getElementById("fname-validation").innerHTML =
      "Full name must contain at least 2 words";
    fullNameValidationFlag = false;
  } else {
    document.getElementById("fname-validation").innerHTML = "";
    fullNameValidationFlag = true;
  }
  if (
    account.password.length < 8 ||
    !containsSpecialChars(account.password) ||
    !checkUppercasePassword(account.password)
  ) {
    document.getElementById("password-validation").innerHTML =
      "Password must contain at least one uppercase character, one special character and has eight characters or longer.";
    passwordValidationFlag = false;
  } else {
    document.getElementById("password-validation").innerHTML = "";
    passwordValidationFlag = true;
  }
  if (account.confirmPassword !== account.password) {
    document.getElementById("cpassword-validation").innerHTML =
      "The password confirmation does not match.";
    confirmPasswordValidationFlag = false;
  } else {
    document.getElementById("cpassword-validation").innerHTML = "";
    confirmPasswordValidationFlag = true;
  }
  return (
    emailValidationFlag &&
    fullNameValidationFlag &&
    passwordValidationFlag &&
    confirmPasswordValidationFlag
  );
}

function signUp() {
  let email = document.forms["signup__form"]["email"].value;
  let fullName = document.forms["signup__form"]["fname"].value;
  let password = document.forms["signup__form"]["password"].value;
  let confirmPassword =
    document.forms["signup__form"]["confirm-password"].value;
  let account = {
    email,
    fullName,
    password,
    confirmPassword,
  };
  const validate = validateForm(account);
  if (validate) {
    storeNewUser(account);
    return true;
  } else {
    return false;
  }
}

function storeNewUser(account) {
  const newUser = {
    email: account.email,
    password: account.password,
    fullName: account.fullName,
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
}

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
function checkUppercasePassword(password) {
  for (var i = 0; i < password.length; i++) {
    if (
      password.charAt(i) == password.charAt(i).toUpperCase() &&
      password.charAt(i).match(/[a-z]/i)
    ) {
      return true;
    }
  }
  return false;
}

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

function login() {
  const email = document.forms["login__form"]["email"].value;
  const password = document.forms["login__form"]["password"].value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email == email);
  if (user && user.password == password) {
    return true;
  }
  document.getElementById("login-validation").innerHTML = "Incorrect email or password"
  return false;
}
