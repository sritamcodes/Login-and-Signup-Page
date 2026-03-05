function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}


function clearError(elementId) {
    document.getElementById(elementId).textContent = "";
}


function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}



const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let isValid = true;


        if (name === "") {
            showError("nameError", "Name is required");
            isValid = false;
        }
        else if (name.length < 3) {
            showError("nameError", "Name must be at least 3 characters");
            isValid = false;
        }
        else {
            clearError("nameError");
        }


        if (email === "") {
            showError("emailError", "Email is required");
            isValid = false;
        }
        else if (!isValidEmail(email)) {
            showError("emailError", "Enter a valid email address");
            isValid = false;
        }
        else {
            clearError("emailError");
        }


        if (password === "") {
            showError("passwordError", "Password is required");
            isValid = false;
        }
        else if (password.length < 6) {
            showError("passwordError", "Password must be at least 6 characters");
            isValid = false;
        }
        else {
            clearError("passwordError");
        }


        if (confirmPassword === "") {
            showError("confirmError", "Please confirm your password");
            isValid = false;
        }
        else if (password !== confirmPassword) {
            showError("confirmError", "Passwords do not match");
            isValid = false;
        }
        else {
            clearError("confirmError");
        }


        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.email === email) {
            showError("emailError", "Account already exists with this email");
            isValid = false;
        }


        if (isValid) {

            const user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem("user", JSON.stringify(user));

            alert("Signup successful!");

            signupForm.reset();

            window.location.href = "index.html";
        }

    });

}


const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const messageBox = document.getElementById("loginMessage");


        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            messageBox.style.color = "red";
            messageBox.textContent = "No account found. Please signup first.";
            return;
        }


        if (email !== storedUser.email) {

            messageBox.style.color = "red";
            messageBox.textContent = "Email not registered.";

            return;
        }


        if (password !== storedUser.password) {

            messageBox.style.color = "red";
            messageBox.textContent = "Incorrect password.";

            return;
        }
messageBox.style.color = "green";
messageBox.textContent = "Login successful! Redirecting...";

setTimeout(() => {
    window.location.href = "https://portfolio-2-xi-tawny.vercel.app/";
}, 1500);

    });

}
