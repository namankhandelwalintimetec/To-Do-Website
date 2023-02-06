"use strict";
const addBox = document.querySelector(".add-box");
let popupBox = document.querySelector(".popup-box");
let popupTitle = document.querySelector("header p");
let closeIcon = document.querySelector("header i");
let element = document.querySelector("#element");
let titleTag = document.querySelector("input");
let descTag = document.querySelector("textarea");
let addBtn = document.querySelector(".button");
let body = document.querySelector("body");
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let currentDate = new Date();
let isUpdate = false;
let noteInfo;
let updateId;
let filterDesc;
let liTag;
let description;
let title;
let monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
addBox.addEventListener("click", () => {
  openPopup();
});
closeIcon.addEventListener("click", () => {
  closePopup();
});
function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    filterDesc = note.description.replaceAll("\n", "<br/>");
    liTag = `<li class="note">
							<div class="details">
								<p>${note.title}</p>
								<span>${note.description}</span>
							</div>
							<div class="bottom-content">
								<span>${note.date}</span>
								<div class="settings">
									<i onclick="showMenu(this)" class="uil uil-ellipsis-h" id="element" ></i>
									<ul class="menu">
										<li onclick="updateNote(${id}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
										<li class="del" onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
									</ul>
								</div>
							</div>
						</li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
function showMenu(element) {
  var _a;
  (_a = element.parentElement) === null || _a === void 0
    ? void 0
    : _a.classList.add("show");
  document.addEventListener("click", (event) => {
    var _a;
    if (event.target != element) {
      (_a = element.parentElement) === null || _a === void 0
        ? void 0
        : _a.classList.remove("show");
    }
  });
}
function deleteNote(noteId) {
  remove(noteId);
  showNotes();
}
function updateNote(noteId, title, filterDesc) {
  modifyNote(noteId, title, filterDesc);
}
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addNote(title, description);
});
function addNote(title, description) {
  title = titleTag.value.trim();
  description = descTag.value.trim();
  if (title && description) {
    noteInfo = {
      title,
      description,
      date: ` ${
        monthName[currentDate.getMonth()]
      }/${currentDate.getDate()}/${currentDate.getFullYear()} (${currentDate.getHours()}:${currentDate.getMinutes()})`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  } else {
    alert("Please enter some valid Input");
  }
}
function openPopup() {
  popupTitle.innerText = "Add a new Task";
  addBtn.innerText = "Add Task";
  popupBox.classList.add("show");
  body.style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
}
function closePopup() {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  body.style.overflow = "auto";
}
function modifyNote(noteId, title, filterDesc) {
  body.classList.remove("show");
  description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update Task";
  addBtn.innerText = "Update Task";
}
function remove(noteId) {
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}
