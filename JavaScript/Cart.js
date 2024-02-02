document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country');
    let citySelect = document.getElementById('city');

    const countryCitiesMap = {
        india: ['Mumbai', 'Delhi', 'Bangalore'],
        china: ['Beijing', 'Shanghai', 'Guangzhou'],
        japan: ['Tokyo', 'Osaka', 'Kyoto']
    };

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

    function handleQuantityChange(event) {
        if (event.target.matches('.quantity-controls button')) {
            const quantitySpan = event.target.parentElement.querySelector('span');
            const currentQuantity = parseInt(quantitySpan.textContent, 10);

            if (event.target.textContent === '+' && currentQuantity < 10) {
                quantitySpan.textContent = currentQuantity + 1;
            } else if (event.target.textContent === '-' && currentQuantity > 1) {
                quantitySpan.textContent = currentQuantity - 1;
            }
        }
    }

    function handleRemoveButtonClick(event) {
        if (event.target.matches('.remove-button')) {
            const cartItem = event.target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
            }
        }
    }

    function redirectToCheckout() {
        sessionStorage.setItem('selectedCountry', countrySelect.value);
        sessionStorage.setItem('selectedCity', citySelect.value);
        sessionStorage.setItem('postalCode', document.getElementById('postal-code').value);
        sessionStorage.setItem('couponCode', document.getElementById('coupon-code').value);

        window.location.href = "Checkout.html";
    }

    // Event listeners
    document.getElementById('country').addEventListener('change', populateCities);
    document.addEventListener('click', handleQuantityChange);
    document.addEventListener('click', handleRemoveButtonClick);

    // Additional event listener for the "Proceed to Checkout" button
    const checkoutButton = document.querySelector('.proceed-to-checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', redirectToCheckout);
    }
});
