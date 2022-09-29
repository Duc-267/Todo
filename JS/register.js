const validateForm = function (account) {

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValidationFlag = true;
  let fullNameValidationFlag = true;
  let passwordValidationFlag = true;
  let confirmPasswordValidationFlag = true;
  let emailIsAvailable = true;
  let users = JSON.parse(localStorage.getItem(KEY_USERS)) || [];    
  for (let i = 0; i < localStorage.length; i++){
    if(account.email == users[i].email)
    {
      emailIsAvailable = false
    }
}
  if (!account.email.match(mailFormat)) {
    document.getElementById("email-validation").innerHTML =
      "Incorrect email form";
    emailValidationFlag = false;
  } 
  else if (!emailIsAvailable)
  {
    document.getElementById("email-validation").innerHTML =
      "This email already have an account!";
    emailValidationFlag = false;
  }
  else {
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
    passwordValidationFlag &&
    confirmPasswordValidationFlag
  );
}

const signUp = function () {
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

const storeNewUser = function (account) {
  const newUser = {
    isAdmin: false,
    email: account.email,
    password: account.password,
    fullName: account.fullName,
  };

  let users = JSON.parse(localStorage.getItem(KEY_USERS)) || [];
  users.push(newUser);
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

const containsSpecialChars= function (str) {
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
