// Initialize sample user data in localStorage (for testing only)
if (!localStorage.getItem('Users')) {
    const Users = {
        "user": { password: 'user1234' }, // regular user
        "$superadmin": { password: 'superadmin12' }, // Super-admin user
        "#admin": { password: 'admin123' } // Admin user (username starts with #)
    };
    localStorage.setItem('Users', JSON.stringify(Users));
}

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
        this.addForgotPasswordListener();
        this.addSignupListener();
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

                // Check user authentication and role-based redirection
                const role = this.authenticateUser(username, password);

                if (role) {
                    localStorage.setItem("auth", 1);
                    
                    // Redirect based on role
                    if (role === "super-admin") {
                        window.location.href = "loadingSuperAdmin.html"; // Super-admin view
                    } else if (role === "admin") {
                        window.location.href = "loadingAdmin.html"; // Admin view
                    } else {
                        window.location.href = "loading.html"; // Regular user view
                    }
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
                window.location.href = "forgot-password.html";
            });
        }
    }

    addSignupListener() {
        const signupLink = document.querySelector(".signup-link");
        if (signupLink) {
            signupLink.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "signup.html";
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
        const Users = JSON.parse(localStorage.getItem('Users'));
        console.log("Stored Users:", Users); // Debug: log stored users to check data format
        
        // Debugging step: check if the username and password are retrieved correctly
        if (Users[username]) {
            console.log(`Checking user: ${username}`);
            console.log(`Stored password: ${Users[username].password}, Entered password: ${password}`);
        }

        // Check if the user exists and validate password
        if (Users[username] && Users[username].password === password) {
            // Determine role based on the username prefix
            if (username.startsWith('$')) {
                return "super-admin";
            } else if (username.startsWith('#')) {
                return "admin";
            } else {
                return "user"; // Regular user
            }
        }
        return null; // Authentication failed
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
