document.addEventListener("DOMContentLoaded", function() {
    // Retrieve billingDetails from localStorage
    var billingDetails = JSON.parse(localStorage.getItem("billingDetails"));

    // Check if billingDetails is not null
    if (billingDetails) {
        // Call the function to update order details
        updateOrderDetails(billingDetails);
    }
});

function updateOrderDetails(billingDetails) {
    // Update HTML elements with order details
    document.getElementById('order-number').textContent = generateOrderNumber();
    document.getElementById('email').textContent = billingDetails.email;
    document.getElementById('payment-method').textContent = billingDetails.paymentMethod || "Mastercard xxx456";
    document.getElementById('order-date').textContent = getCurrentDate();
    document.getElementById('delivery-option').textContent = billingDetails.deliveryOption || "Standard";

    // Retrieve delivery address and contact number from billingDetails
    const streetAddress = `${billingDetails.streetAddress}, ${billingDetails.town}, ${billingDetails.Country}, ${billingDetails.ZIP}`;
    document.getElementById('street-address').textContent = streetAddress.replace(/, undefined/g, '');
    document.getElementById('Phone').textContent = billingDetails.phone;
}

function generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

function getCurrentDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
