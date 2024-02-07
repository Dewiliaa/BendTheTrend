document.addEventListener('DOMContentLoaded', function () {
    const starContainer = document.querySelector('.ratings');
    const quantitySpan = document.querySelector('.quantity-control span');
    const minusButton = document.querySelector('.quantity-control button:first-child');
    const plusButton = document.querySelector('.quantity-control button:last-child');
    const addToCartButton = document.querySelector('.add-to-cart');

    // Initial quantity is 1
    let quantity = 1;

    starContainer.addEventListener('click', (event) => {
        const clickedStar = event.target;

        if (clickedStar.classList.contains('star')) {
            clickedStar.classList.toggle('filled');
        }
    });

    // Add functionality to plus and minus buttons
    minusButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantityDisplay();
        }
    });

    plusButton.addEventListener('click', () => {
        quantity++;
        updateQuantityDisplay();
    });

    // Update the displayed quantity
    function updateQuantityDisplay() {
        quantitySpan.textContent = quantity;
    }

    // Add functionality to the "Add to Cart" button
    addToCartButton.addEventListener('click', () => {
        // Store the selected quantity in sessionStorage
        sessionStorage.setItem('selectedQuantity', quantity);
        // Navigate to Cart.html
        window.location.href = "Cart.html";
    });
});
