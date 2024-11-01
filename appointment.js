
  document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
      event.preventDefault(); 

      // Collect form data
      const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        date: document.getElementById("date").value,
        car_brand: document.getElementById("car-brand").value,
        car_model: document.getElementById("car-model").value,
        car_number: document.getElementById("car-number").value,
        services: Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.nextElementSibling.textContent.trim())
      };

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/appoint/appoint_details/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Success response
          const data = await response.json();
          console.log(data);
          alert("Appointment submit successfully complete.");
          form.reset(); 
        } else {
         
          const errorData = await response.json();
          alert("Failed to create appointment: " + JSON.stringify(errorData));
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    });
  });







