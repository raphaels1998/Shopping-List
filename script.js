// Function to show the corresponding list based on the button clicked
function showList(listType) {
    // Hide both lists initially
    document.getElementById('master-list').style.display = 'none';
    document.getElementById('shopping-list').style.display = 'none';

    // Show the corresponding list based on the listType parameter
    if (listType === 'master') {
        document.getElementById('master-list').style.display = 'block';
    } else if (listType === 'shopping') {
        document.getElementById('shopping-list').style.display = 'block';
    }
}

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

// Initialize by showing the Master List section
document.addEventListener('DOMContentLoaded', () => {
    showList('master'); // Show master list by default
});  
document.getElementById('inputValue').addEventListener('keydown', function(event) {
        
    if (event.key === 'Enter') {
                addItem(listType);
    }
});
    
