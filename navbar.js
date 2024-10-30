fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch((error) => {
        console.error('Error fetching navbar:', error);
    });




  


    fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => {
        console.error('Error fetching navbar:', error);
    });




       

// loged in user can see his profile 


// document.addEventListener("DOMContentLoaded", async function () {


//     // Fetch user details to determine if logged in
//     try {
//         const token = localStorage.getItem("token");
//         console.log(token);
//         const response = await fetch("http://127.0.0.1:8000/account/user/details/", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
             
//                 Authorization: `Token${token}`,

//             }
//         });

//         if (response.ok) {
//             // User is authenticated, retrieve user data
//             const userData = await response.json();

//             // Update UI with user details
//             document.getElementById("user-email").textContent = `${userData.email} (${userData.first_name})`;
//             document.getElementById("user-info").classList.remove("hidden");
//             document.getElementById("auth-buttons").classList.add("hidden");
//         } else {
//             // User is not authenticated, show login/register buttons
//             document.getElementById("user-info").classList.add("hidden");
//             document.getElementById("auth-buttons").classList.remove("hidden");
//         }
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//     }

//     // Logout button functionality
//     document.getElementById("logoutBtn").addEventListener("click", function () {
//         // Perform logout (e.g., remove token, redirect to login)
//         localStorage.removeItem("token"); // Remove token from local storage
//         window.location.href = "login.html"; // Redirect to login page
//     });
// });



document.addEventListener("DOMContentLoaded", async function () {
  
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await fetch("http://127.0.0.1:8000/account/user/details/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                console.log(userData);

                document.getElementById("user-email").textContent = `${userData.email} (${userData.first_name})`;
                document.getElementById("user-info").classList.remove("hidden");
                document.getElementById("auth-buttons").classList.add("hidden");
            } else {
              
                document.getElementById("user-info").classList.add("hidden");
                document.getElementById("auth-buttons").classList.remove("hidden");
            }
        } else {
        
            document.getElementById("user-info").classList.add("hidden");
            document.getElementById("auth-buttons").classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", async function () {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://127.0.0.1:8000/account/logout/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            });

            if (response.ok) {
                // Logout successful, remove token and redirect to login page
                alert("Logout complete");
                localStorage.removeItem("token");
                window.location.href = "login.html";
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    });

    // Highlight current nav link
    const currentPage = `/${window.location.pathname.split("/").pop()}`;
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("text-blue-700", "font-bold");
        } else {
            link.classList.remove("text-blue-700", "font-bold");
        }
    });
});





