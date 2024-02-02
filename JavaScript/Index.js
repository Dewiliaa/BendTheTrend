document.addEventListener("DOMContentLoaded", function () {
    // Get form, login button, and navigation links
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");
    const shopLink = document.getElementById("shopLink");
    const loginLink = document.getElementById("loginLink");

    // Function to check if both username and password are filled
    function isLoginValid() {
        const username = document.getElementById("loginUser").value;
        const password = document.getElementById("loginPassword").value;
        return username.trim() !== "" && password.trim() !== "";
    }

    // Add event listener to the login button
    loginBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form from submitting by default

        // Check if both username and password are filled
        if (isLoginValid()) {
            // If valid, redirect to Shop.html
            window.location.href = "Shop.html";
        } else {
            alert("Please fill in both username and password.");
        }
    });

    // Add event listener to the Shop link
    shopLink.addEventListener("click", function (event) {
        // Check if login is valid before redirecting to Shop.html
        if (!isLoginValid()) {
            event.preventDefault(); // Prevent the default link behavior
            alert("Please log in first.");
        }
    });

    // Add event listener to the Log In link
    loginLink.addEventListener("click", function (event) {
        
    });
});
