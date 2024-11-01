async function loadUserDetails() {
    try {
        // Define your token (example: retrieving it from localStorage)
        const token = localStorage.getItem("token");

        // Fetch data from the API with Authorization header
        const response = await fetch("http://127.0.0.1:8000/account/user/details/", {
            method: 'GET',
            headers: {
            
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        // Parse JSON response
        const userData = await response.json();
        console.log(userData);

        // Get the profile info div
        const profileInfoDiv = document.querySelector(".profile-info.text-center");

        // Dynamically update the profile information
        profileInfoDiv.innerHTML = `
            <p class="font-semibold">Username: ${userData.username}</p>
            <p>First Name: ${userData.first_name}</p>
            <p>Last Name: ${userData.last_name}</p>
            <p>Email: ${userData.email}</p>
            <p>Phone: +9984159412</p>
        `;
    } catch (error) {
        console.error("Error loading user details:", error);
    }
}

// Call the function to load user details when the page loads
document.addEventListener("DOMContentLoaded", loadUserDetails);
