// Get buttons and content area
const btnMasterlist = document.getElementById('btnMasterlist');
const btnShoppingList = document.getElementById('btnShoppingList');
const contentArea = document.getElementById('contentArea');

// Function to update the content based on selected button
function updateContent() {
  if (btnMasterlist.classList.contains('selected')) {
    contentArea.innerHTML = `
      <h4>Masterlist</h4>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    `;
  } else if (btnShoppingList.classList.contains('selected')) {
    contentArea.innerHTML = `
      <h4>Shopping List</h4>
      <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Carrots</li>
      </ul>
    `;
  }
}

// Event listeners for button clicks
btnMasterlist.addEventListener('click', function() {
  btnMasterlist.classList.add('selected');
  btnShoppingList.classList.remove('selected');
  updateContent();
});

btnShoppingList.addEventListener('click', function() {
  btnShoppingList.classList.add('selected');
  btnMasterlist.classList.remove('selected');
  updateContent();
});

// Call updateContent initially to set the default content
updateContent();

