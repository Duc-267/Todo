function login() {
  console.log("log");
  const email = document.forms["login__form"]["email"].value;
  const password = document.forms["login__form"]["password"].value;
  const users = JSON.parse(localStorage.getItem(KEY_USERS)) || [];
  const checkBox = document.getElementById("checkbox");
  const user = users.find((user) => user.email == email);
  if (user && user.password == password) {
    if (checkBox.checked == true) {
      localStorage.setItem(KEY_LOGGING, "true");
      localStorage.setItem(
        KEY_SAVED_USER,
        JSON.stringify({ email: email, password: password })
      );
    }
    localStorage.setItem(
      KEY_CURRENT_USER,
      JSON.stringify({
        email: user.email,
        password: user.password,
        fullName: user.fullName,
      })
    );
    return true;
  }
  document.getElementById("login-validation").innerHTML =
    "Incorrect email or password";
  return false;
}

const autoFill = () => {
  const currentUser = JSON.parse(localStorage.getItem(KEY_SAVED_USER)) || [];
  console.log(currentUser);
  if (currentUser) {
    document.forms["login__form"]["email"].value = currentUser.email || "";
    document.forms["login__form"]["password"].value =
      currentUser.password || "";
  }
};
const autoRedirect = () => {
  const key = localStorage.getItem(KEY_LOGGING);
  const isLogging = key === "true";
  console.log(
    "🚀 ~ file: login.js ~ line 21 ~ autoRedirect ~ isLogging",
    isLogging
  );
  if (isLogging) {
    location.pathname = "Todo/HTML/main.html";
  }
};
autoFill();
autoRedirect();
