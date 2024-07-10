document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    const deliveryFee = 1550;
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderSummarySection = document.getElementById('order-summary-section');

    cartItems.forEach(item => {
        const decreaseBtn = item.querySelector('.decrease-btn');
        const increaseBtn = item.querySelector('.increase-btn');
        const quantityInput = item.querySelector('.quantity input');
        const price = parseInt(item.querySelector('.price').innerText.replace('NGN ', ''));
        const totalElement = item.querySelector('.total');
        const deleteBtn = item.querySelector('.delete-btn');

        decreaseBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateTotal(quantity, price, totalElement);
            }
        });

        increaseBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotal(quantity, price, totalElement);
        });

        deleteBtn.addEventListener('click', function() {
            item.remove();
            updateGrandTotal();
            updateOrderSummary();
        });
    });

    function updateTotal(quantity, price, totalElement) {
        const total = price * quantity;
        totalElement.innerText = 'NGN ' + total;
        updateGrandTotal();
        updateOrderSummary();
    }

    function updateGrandTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let grandTotal = 0;
        cartItems.forEach(item => {
            const total = parseInt(item.querySelector('.total').innerText.replace('NGN ', ''));
            grandTotal += total;
        });
        document.getElementById('grand-total').innerText = 'NGN ' + grandTotal;
    }

    function updateOrderSummary() {
        const orderItemsList = document.getElementById('order-items');
        orderItemsList.innerHTML = '';

        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;

        cartItems.forEach(item => {
            const description = item.querySelector('.product-description span').innerText;
            const total = parseInt(item.querySelector('.total').innerText.replace('NGN ', ''));
            subtotal += total;

            const listItem = document.createElement('li');
            listItem.classList.add('order-item');
            listItem.innerHTML = `${description} <span>NGN ${total}</span>`;
            orderItemsList.appendChild(listItem);
        });

        document.getElementById('subtotal').innerText = 'NGN ' + subtotal;
        document.getElementById('delivery-fee').innerText = 'NGN ' + deliveryFee;
        document.getElementById('total').innerText = 'NGN ' + (subtotal + deliveryFee);
    }

    checkoutBtn.addEventListener('click', function() {
        orderSummarySection.classList.remove('hidden');
        updateOrderSummary();
    });

    updateGrandTotal();
});
