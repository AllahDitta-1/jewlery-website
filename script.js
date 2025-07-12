document.addEventListener('DOMContentLoaded', () => {
    // Cart array to store selected items
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Add item to cart
    const addToCart = (productName, price) => {
        cart.push({ name: productName, price: parseFloat(price.replace('$', '')) });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} has been added to your cart!`);
    };

    // Initialize cart count
    updateCartCount();

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.btn[href="#"]');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const price = productCard.querySelector('p').textContent;
            addToCart(productName, price);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.includes('.html')) return; // Skip external page navigation
            
            e.preventDefault();
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.textContent = '☰';
    header.appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuToggle.textContent = nav.classList.contains('show') ? '✕' : '☰';
    });
});

// Add some basic CSS for the cart count and mobile menu
const style = document.createElement('style');
style.textContent = `
    .cart-count {
        background: #e67e22;
        color: white;
        border-radius: 50%;
        padding: 2px 8px;
        font-size: 0.8rem;
        position: relative;
        top: -10px;
        left: 5px;
    }
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        nav ul {
            display: none;
        }
        nav ul.show {
            display: flex;
        }
    }
`;
document.head.appendChild(style);