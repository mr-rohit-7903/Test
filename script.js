// Select elements from the DOM
const nameInput = document.querySelector('.name');
const portfolioInput = document.querySelector('.portfolio');
const button = document.querySelector('button');
const container = document.querySelector('.container');

// Function to fetch and display cards from the server
async function fetchCards() {
    try {
        const response = await fetch('https://test-1-wune.onrender.com');
        const items = await response.json();
        displayCards(items);
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

// Function to display cards in the container
function displayCards(items) {
    // Clear existing cards
    container.innerHTML = '';

    // Create a card for each item
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h1>${item.name}</h1>
            <a href="${item.url}">Portfolio</a>
        `;
        container.appendChild(card);
    });
}

// Function to handle adding a new item
async function addItem() {
    const name = nameInput.value;
    const portfolioLink = portfolioInput.value;

    if (name && portfolioLink) {
        try {
            const response = await fetch('https://test-1-wune.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, url: portfolioLink })
            });

            if (response.ok) {
                const newItem = await response.json();
                console.log('New item added:', newItem);
                fetchCards(); // Refresh the list of cards
                nameInput.value = ''; // Clear input fields
                portfolioInput.value = '';
            } else {
                console.error('Error adding item:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    } else {
        alert('Please enter both name and portfolio link.');
    }
}

// Event listener for the button
button.addEventListener('click', addItem);

// Initial fetch to display existing items
fetchCards();
