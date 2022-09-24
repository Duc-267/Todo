const logout = function () {
  console.log("log out");
  localStorage.setItem(KEY_LOGGING, "false");
  location.pathname = "/index.html";
}
