document.getElementById('shoppingListBtn').addEventListener('click', function() {
    document.getElementById('shoppingListSection').style.display = 'block';
    document.getElementById('masterListSection').style.display = 'none';
});

document.getElementById('masterListBtn').addEventListener('click', function() {
    document.getElementById('masterListSection').style.display = 'block';
    document.getElementById('shoppingListSection').style.display = 'none';
});

// Default to show the Shopping List first and hide the Master List
document.getElementById('shoppingListSection').style.display = 'block'; // Display shopping list initially
document.getElementById('masterListSection').style.display = 'none'; // Hide master list initially

// Handle the "Enter" key for Shopping List input
document.getElementById('shoppingInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const shoppingInput = document.getElementById('shoppingInput').value;
        if (shoppingInput.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = shoppingInput;
            document.getElementById('shoppingList').appendChild(li);
            document.getElementById('shoppingInput').value = ''; // Clear input field
        }
        event.preventDefault(); // Prevent form submission or other default actions when Enter is pressed
    }
});

// Handle the "Enter" key for Master List input
document.getElementById('masterInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const masterInput = document.getElementById('masterInput').value;
        if (masterInput.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = masterInput;
            document.getElementById('masterList').appendChild(li);
            document.getElementById('masterInput').value = ''; // Clear input field
        }
        event.preventDefault(); // Prevent form submission or other default actions when Enter is pressed
    }
});
