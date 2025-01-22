// Function to show the corresponding list based on the button clicked
function showList(listType) {
    // Hide both lists and input fields initially
    document.getElementById('master-list').style.display = 'none';
    document.getElementById('shopping-list').style.display = 'none';
    document.getElementById('master-input').style.display = 'none';
    document.getElementById('shopping-input').style.display = 'none';

    // Show the corresponding list and input field based on the listType parameter
    if (listType === 'master') {
        document.getElementById('master-list').style.display = 'block';
        document.getElementById('master-input').style.display = 'inline-block';  // Show input for Master List
    } else if (listType === 'shopping') {
        document.getElementById('shopping-list').style.display = 'block';
        document.getElementById('shopping-input').style.display = 'inline-block';  // Show input for Shopping List
    }
}

// Ensure Master List is shown by default on page load (with input)
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
        input.value = ''; // Clear the input field
    }
}

// Add event listeners for both input fields
document.getElementById('master-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('master'); // Pass 'master' to the addItem function
    }
});

document.getElementById('shopping-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem('shopping'); // Pass 'shopping' to the addItem function
    }
})
    
