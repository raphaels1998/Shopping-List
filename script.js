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
