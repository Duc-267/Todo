function logout() {
    console.log("log out");
    localStorage.setItem(KEY_LOGGING, "false");
    location.pathname = "Todo/index.html";
  }
  