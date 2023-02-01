const addBox = document.querySelector(".add-box");
let popupBox = document.querySelector(".popup-box");
let popupTitle = popupBox.querySelector("header p");
let closeIcon = popupBox.querySelector("header i");
let titleTag = popupBox.querySelector("input");
let descTag = popupBox.querySelector("textarea");
let addBtn = document.querySelector(".button");

let notes = JSON.parse(localStorage.getItem("notes"));
let isUpdate = false;
let updateId;
let filterDesc;
let liTag;
let description;
let month_name = [
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
  popupTitle.innerText = "Add a new Task";
  addBtn.innerText = "Add Task";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
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
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li class="edi" onclick="updateNote(${id}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li class="del" onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (event) => {
    console.log(event.target.tagName);
    if (event.target.tagName != "I" || event.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  document.querySelector(".menu").classList.remove("show");
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function note_change(noteId, title, filterDesc) {
  document.querySelector(".menu").classList.remove("show");
  description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
}

function updateNote(noteId, title, filterDesc) {
  note_change(noteId, title, filterDesc);
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update Task";
  addBtn.innerText = "Update Task";
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title && description) {
    let currentDate = new Date(),
      month = currentDate.getMonth(),
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    hour = currentDate.getHours();
    min = currentDate.getMinutes();

    let noteInfo = {
      title,
      description,
      date: ` ${month_name[month]}/${day}/${year} (${hour}:${min})`,
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
  }
});

(function showNotes() {
  if (!notes) return;

  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li class="edi" onclick="updateNote(${id}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li class="del" onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
})();
