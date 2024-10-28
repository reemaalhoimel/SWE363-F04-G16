// Initialize sample user data in localStorage (for testing only)
if (!localStorage.getItem('users')) {
	const users = {
	  admin: { password: 'admin123' },  // Example regular user
	  $superadmin: { password: 'superadmin123' }  // Admin user (username starts with $)
	};
	localStorage.setItem('users', JSON.stringify(users));
  }
  
  class Login {
	constructor(form, fields) {
	  this.form = form;
	  this.fields = fields;
	  this.validateonSubmit();
	}
  
	validateonSubmit() {
	  let self = this;
  
	  this.form.addEventListener("submit", (e) => {
		e.preventDefault();
		let error = 0;
		self.fields.forEach((field) => {
		  const input = document.querySelector(`#${field}`);
		  if (self.validateFields(input) == false) {
			error++;
		  }
		});
  
		if (error == 0) {
		  const username = document.querySelector("#username").value;
		  const password = document.querySelector("#password").value;
  
		  if (self.authenticateUser(username, password)) {
			localStorage.setItem("auth", 1);
			alert("Login successful!");
			if (username.startsWith('$')) {
			  alert("Welcome, Admin!");
			}
			this.form.submit(); // In a real app, redirect to a dashboard
		  } else {
			alert("Invalid username or password.");
		  }
		}
	  });
	}
  
	validateFields(field) {
	  if (field.value.trim() === "") {
		this.setStatus(
		  field,
		  `${field.previousElementSibling.innerText} cannot be blank`,
		  "error"
		);
		return false;
	  } else {
		if (field.type == "password" && field.value.length < 8) {
		  this.setStatus(
			field,
			`${field.previousElementSibling.innerText} must be at least 8 characters`,
			"error"
		  );
		  return false;
		} else {
		  this.setStatus(field, null, "success");
		  return true;
		}
	  }
	}
  
	authenticateUser(username, password) {
	  const users = JSON.parse(localStorage.getItem('users'));
	  return users[username] && users[username].password === password;
	}
  
	setStatus(field, message, status) {
	  const errorMessage = field.parentElement.querySelector(".error-message");
  
	  if (status == "success") {
		if (errorMessage) {
		  errorMessage.innerText = "";
		}
		field.classList.remove("input-error");
	  }
  
	  if (status == "error") {
		errorMessage.innerText = message;
		field.classList.add("input-error");
	  }
	}
  }
  
  const form = document.querySelector(".loginForm");
  if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
  }
  