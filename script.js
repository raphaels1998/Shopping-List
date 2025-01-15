// Get buttons, content area, and input elements
const btnMasterlist = document.getElementById('btnMasterlist');
const btnShoppingList = document.getElementById('btnShoppingList');
const contentArea = document.getElementById('contentArea');
const newItemInput = document.getElementById('newItemInput');
const addItemButton = document.getElementById('addItemButton');

// Get the lists where items will be added
const masterlist = document.getElementById('masterlist');
let currentList = masterlist; // Start with the Masterlist as the default list

// Add event listeners for the buttons
btnMasterlist.addEventListener('click', function() {
  currentList = masterlist;
  contentArea.innerHTML = `
    <h4>Masterlist</h4>
    <ul class="list-group" id="masterlist"></ul>
  `;
  renderList(currentList);
});

btnShoppingList.addEventListener('click', function() {
  currentList = document.getElementById('shoppingList') || createShoppingList();
  contentArea.innerHTML = `
    <h4>Shopping List</h4>
    <ul class="list-group" id="shoppingList"></ul>
  `;
  renderList(currentList);
});

// Render the list content
function renderList(list) {
  // Clear the list before re-rendering
  list.innerHTML = ''; 
}

// Add an item to the current list
addItemButton.addEventListener('click', function() {
  const newItemText = newItemInput.value.trim();
  
  if (newItemText !== '') {
    const newItem = document.createElement('li');
    newItem.classList.add('list-group-item');
    newItem.innerHTML = `
      <input class="form-check-input me-1" type="checkbox" value="">
      <label class="form-check-label stretched-link">${newItemText}</label>
    `;
    
    currentList.appendChild(newItem);
    newItemInput.value = ''; // Clear the input field
  }
});

// Helper function to create the Shopping List if it doesn't exist
function createShoppingList() {
  const shoppingList = document.createElement('ul');
  shoppingList.classList.add('list-group');
  shoppingList.id = 'shoppingList';
  
  return shoppingList;
}



