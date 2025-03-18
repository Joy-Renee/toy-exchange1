// Toy data
const toys = Array.from({ length: 40 }, (_, index) => {
    const ageGroups = ["0-3", "4-6", "7-8", "9-12"]; // Define age groups
    let ageGroup;

    if(index % 12 <= 2) ageGroup = "0-3"
    else if(index % 12 <= 5) ageGroup = "4-6"
    else if(index % 12 <= 8) ageGroup = "7-8"
    else ageGroup = "9-12"

    return {
        id: index + 1,
        name: `Toy ${index + 1}`,
        age: `${1 + index % 12} years`,
        description: `Description for Toy ${index + 1}`,
        image: `images/0-3/toy${(index % 10) + 1}.jpeg`,
        ageGroup, // Add the ageGroup property
    }
});

// Get the toy-list container
const toyListContainer = document.getElementById('toy-list');

// Function to create toy card HTML
function createToyCard(toy) {
    return `
        <div class="toy-card">
            <img src="${toy.image}" alt="${toy.name}" class="toy-image">
            <h3 class="toy-name">${toy.name}</h3>
            <p class="toy-age">Age: ${toy.age}</p>
            <div class="toy-buttons">
                <button class="exchange-button" onclick="window.location.href='chat.html'">Exchange</button>
                <button class="description-button">Description</button>
                <button class="buy-button" onclick="addToCart(${toy.id})">Buy</button>
            </div>
        </div>
    `;
}

function startExchange(toyId) {
    const toy = toys.find(t => t.id === toyId);
    if (toy) {
        const roomName = `exchange_room_${toy.id}`;
        localStorage.setItem("chatRoom", roomName); // Store room name for chat.js
        window.location.href = "chat.html"; // Redirect to chat page
    }
}

// Render toys
function renderToys(filteredToys) {
    toyListContainer.innerHTML = filteredToys.map(createToyCard).join('');
}

// Initial rendering of all toys
renderToys(toys);


// Search function
function searchToys(query) {
    const filteredToys = toys.filter(
        (toy) =>
            toy.name.toLowerCase().includes(query.toLowerCase()) ||
            toy.age.toLowerCase().includes(query.toLowerCase())
    );
    renderToys(filteredToys);
}

// Add event listener for search form
document.querySelector('.search-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    const query = document.querySelector('.search-input').value;
    searchToys(query);
});

// Add event listener for live search (optional)
document.querySelector('.search-input').addEventListener('input', (e) => {
    searchToys(e.target.value);
});

// Function to render toys based on age group
function renderToysByAgeGroup(ageGroup) {
    const groupedToys = toys.filter((toy) => toy.ageGroup === ageGroup);
    toyListContainer.innerHTML = groupedToys.map(createToyCard).join('');
}

// Add event listeners for dropdown links
document.querySelectorAll('.dropdown-content a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page reload

        const ageGroup = e.target.getAttribute('data-age'); // Get age group from data attribute
        renderToysByAgeGroup(ageGroup); // Render toys for the selected age group
    });
});
;

const cart = []; // Array to store toys added to the cart

function addToCart(toyId) {
    const toy = toys.find((t) =>t.id === toyId);
    if (!cart.includes(toy)) {
        cart.push(toy);
        alert(`${toy.name} has been added to the cart!`);
    } else {
        alert(`${toy.name} is already in the cart.`);
    }
}

function renderCart() {
    const cartContainer = document.getElementById('toy-list'); // Use the same container
    if (cart.length === 0) {
        cartContainer.innerHTML = '<h2>Your cart is empty.</h2>';
        return;
    }

    const cartItems = cart.map((toy) => `
        <div class="toy-card">
            <img src="${toy.image}" alt="${toy.name}" class="toy-image">
            <h3 class="toy-name">${toy.name}</h3>
            <p class="toy-age">Age: ${toy.age}</p>
            <p>${toy.description}</p>
            <button class="remove-button" onclick="removeFromCart(${toy.id})">Remove</button>
            <button class="message-button" onclick="messageSeller(${toy.id})">Message</button>
            </div>
    `).join('');

    cartContainer.innerHTML = `
        <h2>Your Cart</h2>
        <div class="cart-items">${cartItems}</div>
    `;
}

function removeFromCart(toyId) {
    const toyIndex = cart.findIndex((toy) => toy.id === toyId);
    if (toyIndex > -1) {
        cart.splice(toyIndex, 1);
        alert('Item removed from the cart.');
        renderCart(); // Re-render the cart
    }
}

function messageSeller(toyId) {
    
}