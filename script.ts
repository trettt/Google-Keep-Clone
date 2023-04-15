class Note {
  private title: string;
  private description: string;
  private imagePath: string;
  private backgroundColor: string;

  constructor(
    title: string,
    description: string,
    imagePath?: string,
    backgroundColor?: string
  ) {
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.backgroundColor = backgroundColor;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  displayNote(searchNote?: string): void {
    const addedNoteDiv = document.querySelector(
      ".notes-wrapper"
    ) as HTMLDivElement;

    const noteArea = document.createElement("div");
    const noteTitle = document.createElement("textarea");
    const noteDescription = document.createElement("textarea");
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

const notes: any = [];

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
            changeBackground.value
          );
          notes.push(newNote);
          newNote.displayNote();
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
          changeBackground.value
        );
        notes.push(newNote);
        newNote.displayNote();
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
