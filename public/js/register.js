function handleSignUp() {
    if (name.length < 1) {
        document.getElementById('error-name').innerHTML = "<strong> Please Enter Your Name <strong>"
    }
    if (email.length < 4) {
        document.getElementById('error-email').innerHTML = " Please Enter Your Email";
    }
    if (password.length < 4) {
        document.getElementById('error-password').innerHTML = "Short password";
    }
    // [END createwithemail]
}