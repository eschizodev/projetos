const cartItems = [];
const cartCountElem = document.getElementById('cart-count');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.card-body');
        const productName = productCard.querySelector('.card-title').innerText;
        const productPrice = parseFloat(productCard.querySelector('.price').innerText.replace('R$ ', '').replace(',', '.'));

        cartItems.push({ name: productName, price: productPrice });
        updateCartCount();
    });
});

function updateCartCount() {
    cartCountElem.innerText = cartItems.length;
}

document.getElementById('cart-button').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const itemsList = cartItems.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('%0A');
    const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const message = `Pedido:%0A${itemsList}%0ATotal: R$ ${total}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl);
});
