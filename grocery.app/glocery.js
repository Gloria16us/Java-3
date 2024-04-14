// ********** Selecting DOM elements **********

const form = document.querySelector(".grocery-form"); // Selecting the form element
const alert = document.querySelector(".alert"); // Selecting the alert message container
const grocery = document.getElementById("grocery"); // Selecting the input field for groceries
const submitBtn = document.querySelector(".submit-btn"); // Selecting the submit button
const container = document.querySelector(".grocery-container"); // Selecting the container for grocery items
const list = document.querySelector(".grocery-list"); // Selecting the list for grocery items
const clearBtn = document.querySelector(".clear-btn"); // Selecting the button to clear the list

// Variables for editing functionality
let editElement;
let editFlag = false;
let editID = "";

// ********** Event listeners setup **********

// Adding an event listener to the form for submitting new items
form.addEventListener("submit", addItem);
// Adding an event listener to the clear button to clear the list
clearBtn.addEventListener("click", clearItems);
// Adding an event listener to load items when the window loads
window.addEventListener("DOMContentLoaded", setupItems);

// ********** Function definitions **********

// Function to add a new item to the list
function addItem(e) {
  e.preventDefault(); // Preventing default form submission behavior
  const value = grocery.value; // Getting the value of the input field
  const id = new Date().getTime().toString(); // Generating a unique ID for the item

  // Checking if the input value is not empty and edit mode is not active
  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); // Creating a new article element
    let attr = document.createAttribute("data-id"); // Creating a data attribute for the ID
    attr.value = id;
    element.setAttributeNode(attr); // Setting the ID attribute
    element.classList.add("grocery-item"); // Adding a class to the new element
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `; // Adding HTML content to the new element

    // Adding event listeners to the edit and delete buttons
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // Appending the new item to the list
    list.appendChild(element);
    // Displaying a success message
    displayAlert("Item added to the list", "success");
    // Showing the container
    container.classList.add("show-container");
    // Saving the item to local storage
    addToLocalStorage(id, value);
    // Resetting the form
    setBackToDefault();
  } else if (value !== "" && editFlag) { // If value is not empty and edit mode is active
    editElement.innerHTML = value; // Updating the item's value
    displayAlert("Value changed", "success"); // Displaying a success message

    // Updating the item in local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else { // If the input value is empty
    displayAlert("Please enter a value", "danger"); // Displaying an error message
  }
}

// Function to display an alert message
function displayAlert(text, action) {
  alert.textContent = text; // Setting the text content of the alert
  alert.classList.add(`alert-${action}`); // Adding a class to style the alert
  // Removing the alert after 1 second
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// Function to clear all items from the list
function clearItems() {
  const items = document.querySelectorAll(".grocery-item"); // Selecting all grocery items
  if (items.length > 0) { // Checking if there are items in the list
    items.forEach(function (item) {
      list.removeChild(item); // Removing each item from the list
    });
  }
  container.classList.remove("show-container"); // Hiding the container
  displayAlert("Empty list", "danger"); // Displaying a message that the list is empty
  setBackToDefault(); // Resetting to default state
  localStorage.removeItem("list"); // Clearing the items from local storage
}

// Function to delete an item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement; // Selecting the parent element of the delete button
  const id = element.dataset.id; // Getting the ID of the item

  list.removeChild(element); // Removing the item from the list

  if (list.children.length === 0) { // Checking if the list is empty
    container.classList.remove("show-container"); // Hiding the container
  }
  displayAlert("Item removed", "danger"); // Displaying a message that the item is removed
  setBackToDefault(); // Resetting to default state
  removeFromLocalStorage(id); // Removing the item from local storage
}

// Function to edit an item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement; // Selecting the parent element of the edit button
  editElement = e.currentTarget.parentElement.previousElementSibling; // Selecting the element to edit
  grocery.value = editElement.innerHTML; // Setting the value of the input field to the current item's value
  editFlag = true; // Setting edit mode to true
  editID = element.dataset.id; // Getting the ID of the item being edited
  submitBtn.textContent = "Edit"; // Changing the submit button text to "Edit"
}

// Function to reset to default state
function setBackToDefault() {
  grocery.value = ""; // Clearing the input field
  editFlag = false; // Resetting edit mode
  editID = ""; // Clearing edit ID
  submitBtn.textContent = "Submit"; // Resetting submit button text
}

// ********** Local Storage **********

// Function to add an item to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value }; // Creating a grocery object
  let items = getLocalStorage(); // Getting existing items from local storage
  items.push(grocery); // Adding the new item to the array
  localStorage.setItem("list", JSON.stringify(items)); // Saving the updated array to local storage
}

// Function to get items from local storage
function getLocalStorage() {
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []; // Retrieving and parsing stored items or returning an empty array
}

// Function to remove an item from local storage
function removeFromLocalStorage(id) {
  let items = getLocalStorage(); // Getting existing items from local storage

  items = items.filter(function (item) { // Filtering out the item to be removed
    if (item.id !== id) {
      return item;
    }
  });


}