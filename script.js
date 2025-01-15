document.getElementById('shoppingListBtn').addEventListener('click', function() {
    document.getElementById('shoppingListSection').style.display = 'block';
    document.getElementById('masterListSection').style.display = 'none';
});

document.getElementById('masterListBtn').addEventListener('click', function() {
    document.getElementById('masterListSection').style.display = 'block';
    document.getElementById('shoppingListSection').style.display = 'none';
});

document.getElementById('addShoppingItem').addEventListener('click', function() {
    const shoppingInput = document.getElementById('shoppingInput').value;
    if (shoppingInput.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = shoppingInput;
        document.getElementById('shoppingList').appendChild(li);
        document.getElementById('shoppingInput').value = ''; // clear input field
    }
});

document.getElementById('addMasterItem').addEventListener('click', function() {
    const masterInput = document.getElementById('masterInput').value;
    if (masterInput.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = masterInput;
        document.getElementById('masterList').appendChild(li);
        document.getElementById('masterInput').value = ''; // clear input field
    }
});

// Default to show the Shopping List first
document.getElementById('shoppingListSection').style.display = 'block';
