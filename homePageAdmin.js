let courseToDelete = null; 

function selectDepartment(department) {
    // Update dropdown button label to the selected department
    document.getElementById("departmentButton").innerHTML = department + ' <span class="arrow">&#9662;</span>';

    // Remove highlight from all dropdown items and highlight the selected one
    const dropdownItems = document.querySelectorAll(".dropdown-content a");
    dropdownItems.forEach(item => item.classList.remove("selected-department"));
    
    const selectedItem = Array.from(dropdownItems).find(item => item.textContent === department);
    if (selectedItem) {
        selectedItem.classList.add("selected-department");
    }
}

// Show all courses
function Department() {
    const courses = document.querySelectorAll('.course-button');
    courses.forEach(course => {
        course.style.display = 'flex';
    });
}

// Filter courses by search input
function searchCourses() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const courses = document.querySelectorAll('.course-button');
    courses.forEach(course => {
        const text = course.textContent || course.innerText;
        if (text.toUpperCase().includes(input)) {
            course.style.display = 'flex';
        } else {
            course.style.display = 'none';
        }
    });
}

let deleteMode = false;

function toggleDeleteMode() {
    deleteMode = !deleteMode;
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.style.display = deleteMode ? 'block' : 'none';
    });
}

function deleteCourse(button) {
    button.parentElement.remove();
}

function openAddCoursePopup() {
    document.getElementById("addCoursePopup").style.display = "flex";
    popup.style.flexDirection = "column";
}

function closeAddCoursePopup() {
    document.getElementById("addCoursePopup").style.display = "none";

    // Clear all input fields
    document.getElementById("courseNameInput").value = "";
    document.getElementById("courseDepartment").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseDescription").value = "";
    document.getElementById("LecCredits").value = "";
    document.getElementById("LabCredits").value = "";

    // Clear all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.display = "none";
        error.textContent = ""; // Reset error content
    });
}

// Open Delete Confirmation popup
function showDeletePopup(button) {
    courseToDelete = button.parentElement; // Store the course element to delete
    const courseName = courseToDelete.childNodes[0].textContent.trim(); 
    document.getElementById("deleteCourseName").textContent = courseName; // Use updated id
    document.getElementById("deletePopupOverlay").style.display = "block";
    document.getElementById("deleteCoursePopup").style.display = "block";
}

// Close Delete Confirmation popup
function closeDeletePopup() {
        document.getElementById("deletePopupOverlay").style.display = "none";
        document.getElementById("deleteCoursePopup").style.display = "none";
        courseToDelete = null; // Reset the course to delete
    }
        // Function to confirm deletion
        function confirmDeleteCourse() {
            if (courseToDelete) {
                courseToDelete.remove(); // Remove the course element
            }
            closeDeletePopup(); // Close the pop-up
    }

    function setStatus(input, message, status) {
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement("span");
            errorMessage.classList.add("error-message");
            input.parentNode.appendChild(errorMessage);
        }
    
        if (status === "success") {
            errorMessage.innerText = "";
            input.classList.remove("input-error");
        } else if (status === "error") {
            errorMessage.innerText = message;
            errorMessage.style.display = "block";
            input.classList.add("input-error");
        }
    }
    
    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);
        setStatus(inputField, message, "error");
    }
    
    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = "none";
            error.innerText = "";
        });
    }


    // Add a new course
    function filterCourses(department) {
        const departmentClass = `course-${department.toLowerCase()}`; // Ensure lowercase for consistency
        const courses = document.querySelectorAll('.course-button');

        courses.forEach(course => {
            if (course.classList.contains(departmentClass)) {
                course.style.display = 'flex'; // Show matching courses
            } else {
                course.style.display = 'none'; // Hide non-matching courses
            }
        });
    }

    function addCourse() {
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => error.style.display = "none");

        const name = document.getElementById("courseNameInput").value.trim();
        const department = document.getElementById("courseDepartment").value.toLowerCase(); // Convert to lowercase
        const code = document.getElementById("courseCode").value.toUpperCase();
        const description = document.getElementById("courseDescription").value.trim();
        const lecCredits = document.getElementById("LecCredits").value.trim();
        const labCredits = document.getElementById("LabCredits").value.trim();

        let isValid = true;
        clearErrors();

        // Validation checks with error display
        if (!name) {
            showError("courseNameInput", "Course name is required.");
            isValid = false;
        }
        if (!department) {
            showError("courseDepartment", "Department selection is required.");
            isValid = false;
        }
        if (!code) {
            showError("courseCode", "Course code is required.");
            isValid = false;
        }
        if (!description) {
            showError("courseDescription", "Course description is required.");
            isValid = false;
        }
        if (!lecCredits) {
            showError("LecCredits", "Lecture hours are required.");
            isValid = false;
        }
        if (!labCredits) {
            showError("LabCredits", "Lab hours are required.");
            isValid = false;
        }

        if (!isValid) return;

        // Create the new course button
        const courseButton = document.createElement("div");
        courseButton.classList.add("course-button", `course-${department}`); // Apply lowercase class name
        courseButton.textContent = `${code.replace(/([A-Za-z]+)([0-9]+)/, '$1 $2')}`;

        // Set background color based on department
        switch (department) {
            case 'math':
                courseButton.style.backgroundColor = '#f8b6b6'; // Light red for Math
                break;
            case 'swe':
                courseButton.style.backgroundColor = '#b6d8f8'; // Light blue for Software Engineering
                break;
            case 'engl':
                courseButton.style.backgroundColor = '#b6f8b6'; // Light green for English
                break;
            default:
                courseButton.style.backgroundColor = '#ccc'; // Default color if department is not recognized
                break;
        }

        // Create and append delete button to the course
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "x";
        deleteBtn.onclick = function () {
            showDeletePopup(deleteBtn); // Trigger delete confirmation popup
        };
        courseButton.appendChild(deleteBtn);

        // Add the new course button to the course grid
        document.querySelector(".course-grid").appendChild(courseButton);
        closeAddCoursePopup();
    }