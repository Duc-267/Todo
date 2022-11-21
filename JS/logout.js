const logout = function () {
  console.log("log out");
  localStorage.setItem(KEY_LOGGING, "false");
  location.pathname = "C:/Users/arcan/OneDrive/Desktop/UDT/Todo/Todo/index.html";
}
