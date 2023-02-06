const addBox: HTMLElement = <HTMLElement>document.querySelector(".add-box");
let popupBox: HTMLElement = <HTMLElement>document.querySelector(".popup-box");
let popupTitle: HTMLElement = <HTMLElement>document.querySelector("header p");
let closeIcon: HTMLElement = <HTMLElement>document.querySelector("header i");
let element: HTMLElement = <HTMLElement>document.querySelector("#element");
let titleTag: HTMLInputElement = <HTMLInputElement>(
	document.querySelector("input")
);
let descTag: HTMLTextAreaElement = <HTMLTextAreaElement>(
	document.querySelector("textarea")
);
let addBtn: HTMLButtonElement = <HTMLButtonElement>(
	document.querySelector(".button")
);
let body: HTMLElement = <HTMLElement>document.querySelector("body");
let notes: { title: string; description: string; date: string }[] = JSON.parse(
	localStorage.getItem("notes") || "[]"
);
let currentDate: Date = new Date();
let isUpdate: boolean = false;
let noteInfo: { title: string; description: string; date: string };
let updateId: number;
let filterDesc: string;
let liTag: string;
let description: string;
let title: string;
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

function showNotes(): void {
	if (!notes) return;
	document.querySelectorAll(".note").forEach((li) => li.remove());
	notes.forEach((note, id: Number) => {
		filterDesc = note.description.replaceAll("\n", "<br/>");
		liTag =
			`<li class="note">
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

function showMenu(element: HTMLDivElement) {
	element.parentElement?.classList.add("show");
	document.addEventListener("click", (event: Event) => {
		if (event.target != element) {
			element.parentElement?.classList.remove("show");
		}
	});
}

function deleteNote(noteId: number) {
	remove(noteId);
	showNotes();
}

function updateNote(noteId: number, title: string, filterDesc: string): void {
	modifyNote(noteId, title, filterDesc);
}

addBtn.addEventListener("click", (event): void => {
	event.preventDefault();
	addNote(title, description);
});

function addNote(title: string, description: string): void {
	title = titleTag.value.trim();
	description = descTag.value.trim();
	if (title && description) {
		noteInfo = {
			title,
			description,
			date: ` ${monthName[currentDate.getMonth()]
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

function openPopup(): void {
	popupTitle.innerText = "Add a new Task";
	addBtn.innerText = "Add Task";
	popupBox.classList.add("show");
	body.style.overflow = "hidden";
	if (window.innerWidth > 660) titleTag.focus();
}

function closePopup(): void {
	isUpdate = false;
	titleTag.value = descTag.value = "";
	popupBox.classList.remove("show");
	body.style.overflow = "auto";
}

function modifyNote(noteId: number, title: string, filterDesc: string): void {
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

function remove(noteId: number): void {
	notes.splice(noteId, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
}
