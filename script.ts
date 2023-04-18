class Note {
  private id: number;
  private title: string;
  private description: string;
  private imagePath: string;
  private backgroundColor: string;

  constructor(
    title: string,
    description: string,
    imagePath?: string,
    backgroundColor?: string,
    id?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.backgroundColor = backgroundColor;
  }

  //getters
  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getImagePath(): string {
    return this.imagePath;
  }

  getBackgroundColor(): string {
    return this.backgroundColor;
  }

  //setters
  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setImagePath(imagePath: string): void {
    this.imagePath = imagePath;
  }

  setBackgroundColor(backgroundColor: string): void {
    this.backgroundColor = backgroundColor;
  }

  displayModalNote(): void {
    const modalArea = document.createElement("div");
    modalArea.className = "modal-note";

    const modalTitle = document.createElement("textarea");
    const modalDescription = document.createElement("textarea");
    const modalImage = document.createElement("img");

    const modalEdits = document.createElement("div");
    modalEdits.className = "edits";

    const modalChangeBackgroundColor = document.createElement("input");
    const modalChangeImage = document.createElement("input");
    const modalSaveButton = document.createElement("button");
    const modalDeleteButton = document.createElement("button");

    modalEdits.appendChild(modalChangeBackgroundColor);
    modalEdits.appendChild(modalChangeImage);
    modalEdits.appendChild(modalSaveButton);
    modalEdits.appendChild(modalDeleteButton);

    modalChangeBackgroundColor.type = "color";
    modalChangeBackgroundColor.value = this.backgroundColor;
    modalChangeImage.type = "file";
    modalSaveButton.textContent = "Save";
    modalDeleteButton.textContent = "Delete";

    modalTitle.innerHTML = this.title;
    modalDescription.innerHTML = this.description;
    if (this.imagePath !== "") {
      modalImage.src = this.imagePath;
    }
    modalArea.style.backgroundColor = this.backgroundColor;
    modalTitle.style.backgroundColor = this.backgroundColor;
    modalDescription.style.backgroundColor = this.backgroundColor;

    modalArea.appendChild(modalTitle);
    modalArea.appendChild(modalDescription);
    modalArea.appendChild(modalImage);
    modalArea.appendChild(modalEdits);

    document.body.appendChild(modalArea);

    modalDescription?.addEventListener("input", () => {
      modalDescription.style.height = "auto";
      modalDescription.style.height = modalDescription.scrollHeight + "px";
    });

    modalChangeImage.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
          const result =
            typeof reader.result === "string"
              ? new TextEncoder().encode(reader.result)
              : reader.result;

          const url = URL.createObjectURL(new Blob([result]));
          modalImage.src = url;
        });

        reader.readAsArrayBuffer(file);
      }
    });

    modalChangeBackgroundColor?.addEventListener("input", (event) => {
      const newColor = (event.target as HTMLInputElement).value;
      modalArea.style.backgroundColor = newColor;
      modalTitle.style.backgroundColor = newColor;
      modalDescription.style.backgroundColor = newColor;
    });

    modalSaveButton.addEventListener("click", () => {
      const noteToChange = new Note(
        (this.title = modalTitle.value),
        (this.description = modalDescription.value),
        (this.imagePath = modalImage.src),
        (this.backgroundColor = modalChangeBackgroundColor.value)
      );

      document.body.removeChild(modalArea);
      const backgroundClass = document.querySelector(".background");
      backgroundClass.classList.remove("blur");
    });

    modalDeleteButton.addEventListener("click", async () => {
      document.body.removeChild(modalArea);
      const backgroundClass = document.querySelector(".background");
      backgroundClass.classList.remove("blur");

      deleteNote(this.id);
    });
  }

  displayNote(searchNote?: string) {
    const addedNoteDiv = document.querySelector(
      ".notes-wrapper"
    ) as HTMLDivElement;

    const noteArea = document.createElement("div");
    const noteTitle = document.createElement("h2");
    const noteDescription = document.createElement("h3");
    const noteImage = document.createElement("img");

    noteArea.classList.add("added-note");
    noteTitle.innerHTML = this.title;
    noteDescription.innerHTML = this.description;
    noteImage.src = this.imagePath;

    noteTitle.style.backgroundColor = this.backgroundColor;
    noteDescription.style.backgroundColor = this.backgroundColor;
    noteArea.style.backgroundColor = this.backgroundColor;

    noteArea.appendChild(noteTitle);
    noteArea.appendChild(noteDescription);
    noteArea.appendChild(noteImage);

    noteArea.addEventListener("click", () => {
      const body = document.querySelector(".background");
      body.classList.add("blur");
      this.displayModalNote();
    });

    if (searchNote) {
      const search = searchNote.toLowerCase();
      const titleMatches = this.title.toLowerCase().indexOf(search) !== -1;
      const descriptionMatches =
        this.description.toLowerCase().indexOf(search) !== -1;
      if (!titleMatches && !descriptionMatches) {
        noteArea.style.display = "none";
      }
    }

    addedNoteDiv.appendChild(noteArea);
  }
}

let notes: any = [];
let idCounter: number = 0;
const notesUrl = "http://localhost:3000/notes";

async function getNotes() {
  const res = await fetch(notesUrl);
  const notes = await res.json();
  return notes.map(
    (note: any) =>
      new Note(
        note.title,
        note.description,
        note.imagePath,
        note.backgroundColor,
        note.id
      )
  );
}

async function displayTheNotes() {
  notes = await getNotes();

  console.log(notes);

  notes.forEach(async (note) => {
    note.displayNote();
  });
}

function addNote(newNote: Note) {
  fetch(notesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}

function deleteNote(id: number) {
  fetch(`${notesUrl}/${id}`, {
    method: "DELETE",
  });
}

displayTheNotes();

const noteTextArea = document.getElementById(
  "takeNoteTextArea"
) as HTMLTextAreaElement;
const addNoteInput = document.querySelector(
  ".add-note-input"
) as HTMLDivElement;

let extendedNote = 0; //so when i press again on the write note section, the
//title and buttons will not appear over and over again

noteTextArea?.addEventListener("click", () => {
  if (extendedNote == 0) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title...";
    titleInput.classList.add("title-input");

    const buttonsHolder = document.createElement("div");
    buttonsHolder.classList.add("buttons");

    const imageHolder = document.createElement("div");
    imageHolder.classList.add("image");

    const changeBackground = document.createElement("input");
    changeBackground.type = "color";
    changeBackground.value = "#E1D7FF";
    changeBackground.classList.add("color-input");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.classList.add("image-input");

    const imagePreview = document.createElement("img");
    imagePreview.classList.add("image-preview");

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");

    imageHolder.appendChild(imagePreview);
    buttonsHolder.appendChild(changeBackground);
    buttonsHolder.appendChild(fileInput);
    buttonsHolder.appendChild(saveButton);

    addNoteInput?.insertBefore(titleInput, noteTextArea);
    addNoteInput?.appendChild(imageHolder);
    addNoteInput?.appendChild(buttonsHolder);
    extendedNote++;

    //delete everything when pressing outside the div
    const clickOutsideHandler = (event: MouseEvent) => {
      if (!addNoteInput?.contains(event.target as Node)) {
        if (titleInput.value !== "" && noteTextArea.value !== "") {
          const newNote = new Note(
            titleInput.value,
            noteTextArea.value,
            imagePreview.src,
            changeBackground.value,
            idCounter++
          );
          addNote(newNote);

          titleInput.remove();
          changeBackground.remove();
          buttonsHolder.remove();
          imageHolder.remove();
          document.removeEventListener("click", clickOutsideHandler);
          extendedNote = 0;
          noteTextArea.value = "";
          noteTextArea.style.backgroundColor = "rgb(225, 215, 255)";
          addNoteInput.style.backgroundColor = "rgb(225, 215, 255)";
        }
      }
    };
    document.addEventListener("click", clickOutsideHandler);

    //display the image
    fileInput.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
          const result =
            typeof reader.result === "string"
              ? new TextEncoder().encode(reader.result)
              : reader.result;

          const url = URL.createObjectURL(new Blob([result]));
          imagePreview.src = url;
        });

        reader.readAsArrayBuffer(file);
      }
    });

    //background
    changeBackground?.addEventListener("input", (event) => {
      const newColor = (event.target as HTMLInputElement).value;
      addNoteInput.style.backgroundColor = newColor;
      titleInput.style.backgroundColor = newColor;
      noteTextArea.style.backgroundColor = newColor;
    });

    //saving the note
    saveButton.addEventListener("click", () => {
      if (titleInput.value !== "" && noteTextArea.value !== "") {
        const newNote = new Note(
          titleInput.value,
          noteTextArea.value,
          imagePreview.src,
          changeBackground.value,
          idCounter++
        );
        addNote(newNote);
      }

      titleInput.remove();
      changeBackground.remove();
      buttonsHolder.remove();
      imageHolder.remove();
      document.removeEventListener("click", clickOutsideHandler);
      extendedNote = 0;
      noteTextArea.value = "";
      noteTextArea.style.backgroundColor = "rgb(225, 215, 255)";
      addNoteInput.style.backgroundColor = "rgb(225, 215, 255)";
    });
  }

  //extending the textarea based on the text inside
  noteTextArea?.addEventListener("input", () => {
    noteTextArea.style.height = "auto";
    noteTextArea.style.height = noteTextArea.scrollHeight + "px";
  });
});

const searchNotes = <HTMLInputElement>document.querySelector("#search-note");
const notesWrapper = document.querySelector(".notes-wrapper") as HTMLDivElement;

searchNotes.addEventListener("keyup", () => {
  const searchedString = searchNotes.value;

  const filteredNotes = notes.filter(
    (note) =>
      note.getTitle().includes(searchedString) ||
      note.getDescription().includes(searchedString)
  );

  // Remove all previously displayed notes
  while (notesWrapper.firstChild) {
    notesWrapper.removeChild(notesWrapper.firstChild);
  }

  // Display filtered notes
  filteredNotes.forEach((note) => {
    note.displayNote();
  });
});
