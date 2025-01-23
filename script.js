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

// Function to add an item to the selected list
function addItem(listType) {
    let input, list;
    
    if (listType === 'master') {
        input = document.getElementById('master-input');
        list = document.getElementById('master-list');
    } else if (listType === 'shopping') {
        input = document.getElementById('shopping-input');
        list = document.getElementById('shopping-list');
    }

    const value = input.value.trim();
    if (value) {
        const li = document.createElement('li');
        li.textContent = value;
        list.appendChild(li);
        input.value = ''; 

        alert("Item added: " + value);
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
