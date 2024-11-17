// Open modal
function openModal() {
    document.getElementById('modal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}


const API_URL = 'https://car-repair-backend-drf.vercel.app/parts/partsadd/';
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';
const IMGBB_API_KEY = 'add07eb16060304e9d624f9962001708';

// Open modal
function openModal() {
    document.getElementById('modal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Handle form submission
async function submitPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];

    if (!imageFile) {
        alert("Please select an image.");
        return;
    }

    try {
        // Upload image to imgbb
        const formData = new FormData();
        formData.append('image', imageFile);
        const imgbbResponse = await fetch(`${IMGBB_API_URL}?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const imgbbData = await imgbbResponse.json();

        // Get the image URL
        const imageUrl = imgbbData.data.url;

        // Send data to your API
        const postResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                image_url: imageUrl
            })
        });

        if (!postResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const postData = await postResponse.json();
         alert("Post successfully complete.")
        // Add new card to the display
        addCard(postData);

        // Reset form and close modal
        document.getElementById('postForm').reset();
        closeModal();
    } catch (error) {
        console.error("Error submitting post:", error);
    }
}

// Load posts from API and display them
async function loadPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        posts.forEach(post => addCard(post));
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

// Add card to display area
function addCard(postData) {
    const tableBody = document.querySelector('#card-table tbody');
    const row = document.createElement('tr');

    row.className = 'border-t border-gray-300 hover:bg-gray-100';

    row.innerHTML = `
        
        <td class="border px-4 py-2">
            <img src="${postData.image_url}" alt="Product Image" class="w-20 h-20 object-cover rounded">
        </td>
        <td class="border px-4 py-2">${postData.title}</td>
        <td class="border px-4 py-2 text-blue-600 text-xl font-bold">$${postData.price}</td>
        <td class="border px-4 py-2 text-center">
            <button class="delete-button bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
        </td>
    `;

    // Add delete functionality
    row.querySelector('.delete-button').addEventListener('click', () => {
        row.remove();
    });

    tableBody.appendChild(row);
}


// Load posts on page load
document.addEventListener('DOMContentLoaded', loadPosts);
