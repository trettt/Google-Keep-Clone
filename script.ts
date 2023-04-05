const noteTextArea = document.getElementById(
  "takeNoteTextArea"
) as HTMLTextAreaElement;
const addNoteInput = document.querySelector(".add-note-input") as HTMLElement;

let extendedNote = 0;

noteTextArea?.addEventListener("click", () => {
  if (extendedNote == 0) {
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title...";
    titleInput.classList.add("title-input");

    const buttonsHolder = document.createElement("div");
    buttonsHolder.classList.add("buttons");

    const changeBackground = document.createElement("input");
    changeBackground.type = "color";
    changeBackground.classList.add("color-input");

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.classList.add("image-input");

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");

    buttonsHolder.appendChild(changeBackground);
    buttonsHolder.appendChild(imageInput);
    buttonsHolder.appendChild(saveButton);

    addNoteInput?.insertBefore(titleInput, noteTextArea);
    addNoteInput?.appendChild(buttonsHolder);
    extendedNote++;

    const clickOutsideHandler = (event: MouseEvent) => {
      if (!addNoteInput?.contains(event.target as Node)) {
        titleInput.remove();
        changeBackground.remove();
        buttonsHolder.remove();
        document.removeEventListener("click", clickOutsideHandler);
        extendedNote = 0;
        noteTextArea.value = "";
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }
});

noteTextArea?.addEventListener("input", () => {
  noteTextArea.style.height = "auto";
  noteTextArea.style.height = noteTextArea.scrollHeight + "px";
});
