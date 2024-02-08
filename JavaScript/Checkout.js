document.addEventListener('DOMContentLoaded', async function () {

    // Default amount to convert
    const defaultAmountToConvert = 17.99;

    // Default currency to convert from
    updateTotalInCurrency(defaultAmountToConvert, 'SGD');

    // Retrieve stored country, city, state, and postal code from session storage
    const selectedCountry = sessionStorage.getItem('selectedCountry');
    const postalCode = sessionStorage.getItem('postalCode');
    const selectedCity = sessionStorage.getItem('selectedCity');
    const selectedState = sessionStorage.getItem('selectedState');

    // Pre-fill the corresponding form fields with retrieved values
    const countryInput = document.getElementById('country');
    const stateInput = document.getElementById('state');
    const postalCodeInput = document.getElementById('postal-code');
    const townCityInput = document.getElementById('city');

    if (selectedCountry) {
        countryInput.value = selectedCountry;
    }

    if (selectedState) {
        stateInput.value = selectedState;
    }

    if (postalCode) {
        postalCodeInput.value = postalCode;
    }

    if (selectedCity) {
        townCityInput.value = selectedCity;  
    }

    // Populate the currency dropdown
    const currencyDropdown = document.getElementById('convert');
    try {
        const currencyList = await fetchCurrencyList(); // Fetch the list of currencies
        currencyList.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.code;
            option.textContent = `${currency.name} (${currency.code})`;
            currencyDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching currency list:', error);
    }

    // Get the card details
    const cardDetails = document.getElementById('card-details');

    // Get the payment options
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Event listener to each payment option
    paymentOptions.forEach(function (option) {
        option.addEventListener('change', function () {
            // Display card details only if Mastercard or Visa is selected
            cardDetails.style.display = (option.id === 'mastercard' || option.id === 'visa') ? 'block' : 'none';
        });
    });

    // Event listener for currency dropdown change
    currencyDropdown.addEventListener('change', async function () {
        const selectedCurrency = currencyDropdown.value;
        try {
            // Fetch the conversion rate for the selected currency
            const conversionRate = await fetchConversionRate('SGD', selectedCurrency);
            // Calculate the converted amount
            const convertedAmount = defaultAmountToConvert * conversionRate;
            // Update the display with the converted amount
            updateTotalInCurrency(convertedAmount, selectedCurrency);
        } catch (error) {
            console.error('Error fetching conversion rate:', error);
        }
    });

    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', async function (event) {
        event.preventDefault();

        if (validateBillingDetails()) {
            updateBillingDetails();
            storeBillingDetails();

            redirectToSummary();

            // Convert the total amount to the selected currency
            const selectedCurrency = document.getElementById('convert').value;
            try {
                // Fetch the conversion result
                const conversionRate = await fetchConversionRate('SGD', selectedCurrency);
                // Calculate the converted amount
                const convertedAmount = defaultAmountToConvert * conversionRate;
                // Update the display with the converted amount
                updateTotalInCurrency(convertedAmount, selectedCurrency);
            } catch (error) {
                console.error('Error fetching currency conversion:', error);
            }
        }
    });

    function validateBillingDetails() {
        // Validate form fields
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const country = document.getElementById('country').value;
        const streetAddress = document.getElementById('street-address').value;
        const state = document.getElementById('state').value;
        const ZIP = document.getElementById('postal-code').value;
        const town = document.getElementById('city').value;
        const phone = document.getElementById('Phone').value;
        const email = document.getElementById('email').value;

        if (
            firstName === '' ||
            lastName === '' ||
            country === '' ||
            streetAddress === '' ||
            state === '' ||
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
        document.getElementById('first-name').value = document.getElementById('first-name').value;
        document.getElementById('last-name').value = document.getElementById('last-name').value;
        document.getElementById('country').value = document.getElementById('country').value;
        document.getElementById('street-address').value = document.getElementById('street-address').value;
        document.getElementById('state').value = document.getElementById('state').value;
        document.getElementById('postal-code').value = document.getElementById('postal-code').value;
        document.getElementById('city').value = document.getElementById('city').value;
        document.getElementById('Phone').value = document.getElementById('Phone').value;
        document.getElementById('email').value = document.getElementById('email').value;
    }

    function storeBillingDetails() {
        // Store billing details in local storage
        const billingDetails = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            country: document.getElementById('country').value,
            streetAddress: document.getElementById('street-address').value,
            state: document.getElementById('state').value,
            ZIP: document.getElementById('postal-code').value,
            town: document.getElementById('city').value,
            phone: document.getElementById('Phone').value,
            email: document.getElementById('email').value
        };

        localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
    }

    async function fetchCurrencyList() {
        const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Vds6Gm6cqg4jKxVxkhhOfg9LGQ8geHfc5u1Zg0CU');
        const data = await response.json();
        return Object.keys(data.data).map(code => ({ code, name: '' }));
    }

    async function fetchConversionRate(fromCurrency, toCurrency) {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Vds6Gm6cqg4jKxVxkhhOfg9LGQ8geHfc5u1Zg0CU`);
        const data = await response.json();
        return data.data[toCurrency];
    }

    function updateTotalInCurrency(amount, currency) {
        document.querySelector('.displaycurrency h3').textContent = `Total in Currency: ${currency} ${amount.toFixed(2)}`;
    }

    function redirectToSummary() {
        window.location.href = 'loading.html';
    }
});
