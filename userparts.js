


const API_URL = 'http://127.0.0.1:8000/parts/partsadd/';
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
        const token = localStorage.getItem("token");
      
        const postResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`,
                
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
    const cardContainer = document.getElementById('card-container');
    const card = document.createElement('div');

    // Set card styling and width
    card.className = 'card bg-white rounded-lg shadow-md overflow-hidden transform transition ease-in-out duration-3000 duration-100 hover:shadow-lg  border-2 border-black-500';

    card.innerHTML = `
        <div class="card-image w-full h-48 overflow-hidden rounded-t-lg">
            <img src="${postData.image_url}" alt="Product Image" class="w-full h-full object-cover">
        </div>
        <div class="p-4 flex flex-col justify-between">
            <h2 class="text-lg font-semibold text-gray-800 truncate">${postData.title}</h2>
            <p class="text-blue-600 text-2xl font-bold mt-1">$${postData.price}</p>

             <a href="https://sandbox.sslcommerz.com/EasyCheckOut/testcde07ebaa4f214f7d85cb12d926294a4480" onclick="handleBuyNow('${postData.id}', '${postData.title}', ${postData.price})"
                class="mt-4 bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Buy Now
            </a>
        </div>
    `;

    cardContainer.appendChild(card);
}



// Load posts on page load
document.addEventListener('DOMContentLoaded', loadPosts);
