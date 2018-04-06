const addButton = document.getElementById("submitAll");
const outputBox = document.getElementById("phonebook-output");
const searchButton = document.getElementById("search");
const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");

const arrayLog = [];
const parser = new DOMParser();
var updatedIndex = "";

function submitNewContact() {
  const name = document.getElementById("newName").value;
  const address = document.getElementById("newAddress").value;
  const phoneNumber = document.getElementById("newPhone").value;
  const postCode = document.getElementById("newPost").value;

  if (name !== "" && address !== "" && phoneNumber !== "" && postCode !== "") {
    // push new contact to storage
    addPhoneBook({
      name: name,
      address: address,
      phonenumber: phoneNumber,
      postcode: postCode
    });
    // empty out the input box value
    document.getElementById("newName").value = "";
    document.getElementById("newAddress").value = "";
    document.getElementById("newPhone").value = "";
    document.getElementById("newPost").value = "";
  } else {
    alert("Input can't be empty");
  }
}

function getPhoneBook() {
  if (localStorage.phoneBook) {
    const arrayList = JSON.parse(localStorage.phoneBook);
    //console.log(arrayList);
    return arrayList;
  } else {
    localStorage.setItem("phoneBook", "[]");
    return [];
  }
}

function addPhoneBook(newPhoneBook) {
  const arrayList = getPhoneBook();
  arrayList.push(newPhoneBook);
  // console.log(arrayList);
  setPhoneBook(arrayList);
}

function setPhoneBook(newContacts) {
  localStorage.phoneBook = JSON.stringify(newContacts);
}

function createTemplate(index, arrayList) {
  const template = `
    <section class="template">
      <div id="${index + 1}" class="beautify">
        <h4>Phone Book #${index + 1}</h4>
        <p class="animated bounceIn">Name: ${arrayList.name}
        <br>Address: ${arrayList.address}
        <br>Phone Number: ${arrayList.phonenumber}
        <br>Post Code: ${arrayList.postcode}</p>
        <input type="button" id="delete-${index}" name="toggledelete" class="delete" value="Delete"></input>
        <input type="button" id="edit-${index}" name="toggleedit" class="edit" onclick="toggleHandler(1)" value="Edit"></input>
      </div>
    <section>`;
  return template;
}

function addNewContact() {
  outputBox.innerHTML = "";
  const arrayList = getPhoneBook();
  for (var index = 0; index < arrayList.length; index++) {
    const nodeString = createTemplate(index, arrayList[index]);
    const doc = parser.parseFromString(nodeString, "text/html");
    const node = doc.body.firstChild;
    outputBox.append(node);
  }
}

function displayAllPhoneBook() {
  submitNewContact();
  addNewContact();
}

function deleteContact(event) {
  if (event.target.matches(".delete")) {
    console.log("CALLED DELETE");
    const id = event.target.id.replace("delete-", "");
    const contacts = getPhoneBook();
    contacts.splice(id, 1); // delete the object with specified index
    setPhoneBook(contacts);
    addNewContact();
  }
}

function editContact(event) {
  if (event.target.matches(".edit")) {
    console.log("CALLED EDIT");

    const id = event.target.id.replace("edit-", "");
    const contacts = getPhoneBook();
    const objectContact = contacts[id];
    updatedIndex = id;

    // setPhoneBook(contacts);
    document.getElementById("newName").value = objectContact.name;
    document.getElementById("newAddress").value = objectContact.address;
    document.getElementById("newPhone").value = objectContact.phonenumber;
    document.getElementById("newPost").value = objectContact.postcode;

    logEdit();
  } else {
    logEdit();
  }
}

function logEdit() {
  const name = document.getElementById("newName").value;
  const address = document.getElementById("newAddress").value;
  const phoneNumber = document.getElementById("newPhone").value;
  const postCode = document.getElementById("newPost").value;

  const object = {
    name: name,
    address: address,
    phonenumber: phoneNumber,
    postcode: postCode
  };

  arrayLog.push(object);
  // console.log(arrayLog);
}

function cancel() {
  const arrayList = arrayLog;
  // console.log(arrayLog);

  document.getElementById("newName").value = arrayList[0].name;
  document.getElementById("newAddress").value = arrayList[0].address;
  document.getElementById("newPhone").value = arrayList[0].phonenumber;
  document.getElementById("newPost").value = arrayList[0].postcode;
}

function saveEdit() {
  const contacts1 = getPhoneBook();
  // console.log(updatedIndex);
  contacts1.splice(Number(updatedIndex), 1);
  setPhoneBook(contacts1);
  submitNewContact();
  addNewContact();
  document.getElementById("newName").value = "";
  document.getElementById("newAddress").value = "";
  document.getElementById("newPhone").value = "";
  document.getElementById("newPost").value = "";
}

function searchContact() {}

function toggleHandler(condition) {
  const toggleSave = document.getElementById("saveButton");
  const toggleCancel = document.getElementById("cancelButton");
  const toggleSubmit = document.getElementById("submitAll");
  const toggleSearch = document.getElementById("search");
  // const toggleDelete = document.getElementsByName("toggledelete");
  const toggleSearchText = document.getElementById("searchText");
  // const toggleDelete = document.getElementById("deleteTog");

  toggleSave.style.display = "none";
  toggleCancel.style.display = "none";
  toggleSearchText.style.display = "none";

  if (condition === 1) {
    toggleSave.style.display = "block";
    toggleCancel.style.display = "block";
    toggleSubmit.style.display = "none";
    toggleSearch.style.display = "none";
    // toggleDelete.style.display = "none";
  } else if (condition === 2) {
    toggleSave.style.display = "none";
    toggleCancel.style.display = "none";
    toggleSubmit.style.display = "block";
    toggleSearch.style.display = "block";
  } else if (condition === 3) {
    toggleSearchText.style.display = "block";
  }
}

toggleHandler();
addNewContact();

addButton.addEventListener("click", displayAllPhoneBook);
outputBox.addEventListener("click", deleteContact);
outputBox.addEventListener("click", editContact);
saveButton.addEventListener("click", saveEdit);
cancelButton.addEventListener("click", cancel);
// editButton.addEventListener("click", editContact);
// searchButton.addEventListener("click", searchContact)
