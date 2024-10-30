document.querySelector(".signupForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input fields
    if (email === "" || username === "" || password === "") {
        showErrorMessage("All fields are required.");
        return;
    }

    if (password.length < 8) {
        showErrorMessage("Password must be at least 8 characters long.");
        return;
    }

    // Store the user data (for testing purposes only)
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        showErrorMessage("Username already exists. Please choose a different one.");
        return;
    }

    users[username] = { password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "index.html"; // Redirect to login page
});

// Show error messages in a consistent way
function showErrorMessage(message) {
    const errorBox = document.querySelector(".form-error");
    if (errorBox) {
        errorBox.innerText = message;
        errorBox.style.display = "block";
    }
}
