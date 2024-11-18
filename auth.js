document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const payload = {
        username: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        confirm_password: confirmPassword,
    };


    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch('https://car-repair-backend-drf.vercel.app/account/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(payload);
            alert("Check your E-mail & confirm now");
            window.location.href = 'login.html';
        } else {

            const errorData = await response.json();
            alert(`Error: ${errorData.message || "Registration failed."}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});




// for login code 


document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

  
    try {
        const response = await fetch("https://car-repair-backend-drf.vercel.app/account/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            if (data.token) 
                { alert("login successfull") }

            else  {
                alert("Something wrong can't login ")
            }



            const token = data.token;
            const userEmail = data.email;

            // Store token in local storage
            localStorage.setItem("token", token);

            localStorage.setItem("email", userEmail);


            window.location.href = "index.html";
        } else {
            const errorData = await response.json();
            alert(errorData.error || "Login failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("login failed. Please try again.");
    }
});