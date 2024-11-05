

// Filter courses by department
function filterCourses(department) {
    const courses = document.querySelectorAll('.course-button');
    courses.forEach(course => {
        if (course.classList.contains('course-' + department)) {
            course.style.display = 'flex';
        } else {
            course.style.display = 'none';
        }
    });
}

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