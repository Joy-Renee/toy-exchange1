// Toy data

let toys = [];

async function fetchToys() {
    try {
        const response = await fetch("http://localhost:5000/toys");
        const data = await response.json();
        toys = data.map(toy => {
            const ageString = toy.age_group; // e.g., "10 years"
            const ageNum = parseInt(ageString); // convert to number: 10
        
            let ageGroup;
            if (ageNum >= 0 && ageNum <= 3) ageGroup = "0-3";
            else if (ageNum >= 4 && ageNum <= 6) ageGroup = "4-6";
            else if (ageNum >= 7 && ageNum <= 8) ageGroup = "7-8";
            else if (ageNum >= 9 && ageNum <= 12) ageGroup = "9-12";
            else ageGroup = "Other"; // fallback
        
            return {
                ...toy,
                image: `http://localhost:5000/static/uploads/${toy.image_filename}`,
                age: ageString,
                ageGroup
            };
        });
        renderToys(toys);
        setupDropdownListeners(); // attach listeners after toys are ready
    } catch (error) {
        console.error("Error fetching toys:", error);
    }
}

fetchToys();

function setupDropdownListeners() {
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Stop link reload
            const ageGroup = this.getAttribute('data-age');
            renderToysByAgeGroup(ageGroup);
        });
    });
}


// Get the toy-list container
const toyListContainer = document.getElementById('toy-list');

// Function to create toy card HTML
function createToyCard(toy) {
    return `
        <div class="toy-card">
            <img src="http://localhost:5000/static/${toy.image_filename}" alt="${toy.name}" class="toy-image">
            <h3 class="toy-name">${toy.name}</h3>
            <p class="toy-age">Age: ${toy.age}</p>
            <h4 class="toy-condition"">Condition: ${toy.condition}</h4>
            <h4 class="toy-price">Price: ${toy.price}</h4>
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

// // Add event listeners for dropdown links
// document.querySelectorAll('.dropdown-content a').forEach((link) => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent page reload

//         const ageGroup = e.target.getAttribute('data-age'); // Get age group from data attribute
//         renderToysByAgeGroup(ageGroup); // Render toys for the selected age group
//     });
// });
// ;

document.addEventListener('DOMContentLoaded', function () {
    // Toggle dropdown on click
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', function (e) {
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('show');
        });
    });

    // Age filter links
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const ageGroup = this.getAttribute('data-age');
            renderToysByAgeGroup(ageGroup);
        });
    });
});


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
            <img src="http://localhost:5000/static/${toy.image_filename}" alt="${toy.name}" class="toy-image">
            <h3 class="toy-name">${toy.name}</h3>
            <p class="toy-age">Age: ${toy.age}</p>
            <p>${toy.description}</p>
            <button class="remove-button" onclick="removeFromCart(${toy.id})">Remove</button>
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

