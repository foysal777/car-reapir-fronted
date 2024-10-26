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




       



