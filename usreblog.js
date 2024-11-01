function openModal() {
    document.getElementById("addPostModal").classList.remove("hidden");
}

// Function to close the modal
function closeModal() {
    document.getElementById("addPostModal").classList.add("hidden");
}



// for submit 

async function submitPost() {
    const imageFile = document.getElementById('image').files[0];
    const postedBy = document.getElementById('postedBy').value;
    const datePosted = document.getElementById('datePosted').value;
    const title = document.getElementById('title').value;
    let imageUrl = '';

    // Upload image to imgbb if an image is selected
    if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=add07eb16060304e9d624f9962001708', {
                method: 'POST',
                body: formData
            });
            const imgbbData = await imgbbResponse.json();
            imageUrl = imgbbData.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return;
        }
    }

    // Prepare post data
    const postData = {
        title: title,
        posted_by: postedBy,
        date_posted: datePosted,
        main_image: imageUrl
    };

    // Send post data to the backend
    try {
        const response = await fetch('https://car-repair-backend-drf.vercel.app/blog/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            alert('Post submitted successfully!');
            closeModal();
            document.getElementById("postForm").reset();
            const newPostData = await response.json();
            displayNewPost(newPostData);
        } else {
            console.error('Error submitting post:', await response.json());
            alert('Error submitting post.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}





// for load blog post 


async function loadPosts() {
    try {
        const response = await fetch('https://car-repair-backend-drf.vercel.app/blog/post/');
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const postsData = await response.json();
        
     
        postsData.forEach(post => displayPost(post));
        
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Function to display each post in the specified format
function displayPost(postData) {
    const postsContainer = document.getElementById("postsContainer");

    const postCard = document.createElement("div");
    postCard.className = "relative max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-4";
    postCard.setAttribute("data-post-id", postData.id);

    postCard.innerHTML = `
        <img src="${postData.main_image}" alt="Worker" class="w-full h-48 object-cover">
        <div class="p-4">
            <div class="flex items-center mb-4">
                <img src="images/pp.jpeg" alt="${postData.posted_by}" class="w-10 h-10 rounded-full mr-3">
                <div>
                    <p class="text-gray-800 font-semibold">Posted by ${postData.posted_by}</p>
                    <p class="text-sm text-blue-500">${postData.date_posted}</p>
                </div>
            </div>
            <h5 class="text-lg font-bold text-gray-900 mb-4">${postData.title}</h5>
            <div class="text-center flex">
                <button class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    Read more...
                </button>
            </div>
        </div> 
    `;

    postsContainer.appendChild(postCard);

   
   
}








window.addEventListener("DOMContentLoaded", loadPosts);
