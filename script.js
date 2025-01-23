// Function to show the corresponding list based on the button clicked
function showList(listType) {
    // Hide both list sections and their inputs
    document.getElementById('master-list-section').classList.remove('active');
    document.getElementById('shopping-list-section').classList.remove('active');

    // Show the corresponding list section based on the listType parameter
    if (listType === 'master') {
        document.getElementById('master-list-section').classList.add('active');
    } else if (listType === 'shopping') {
        document.getElementById('shopping-list-section').classList.add('active');
    }
}

// Ensure Master List is shown by default on page load
window.onload = function() {
    showList('master');
};

// Function to create a temporary pop-up message
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000); // Remove the pop-up after 3 seconds
}

function addItem(listType) {
    let input, list;
    
    if (listType === 'master') {
        input = document.getElementById('master-input');
        list = document.getElementById('master-list');
    } else if (listType === 'shopping') {
        input = document.getElementById('shopping-input');
        list = document.getElementById('shopping-list');
    }

    const value = input.value.trim().toLowerCase();
    
    // Validate input
    const regex = /^[a-z ]+$/;
    if (regex.test(value)) {
        // Check if the item already exists in the list
        const items = list.getElementsByTagName('li');
        let duplicate = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent.toLowerCase() === value) {
                duplicate = true;
                break;
            }
        }

        if (!duplicate) {
            const li = document.createElement('li');
            li.textContent = value;

            // Add "Add to Cart" button next to the item
            if (listType === 'master') {
                const addButton = document.createElement('button');
                addButton.textContent = "Add to Cart";
                addButton.classList.add('add-to-cart');
                addButton.onclick = function() {
                    addToCart(value);
                };
                li.appendChild(addButton);
            }

            list.appendChild(li);
        } else {
            showPopup("Duplicate item.");
        }
    } else {
        showPopup("Invalid input");
    }
    input.value = ''; // Clear the input field
}

// Function to add an item to the shopping list, ensuring no duplicates
function addToCart(item) {
    const shoppingList = document.getElementById('shopping-list');
    const items = shoppingList.getElementsByTagName('li');
    let duplicate = false;
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === item) {
            duplicate = true;
            break;
        }
    }

    if (!duplicate) {
        const li = document.createElement('li');
        li.textContent = item;
        shoppingList.appendChild(li);
    } else {
        showPopup("Item already in shopping list.");
    }
}

// Add event listeners for both input fields
document.getElementById('master-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('master');
    }
});

document.getElementById('shopping-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('shopping');
    }
});
