document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user input from session storage
    const selectedCountry = sessionStorage.getItem('selectedCountry');
    const selectedCity = sessionStorage.getItem('selectedCity');
    const postalCode = sessionStorage.getItem('postalCode');
    const couponCode = sessionStorage.getItem('couponCode');

    // Pre-fill the form fields
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    const postalCodeInput = document.getElementById('postal-code');
    const couponCodeInput = document.getElementById('coupon-code');

    countrySelect.value = selectedCountry;

    // Pre-fill city if it exists
    if (selectedCity) {
        citySelect.value = selectedCity;
    }

    // Pre-fill postal code if it exists
    if (postalCode) {
        postalCodeInput.value = postalCode;
    }

    couponCodeInput.value = couponCode;

    // Clear session storage after retrieving the information
    sessionStorage.clear();

    // Get the card details container
    const cardDetails = document.getElementById('card-details');

    // Get the payment options radio buttons
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Add event listener to each payment option
    paymentOptions.forEach(function (option) {
        option.addEventListener('change', function () {
            console.log('Payment option changed!');
            // Display card details only if Mastercard or Visa is selected
            cardDetails.style.display = (option.id === 'mastercard' || option.id === 'visa') ? 'block' : 'none';
        });
    });

    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (validateBillingDetails()) {
            const billingDetails = {
                orderNumber: generateOrderNumber(),
                email: document.getElementById('email').value,
                paymentMethod: getSelectedPaymentMethod(),
                orderDate: getCurrentDate(),
                deliveryOption: getSelectedDeliveryOption(),
                deliveryAddress: getDeliveryAddress(),
                contactNumber: document.getElementById('Phone').value,
            };

            localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
            redirectToSummary();
        }
    });

    function validateBillingDetails() {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const country = document.getElementById('country').value;
        const streetAddress = document.getElementById('street-address').value;
        const ZIP = document.getElementById('ZIP').value;
        const town = document.getElementById('Town').value;
        const phone = document.getElementById('Phone').value;
        const email = document.getElementById('email').value;

        if (
            firstName === '' ||
            lastName === '' ||
            country === '' ||
            streetAddress === '' ||
            ZIP === '' ||
            town === '' ||
            phone === '' ||
            email === ''
        ) {
            alert('Please fill in all the required billing details.');
            return false;
        }

        return true;
    }

    function generateOrderNumber() {
        return '12345678';
    }

    function getSelectedPaymentMethod() {
        return 'mastercard';
    }

    function getCurrentDate() {
        return '1st November 2021';
    }

    function getSelectedDeliveryOption() {
        return 'standardDelivery';
    }

    function getDeliveryAddress() {
        return 'Singapore 123456\nJalan Bukit Merah\nBLK 102\n#07-123';
    }

    function redirectToSummary() {
        window.location.href = 'Summary.html';
    }

});
