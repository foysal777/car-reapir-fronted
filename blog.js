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



function displayPost(postData) {
    const postsContainer = document.getElementById("postsContainerd");

    // Create the table if it doesn't exist
    let table = postsContainer.querySelector("table");
    if (!table) {
        table = document.createElement("table");
        table.className = "table-auto w-full border-collapse border border-gray-300 text-left overflow-x-auto";
        table.innerHTML = `
            <thead>
                <tr class="bg-gray-100">
                    <th class="px-4 py-2 border">Image</th>
                    <th class="px-4 py-2 border">Title</th>
                    <th class="px-4 py-2 border">Posted By</th>
                    <th class="px-4 py-2 border">Date Created</th>
                    <th class="px-4 py-2 border">Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        postsContainer.appendChild(table);
    }

    // Add a new row to the table
    const tbody = table.querySelector("tbody");
    const row = document.createElement("tr");

    row.className = "hover:bg-gray-50";
    row.setAttribute("data-post-id", postData.id);
    row.innerHTML = `
        <td class="px-4 py-2 border">
            <img src="${postData.main_image}" alt="Post Image" class="w-20 h-20 object-cover rounded">
        </td>
        <td class="px-4 py-2 border text-gray-900 font-semibold">${postData.title}</td>
        <td class="px-4 py-2 border text-gray-700">${postData.posted_by}</td>
        <td class="px-4 py-2 border text-gray-500">${postData.date_posted}</td>
        <td class="px-4 py-2 border text-center">
            <img src="images/delete1.png" alt="Delete" class="delete-image w-8 h-8 cursor-pointer mx-auto">
        </td>
    `;

    tbody.appendChild(row);

    // Add event listener for the delete image
    const deleteImage = row.querySelector(".delete-image");
    deleteImage.addEventListener("click", () => deletePost(postData.id, row));
}




async function deletePost(postId, postCard) {
    try {
        const response = await fetch(`https://car-repair-backend-drf.vercel.app/blog/post/delete/${postId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            postCard.remove();
            alert("Post deleted successfully!");
        } else {
            console.error("Failed to delete post:", await response.json());
            alert("Error deleting post.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while trying to delete the post.");
    }
}







window.addEventListener("DOMContentLoaded", loadPosts);
