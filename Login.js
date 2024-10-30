// Initialize sample user data in localStorage (for testing only)
if (!localStorage.getItem('users')) {
    const users = {
        admin: { password: 'admin123' }, // Example regular user
        $superadmin: { password: 'superadmin123' } // Admin user (username starts with $)
    };
    localStorage.setItem('users', JSON.stringify(users));
}

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
        this.addForgotPasswordListener(); // Listener for forgot password
        this.addSignupListener(); // Listener for sign-up link
    }

    validateOnSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent form submission

            let errorCount = 0;
            this.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (!this.validateFields(input)) {
                    errorCount++;
                }
            });

            if (errorCount === 0) {
                const username = document.querySelector("#username").value.trim();
                const password = document.querySelector("#password").value.trim();

                if (this.authenticateUser(username, password)) {
                    localStorage.setItem("auth", 1);
                    if (username.startsWith('$')) {
                        alert("Welcome, Admin!");
                    }
                    this.form.submit(); // Submit if authentication is successful
                } else {
                    this.showErrorMessage("Incorrect Username/Email or Password");
                }
            }
        });
    }

    addForgotPasswordListener() {
        const forgotPasswordLink = document.querySelector(".forgot-password");
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "forgot-password.html"; // Adjusted path
            });
        }
    }

    addSignupListener() {
        const signupLink = document.querySelector(".signup-link");
        if (signupLink) {
            signupLink.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "signup.html"; // Adjusted path
            });
        }
    }

    validateFields(input) {
        const value = input.value.trim();
        if (value === "") {
            this.setStatus(input, `${input.previousElementSibling.innerText} cannot be blank`, "error");
            return false;
        } else if (input.type === "password" && value.length < 8) {
            this.setStatus(input, `${input.previousElementSibling.innerText} must be at least 8 characters`, "error");
            return false;
        } else {
            this.setStatus(input, null, "success");
            return true;
        }
    }

    authenticateUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        return users[username] && users[username].password === password;
    }

    setStatus(input, message, status) {
        const errorMessage = input.parentElement.querySelector(".error-message");
        if (status === "success") {
            if (errorMessage) errorMessage.innerText = "";
            input.classList.remove("input-error");
        }
        if (status === "error") {
            errorMessage.innerText = message;
            input.classList.add("input-error");
        }
    }

    showErrorMessage(message) {
        const errorBox = document.getElementById("form-error");
        if (errorBox) {
            errorBox.innerText = message;
            errorBox.style.display = "block";
        }
    }
}

// Initialize the Login class
const form = document.querySelector(".loginForm");
if (form) {
    const fields = ["username", "password"];
    new Login(form, fields);
}
