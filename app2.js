
// fetch the total number of appointment
async function fetchTotalAppointments() {
    try {
        const response = await fetch("http://127.0.0.1:8000/appoint/appoint_details/");
        const data = await response.json();

        
        document.getElementById("totalAppointments").textContent = data.total_appointments;
    } catch (error) {
        console.error("Error fetching total appointments:", error);
    }
}


fetchTotalAppointments();




// fetch the appoinment list 

async function fetchAppointments() {
    try {
        const response = await fetch("http://127.0.0.1:8000/appoint/appoint_details/");
        const data = await response.json();

   
        document.getElementById("totalAppointments").textContent = data.total_appointments;

     
        const appointmentList = document.getElementById("appointmentList");
        appointmentList.innerHTML = ""; 

        data.appointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.className = appointment.id % 2 === 0 ? "bg-white" : "bg-blue-100"; 
            row.innerHTML = `
                <td class="px-4 py-3 border-b">${appointment.id}</td>
                <td class="px-4 py-3 border-b text-blue-500 hover:underline cursor-pointer" onclick="showAppointmentDetails(${appointment.id})">${appointment.name}</td>
                <td class="px-4 py-3 border-b">${appointment.phone}</td>
            `;
            appointmentList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
}


    // Fetch appointment details when the name is clicked
    async function showAppointmentDetails(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/appoint/appointments/${id}/`);
            const appointment = await response.json();

            const appointmentDetailList = document.getElementById("appointmentDetailList");
            appointmentDetailList.innerHTML = ""; 

            const details = [
                { field: "ID", value: appointment.id },
                { field: "Name", value: appointment.name },
                { field: "Phone", value: appointment.phone },
                { field: "Email", value: appointment.email },
                { field: "Date", value: appointment.date },
                { field: "Car Brand", value: appointment.car_brand },
                { field: "Car Model", value: appointment.car_model },
                { field: "Car Number", value: appointment.car_number },
                { field: "Services", value: appointment.services },
            ];

            details.forEach(detail => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-4 py-3 border-b">${detail.field}</td>
                    <td class="px-4 py-3 border-b">${detail.value}</td>
                `;
                appointmentDetailList.appendChild(row);
            });

           
            document.getElementById("appointmentDetails").classList.remove("hidden");
        } catch (error) {
            console.error("Error fetching appointment details:", error);
        }
    }




// Fetch appointments on page load
fetchAppointments();