window.onload = function () {
    const progress = document.querySelector('.progress');
    
    // Animate the progress bar
    setTimeout(() => {
        progress.style.width = '100%';
    }, 100); // Small delay to trigger the animation

    // Redirect to login page after 3 seconds
    setTimeout(() => {
        window.location.href = 'homePageAdmin.html'; // Adjust path based on folder structure
    }, 3000);
};
