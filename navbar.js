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



// for is admin true 

async function checkAdminAccess() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/account/adminAcess/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Token ${token}`

            }});
        const data = await response.json();
        
        if (data.is_admin) {
            document.getElementById("admin-dashboard-link").style.display = "block";
        }
    } catch (error) {
        console.error("Error checking admin access:", error);
    }
}

// Call the function when the page loads
window.onload = checkAdminAccess;



document.addEventListener("DOMContentLoaded", async function () {
  
    try {
        const token = localStorage.getItem("token");

        if (token) {
            console.log(token);
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
            link.classList.add("text-teal-700", "font-bold");
        } else {
            link.classList.remove("text-blue-700", "font-bold");
        }
    });
});





