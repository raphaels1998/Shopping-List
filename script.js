document.getElementById('itemInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const itemInput = document.getElementById('itemInput');
        const itemValue = itemInput.value.trim();

        if (itemValue !== '') {
	    
            if(itemValue.length > 25){
		showTemporaryMessage('Please enter a food item');
		itemInput.value = '';
		return;
	    }

            const listItem = document.createElement('li');
            
            // Create and append the item text
            const itemText = document.createElement('span');
            itemText.textContent = itemValue;

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button'; // Adding class for styling

            // Event listener to remove the item when the button is clicked
            deleteButton.addEventListener('click', function() {
                listItem.remove(); // Remove the item when clicked
            });

            // Append both the item text and the delete button to the list item
            listItem.appendChild(itemText);
            listItem.appendChild(deleteButton);

            // Append the list item to the shopping list
            document.getElementById('shoppingList').appendChild(listItem);
            itemInput.value = ''; // Clear the input field
        }
    }
});


function showTemporaryMessage(message) {
    const messageDiv = document.getElementById('temporaryMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block'; // Make the message visible

    // Hide the message after 3 seconds
    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 3000); // 3000 ms = 3 seconds
}