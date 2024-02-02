document.addEventListener("DOMContentLoaded", function() {
    // Retrieve billingDetails from localStorage
    var billingDetails = {
        "ORDER_NUMBER": "12345678",
        "EMAIL": "lliavirnanda@gmail.com",
        "PAYMENT_METHOD": "Mastercard xxx456",
        "ORDER_DATE": "1/12/2023",
        "DELIVERY_OPTION": "Standard",
        "DELIVERY_ADDRESS": "BLK 123 Average Home S(123123)",
        "CONTACT_NUMBER": "88888888"
    };

    // Save billingDetails to localStorage
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    // Check if billingDetails is not null
    if (billingDetails) {
        // Call the function to update order details
        updateOrderDetails(billingDetails);
    }
});

function updateOrderDetails(billingDetails) {
    // Update HTML elements with order details
    document.getElementById('order-number').textContent = billingDetails.ORDER_NUMBER;
    document.getElementById('email').textContent = billingDetails.EMAIL;
    document.getElementById('payment-method').textContent = billingDetails.PAYMENT_METHOD;
    document.getElementById('order-date').textContent = billingDetails.ORDER_DATE;
    document.getElementById('delivery-option').textContent = billingDetails.DELIVERY_OPTION;
    document.getElementById('delivery-address').innerHTML = billingDetails.DELIVERY_ADDRESS.replace(/\n/g, "<br>");
    document.getElementById('contact-number').textContent = billingDetails.CONTACT_NUMBER;
}
