document.addEventListener('DOMContentLoaded', function () {
    // Retrieve stored country, city, and postal code from session storage
    const selectedCountry = sessionStorage.getItem('selectedCountry');
    const postalCode = sessionStorage.getItem('postalCode');
    const selectedCity = sessionStorage.getItem('selectedCity');

    // Pre-fill the corresponding form fields with retrieved values
    const countryInput = document.getElementById('country'); // Update ID here
    const postalCodeInput = document.getElementById('postal-code'); // Update ID here
    const townCityInput = document.getElementById('city'); // Update ID here

    if (selectedCountry) {
        countryInput.value = selectedCountry;
        // Optionally, you might want to trigger an event here if populating the city depends on the selected country
    }

    if (postalCode) {
        postalCodeInput.value = postalCode;
    }

    if (selectedCity) {
        townCityInput.value = selectedCity;
    }

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
            // Update billing details
            updateBillingDetails();

            // Store billing details in local storage
            storeBillingDetails();

            // Redirect to summary page
            redirectToSummary();
        }
    });

    function validateBillingDetails() {
        // Validate form fields
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const country = document.getElementById('country').value; // Update ID here
        const streetAddress = document.getElementById('street-address').value;
        const ZIP = document.getElementById('postal-code').value; // Update ID here
        const town = document.getElementById('city').value; // Update ID here
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

    function updateBillingDetails() {
        // Update billing details section with form values
        document.getElementById('first-name').textContent = document.getElementById('first-name').value;
        document.getElementById('last-name').textContent = document.getElementById('last-name').value;
        document.getElementById('country').textContent = document.getElementById('country').value; // Update ID here
        document.getElementById('street-address').textContent = document.getElementById('street-address').value;
        document.getElementById('postal-code').textContent = document.getElementById('postal-code').value; // Update ID here
        document.getElementById('city').textContent = document.getElementById('city').value; // Update ID here
        document.getElementById('Phone').textContent = document.getElementById('Phone').value;
        document.getElementById('email').textContent = document.getElementById('email').value;
    }

    function storeBillingDetails() {
        // Store billing details in local storage
        const billingDetails = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            country: document.getElementById('country').value, // Update ID here
            streetAddress: document.getElementById('street-address').value,
            ZIP: document.getElementById('postal-code').value, // Update ID here
            town: document.getElementById('city').value, // Update ID here
            phone: document.getElementById('Phone').value,
            email: document.getElementById('email').value
        };

        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
    }

    function redirectToSummary() {
        // Redirect to summary page
        window.location.href = '/HTML/Summary.html';
    }
});
