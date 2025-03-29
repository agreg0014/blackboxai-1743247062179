// JavaScript for handling course details, ratings, and doubts

// Function to load course content
async function loadCourseContent(courseId) {
    const courseContent = document.getElementById('courseContent');
    const result = await ajaxRequest(`/api/courses/${courseId}`, 'GET');

    if (result) {
        courseContent.innerHTML = `<h2>${result.title}</h2>`;
        result.chapters.forEach(chapter => {
            courseContent.innerHTML += `<h3>${chapter.title}</h3><p>${chapter.content}</p>`;
        });
    }
}

// Function to submit a rating
document.getElementById('submitRating')?.addEventListener('click', async () => {
    const rating = document.querySelector('input[name="rating"]:checked').value; // Assuming radio buttons for rating
    const courseId = 'someCourseId'; // Replace with actual course ID

    const result = await ajaxRequest('/api/ratings', 'POST', { courseId, rating });
    alert(result.message);
});

// Function to submit a doubt
document.getElementById('submitDoubt')?.addEventListener('click', async () => {
    const doubtText = document.getElementById('doubtText').value;
    const courseId = 'someCourseId'; // Replace with actual course ID

    const result = await ajaxRequest('/api/doubts', 'POST', { courseId, doubtText });
    alert(result.message);
});

// Call the function to load course content on page load
loadCourseContent('someCourseId'); // Replace with actual course ID