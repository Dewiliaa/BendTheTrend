document.addEventListener('DOMContentLoaded', function () {

    //To update the quantity saved in sessionStorage
    function updateQuantityDisplay() {
        const quantity = sessionStorage.getItem('selectedQuantity');
        const quantitySpan = document.querySelector('.quantity-controls span');
        if (quantitySpan) {
            quantitySpan.textContent = quantity;
        }
    }
    updateQuantityDisplay();
    
    //Dom elements for country, state, city
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    //URL and API key for fetching the above
    const url = 'https://api.countrystatecity.in/v1/countries';
    const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';

    //Function to load countries from API
    function loadCountries() {
        fetch(url, { headers: { "X-CSCAPI-KEY": apiKey } })
            .then(response => response.json())
            .then(data => {
                //loop through the data
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.iso2;
                    option.textContent = country.name;
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading countries:', error));
    }

    //Function to load states based on country selected
    function loadStates(countryCode) {
        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option value="" disabled>Select a State</option>';
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="" disabled>Select a City</option>';

        //Fetch data
        fetch(`${url}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": apiKey } })
            .then(response => response.json())
            .then(data => {
                //Loop through
                data.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.iso2;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading states:', error));
    }

    //Function to load cities based on the selected country and state
    function loadCities(countryCode, stateCode) {
        citySelect.disabled = false;
        citySelect.innerHTML = '<option value="" disabled>Select a City</option>';

        fetch(`${url}/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": apiKey } })
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.iso2;
                    option.textContent = city.name;
                    citySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading cities:', error));
    }

    function populateCities() {
        citySelect.innerHTML = '<option value="select" disabled>Select a City</option>';

        const selectedCountry = countrySelect.value;

        if (selectedCountry in countryCitiesMap) {
            countryCitiesMap[selectedCountry].forEach(city => {
                const option = createOption(city, city);
                citySelect.add(option);
            });
        }
    }

    function createOption(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        return option;
    }

    //Function to handle quantity change
    function handleQuantityChange(event) {
        console.log('Quantity button clicked');
        //Check if quantity button is clicked
        if (event.target.matches('.quantity-controls button')) {
            const quantitySpan = event.target.parentElement.querySelector('span');
            let currentQuantity = parseInt(quantitySpan.textContent, 10);
        
            if (event.target.textContent === '+' && currentQuantity < 10) {
                currentQuantity++; // Increment the current quantity
                let total = currentQuantity * 15.99
                document.getElementById("total").innerHTML = "Total: $" + total
            } else if (event.target.textContent === '-' && currentQuantity > 1) {
                currentQuantity--; // Decrement the current quantity
                let total = currentQuantity * 15.99
                document.getElementById("total").innerHTML = "Total: $" + total
            }
    
            quantitySpan.textContent = currentQuantity; // Update the quantity display
            console.log('Updated quantity:', currentQuantity); // Check the updated quantity
        }
    }
    
    //Function to handle item removal from the cart
    function handleRemoveButtonClick(event) {
        if (event.target.matches('.remove-button')) {
            const cartItem = event.target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                let total = 0
                document.getElementById("total").innerHTML = "Total: $" + total
            }
        }
    }

    //Function to redirect to checkout page
    function redirectToCheckout() {
        const selectedCountry = document.getElementById('country').value;
        const selectedState = document.getElementById('state').value;
        const selectedCity = document.getElementById('city').value;
        const postalCode = document.getElementById('postal-code').value;
    
        // Ensure value is correct - just to check
        console.log("Selected Country:", selectedCountry);
        console.log("Selected State:", selectedState);
        console.log("Selected City:", selectedCity); 
    
        //Store information to sessionStorage
        sessionStorage.setItem('selectedCountry', selectedCountry);
        sessionStorage.setItem('selectedState', selectedState);
        sessionStorage.setItem('selectedCity', selectedCity); 
        sessionStorage.setItem('postalCode', postalCode);
    
        window.location.href = "Checkout.html";
    }

    // Load countries when the page loads
    loadCountries();

    // Event listener for country selection
    countrySelect.addEventListener('change', function () {
        const countryCode = this.value;
        if (countryCode !== 'select') {
            loadStates(countryCode);
        }
    });

    // Event listener for state selection
    stateSelect.addEventListener('change', function () {
        const countryCode = countrySelect.value;
        const stateCode = this.value;
        if (stateCode !== 'select') {
            loadCities(countryCode, stateCode);
        }
    });

    // Event listeners for quantity change and item removal
    document.addEventListener('click', handleQuantityChange);
    document.addEventListener('click', handleRemoveButtonClick);

    // Event listener for the "Proceed to Checkout" button
    const checkoutButton = document.querySelector('.proceed-to-checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', redirectToCheckout);
    }
});
