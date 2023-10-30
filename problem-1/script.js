let contacts = [];
//Adding a contact to the table
function addContact() {
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!validateInput(name, mobile, email)) {
        document.getElementById('error').style.display = 'block';
        return;
    }

    contacts.push({ name, mobile, email });
    resetForm();
    displayContacts();
}
//validating input
function validateInput(name, mobile, email) {
    const nameRegex = /^[A-Za-z\s]{1,20}$/;
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!name.match(nameRegex) || !mobile.match(mobileRegex) || !email.match(emailRegex)) {
        return false;
    }
    return true;
}
//resetting the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
    document.getElementById('error').style.display = 'none';
}
//displaying contacts in the table
function displayContacts() {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    for (const contact of contacts) {
        const row = table.insertRow(table.rows.length);
        const nameCell = row.insertCell(0);
        const mobileCell = row.insertCell(1);
        const emailCell = row.insertCell(2);
        nameCell.innerHTML = contact.name;
        mobileCell.innerHTML = contact.mobile;
        emailCell.innerHTML = contact.email;
    }
}
//sorting the table by contact name
let nameSortOrder = 1; 
function sortTable(column) {
    contacts.sort((a, b) => {
        return nameSortOrder * a.name.localeCompare(b.name);
    });
    nameSortOrder *= -1;
    displayContacts();
}

//filtering contacts based on mobile number
function filterContacts() {
    const search = document.getElementById('search').value.trim();
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(search));
    const noResultDiv = document.getElementById('noResult');
    if (filteredContacts.length === 0) {
        noResultDiv.style.display = 'block';
    } else {
        noResultDiv.style.display = 'none';
    }
    displayContacts(filteredContacts);
}
