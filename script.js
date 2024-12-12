// Elemente auswählen
const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");

// Cookies lesen
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return "";
}

// Cookies setzen
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Liste aus Cookie laden
function loadItems() {
  const items = getCookie("shoppingList");
  if (items) {
    JSON.parse(items).forEach((item) => addItemToDOM(item));
  }
}

// Item in DOM hinzufügen
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.textContent = item;

  // Löschen-Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveItems();
  });

  li.appendChild(deleteBtn);
  itemList.appendChild(li);
}

// Items speichern
function saveItems() {
  const items = Array.from(itemList.children).map((li) =>
    li.textContent.slice(0, -1)
  );
  setCookie("shoppingList", JSON.stringify(items), 7);
}

// Formular-Ereignis
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = itemInput.value.trim();
  if (newItem) {
    addItemToDOM(newItem);
    saveItems();
    itemInput.value = "";
  }
});

// Liste löschen
clearBtn.addEventListener("click", () => {
  itemList.innerHTML = "";
  saveItems();
});

// Daten beim Laden initialisieren
loadItems();