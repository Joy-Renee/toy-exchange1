// // Array of toy objects
// const toys = Array.from({ length: 40 }, (_, index) => ({
//     name: `Toy ${index + 1}`,
//     age: `${2 + index % 10}+ years`,
//     description: `Description for Toy ${index + 1}`,
//     image: `images/0-3/toy${(index % 10) + 1}.jpeg`, // Assumes images are named toy1.jpg to toy10.jpg
// }));

// // Get the toy-list container
// const toyListContainer = document.getElementById('toy-list');

// // Function to create toy card HTML
// function createToyCard(toy) {
//     return `
//         <div class="toy-card">
//             <img src="${toy.image}" alt="${toy.name}" class="toy-image">
//             <h3 class="toy-name">${toy.name}</h3>
//             <p class="toy-age">Age: ${toy.age}</p>
//             <div class="toy-buttons">
//                 <button class="exchange-button">Exchange</button>
//                 <button class="description-button">Description</button>
//                 <button class="buy-button">Buy</button>
//             </div>
//         </div>
//     `;
// }

// // Render all toys
// function renderToys(toys) {
//     const toyCards = toys.map(createToyCard).join('');
//     toyListContainer.innerHTML = toyCards;
// }

// // Call renderToys to display the toys
// renderToys(toys);


// Toy data
const toys = Array.from({ length: 40 }, (_, index) => ({
    name: `Toy ${index + 1}`,
    age: `${1 + index % 12} years`,
    description: `Description for Toy ${index + 1}`,
    image: `images/0-3/toy${(index % 10) + 1}.jpeg`,
}));

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
                <button class="exchange-button">Exchange</button>
                <button class="description-button">Description</button>
                <button class="buy-button">Buy</button>
            </div>
        </div>
    `;
}

// Render toys
function renderToys(filteredToys) {
    toyListContainer.innerHTML = filteredToys.map(createToyCard).join('');
}

// Initial rendering of all toys
renderToys(toys);

// Filter by age group
function filterByAgeGroup(ageRange) {
    const filteredToys = toys.filter((toy) => toy.age.startsWith(ageRange));
    renderToys(filteredToys);
}

// Add event listeners for age group filters
document.querySelectorAll('.dropdown-content a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const ageRange = e.target.textContent.match(/\d+-\d+/)[0]; // Extract age range (e.g., "0-3")
        filterByAgeGroup(ageRange);
    });
});

// Search function
function searchToys(query) {
    const filteredToys = toys.filter(
        (toy) =>
            toy.name.toLowerCase().includes(query.toLowerCase()) ||
            toy.description.toLowerCase().includes(query.toLowerCase())
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
