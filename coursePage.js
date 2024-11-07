// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Initial list of reviews with mock data
    const reviews = [
        {
            id: 1,
            author: 'خالد الشهري',
            content: 'The course is very hard, but with dr Ahmad Moqbel help setions it would be better, here is his videos https://www.youtube.com/watch?v=f5YX5St-VOs&list=PLz6mTkhaxogQHF21NInRTmVmYsT5RkSxj ...',
            upvotes: 3,
            downvotes: 1,
            comments: [] // Placeholder for future comments
        }
    ];
    
    // variable to store comment ID
    let commentID;

    // Object to keep track of user votes by review ID
    const userVotes = {}; // { reviewId: 'upvote' | 'downvote' | null }
    
    // Container where all reviews will be rendered
    const reviewsContainer = document.getElementById('reviewsContainer');

    // Function to convert plain URLs in text into clickable hyperlinks
    function linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
    }

    // Function to render the list of reviews to the DOM
    function renderReviews() {
        reviewsContainer.innerHTML = ''; // Clear existing content in the container

        // Sort reviews based on the number of upvotes minus downvotes in descending order
        reviews.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

        // Iterate over each review and create HTML elements to display it
        reviews.forEach(review => {
            const reviewElem = document.createElement('div');
            reviewElem.classList.add('review');
            reviewElem.innerHTML = `
                <div class="review-header">
                    <div class="user-icon">&#128100;</div> <!-- User icon for display -->
                    <span class="username">${review.author}</span> <!-- Display review author -->
                </div>
                <p class="review-content">${linkify(review.content)}</p> <!-- Display review content with clickable links -->

                <div class="review-actions">
                    <button class="upvote ${userVotes[review.id-1] === 'upvote' ? 'active' : ''}" data-id="${review.id}">&#9650;</button> <!-- Upvote button -->
                    <span class="vote-count">${review.upvotes - review.downvotes}</span> <!-- Net vote count -->
                    <button class="downvote ${userVotes[review.id-1] === 'downvote' ? 'active' : ''}" data-id="${review.id}">&#9660;</button> <!-- Downvote button -->
                    <button class="comment" data-id="${review.id}">&#128172;</button> <!-- Comment button -->
                </div>
            `;

            // Add comments to each review
            if (review.comments.length != 0) {
                let commentsHTML = `
                    <div class="review-reply">  
                `;
    
                review.comments.forEach(comment => {
                    commentsHTML += `
                        <div class="reply-header">
                            <div class="user-icon">&#128100;</div> <!-- User icon for display -->
                            <span class="username">${localStorage.getItem("name")}</span> <!-- Display author (placeholder)-->
                        </div> 
                        <p class="comment">${linkify(comment)}</p>
                    `;
                });

                commentsHTML += `
                    </div>  
                `;

        reviewElem.innerHTML += commentsHTML;
                
            }

            reviewsContainer.appendChild(reviewElem); // Append the review element to the container
        });
    }

    // Function to handle upvote action
    function upvotePost(id) {
        const review = reviews.find(r => r.id === id);
        if (review) {
            if (userVotes[id-1] === 'upvote') {
                // If the user clicks upvote again, reset the vote
                review.upvotes--;
                userVotes[id-1] = null;
            } else {
                // If the user had downvoted before, decrease downvote count
                if (userVotes[id-1] === 'downvote') {
                    review.downvotes--;
                    userVotes[id-1] = null;
                } else {
                    // Increment upvote count and set userVote to 'upvote'
                    review.upvotes++;
                    userVotes[id-1] = 'upvote';
                }
            }
            renderReviews(); // Re-render the reviews to reflect the updated vote
        }
    }

    // Function to handle downvote action
    function downvotePost(id) {
        const review = reviews.find(r => r.id === id);
        if (review) {
            if (userVotes[id-1] === 'downvote') {
                // If the user clicks downvote again, reset the vote
                review.downvotes--;
                userVotes[id-1] = null;
            } else {
                // If the user had upvoted before, decrease upvote count
                if (userVotes[id-1] === 'upvote') {
                    review.upvotes--;
                    userVotes[id-1] = null;
                } else {
                    // Increment downvote count and set userVote to 'downvote'
                    review.downvotes++;
                    userVotes[id-1] = 'downvote';
                }
            }
            renderReviews(); // Re-render the reviews to reflect the updated vote
        }
    }

    // Event listener for handling button clicks within the review container
    reviewsContainer.addEventListener('click', (event) => {
        if (event.target.matches('.upvote')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            upvotePost(id); // Handle upvote button click
        } else if (event.target.matches('.downvote')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            downvotePost(id); // Handle downvote button click
        } else if (event.target.matches('.comment')) {
            // Placeholder for handling comment button click
            commentID = parseInt(event.target.getAttribute('data-id'));
            showReplyForm();
        }
    });

    // Function to show the reply form and hide the review input container
    function showReplyForm() {
        document.getElementById('reviewInputContainer').style.display = 'none'; // Hide the main review input section
        document.getElementById('replyFormContainer').style.display = 'flex'; // Display the reply form section
    }

    // Function to reset the view to the default state
    function resetToDefault() {
        document.getElementById('replyFormContainer').style.display = 'none'; // Hide the reply form
        document.getElementById('reviewInputContainer').style.display = 'flex'; // Show the main review input section
    }

    // Event listener for the submit button to add a new review
    document.getElementById('submitReviewButton').addEventListener('click', () => {
        const reviewInput = document.getElementById('reviewInput'); // Get input value
        const newReview = {
            id: reviews.length + 1, // Generate new ID based on array length
            author: localStorage.getItem("name"), // Placeholder author name
            content: reviewInput.value, // Review content from input field
            upvotes: 0, // Initial upvote count
            downvotes: 0, // Initial downvote count
            comments: [] // Placeholder for future comments
        };
        reviews.push(newReview); // Add new review to the list
        reviewInput.value = ''; // Clear input field
        renderReviews(); // Re-render reviews to show the new entry
    });

    // Event listener for the cancel button of the comment input
    document.getElementById('cancel-button').addEventListener('click', (e) => {
        resetToDefault();
    });
    
    // Event listener for the send button to add a new comment
    document.getElementById('submit-reply').addEventListener('click', (e) => {
        const replyInput = document.getElementById('replyInput');
        const review = reviews.find(r => r.id === commentID);
        if (review) {
            reviews[commentID - 1].comments.push(replyInput.value);
            replyInput.value = '';
            renderReviews(); // Re-render the reviews to reflect the updated vote
        }
        resetToDefault();
    });

    // Event listener for the about us button
    document.getElementById('aboutUs').addEventListener('click', (e) => {
        window.location.href = "aboutUs.html";
    })

    // Initial rendering of reviews
    renderReviews();
});



