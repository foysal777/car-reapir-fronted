document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectsContainer');

  fetch('https://car-repair-backend-drf.vercel.app/blog/api/projects/')
    .then(response => response.json())
    .then(data => {
      data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg overflow-hidden';

        card.innerHTML = `
          <img src="${project.image}" alt="Project Image" class="w-full h-60 object-cover">
          <div class="p-4">
            <p class="text-lg font-semibold text-gray-800">${project.title}</p>
            <p class="text-sm text-gray-500">${project.description}</p>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching projects:', error);
      container.innerHTML = '<p class="text-red-500">Failed to load projects.</p>';
    });
});

// *********************************
async function submitFeedback(event) {
    event.preventDefault(); 

  
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;


    const data = {
        name: name,
        rating: parseInt(rating),
        comment: comment
    };

    try {
   
        const response = await fetch('https://car-repair-backend-drf.vercel.app/parts/feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Feedback submitted successfully!');
            document.getElementById('feedback-form').reset(); 
            fetchFeedbacks();
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Failed to submit feedback.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('An error occurred. Please try again later.');
    }
}


async function fetchFeedbacks() {
    try {
        const response = await fetch('https://car-repair-backend-drf.vercel.app/parts/feedback/', {
            method: 'GET'
        });

        if (response.ok) {
            const feedbacks = await response.json();

    
            const feedbackContainer = document.getElementById('feedback-list');
            feedbackContainer.innerHTML = ''; 

            feedbacks.forEach(feedback => {
                const feedbackElement = document.createElement('div');
                feedbackElement.className = 'feedback-item p-4 mb-4 bg-gray-100 rounded-lg shadow';

                feedbackElement.innerHTML = `
                    <h3 class="font-semibold text-lg text-gray-800">${feedback.name}</h3>
                    <p class="text-red-500">Rating: ${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</p>
                    <p class="text-blue-600 font-bold">${feedback.comment}</p>
                    <small class="text-gray-400">${new Date(feedback.created_at).toLocaleString()}</small>
                `;
                feedbackContainer.appendChild(feedbackElement);
            });
        } else {
            console.error('Failed to retrieve feedbacks.');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}





document.getElementById('feedback-form').addEventListener('submit', submitFeedback);


document.addEventListener('DOMContentLoaded', fetchFeedbacks);
