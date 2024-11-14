async function loadUserDetails() {
    try {
        // Define your token (example: retrieving it from localStorage)
        const token = localStorage.getItem("token");

        // Fetch data from the API with Authorization header
        const response = await fetch("https://car-repair-backend-drf.vercel.app/account/user/details/", {
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



// For Edit details show 


// const form = document.getElementById("edit-profile-form");

// form.addEventListener('submit', async(event) => {

//     event.preventDefault();
//     const username = document.getElementById("username").value;
//     const firstname = document.getElementById("firstName").value;
//     const lastname = document.getElementById("lastName").value;
//     const email = document.getElementById("email").value;
//     const phone = document.getElementById("phoneNumber").value;


//     const data = {
//         username: username,
//         email: email,
//         first_name: firstname,
//         last_name: lastname
//     };

//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch("http://127.0.0.1:8000/account/editprofile/", {

//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": `Token ${token}`

//             },
//             body: JSON.stringify(data)

//         });


//         if (response.ok) {
//             const result = await response.json();
//             alert("profile update successfully");
//             console.log("Update profile", result);


//         } else {

//             const error = await response.json();
//             console.log("profile could't update", error);
//         }

//     }


//     catch (error) {
//         console.log("an error occured by catch");


//     }


// });

const form = document.getElementById("edit-profile-form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    // const phone = document.getElementById("phoneNumber").value;

    const data = {
        username: username,
        email: email,
        first_name: firstName,  
        last_name: lastName    
        
    };
 
    console.log(data);
    try {
        const token = localStorage.getItem('token');
        const response = await fetch("https://car-repair-backend-drf.vercel.app/account/editprofile/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Profile updated successfully!");
            console.log("Updated profile:", result);
        } else {
            const error = await response.json();
            console.log("Profile couldn't be updated:", error);
            alert(`Error updating profile: ${JSON.stringify(error)}`);
        }
    } catch (error) {
        console.log("An error occurred:", error);
        alert("An unexpected error occurred while updating the profile.");
    }
});
