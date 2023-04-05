var noteTextArea = document.getElementById("takeNoteTextArea");
var addNoteInput = document.querySelector(".add-note-input");
var extendedNote = 0;
noteTextArea === null || noteTextArea === void 0 ? void 0 : noteTextArea.addEventListener("click", function () {
    if (extendedNote == 0) {
        var titleInput_1 = document.createElement("input");
        titleInput_1.type = "text";
        titleInput_1.placeholder = "Title...";
        titleInput_1.classList.add("title-input");
        var buttonsHolder_1 = document.createElement("div");
        buttonsHolder_1.classList.add("buttons");
        var changeBackground_1 = document.createElement("input");
        changeBackground_1.type = "color";
        changeBackground_1.classList.add("color-input");
        var imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.classList.add("image-input");
        var saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.classList.add("save-button");
        buttonsHolder_1.appendChild(changeBackground_1);
        buttonsHolder_1.appendChild(imageInput);
        buttonsHolder_1.appendChild(saveButton);
        addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.insertBefore(titleInput_1, noteTextArea);
        addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.appendChild(buttonsHolder_1);
        extendedNote++;
        var clickOutsideHandler_1 = function (event) {
            if (!(addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.contains(event.target))) {
                titleInput_1.remove();
                changeBackground_1.remove();
                buttonsHolder_1.remove();
                document.removeEventListener("click", clickOutsideHandler_1);
                extendedNote = 0;
                noteTextArea.value = "";
            }
        };
        document.addEventListener("click", clickOutsideHandler_1);
    }
});
noteTextArea === null || noteTextArea === void 0 ? void 0 : noteTextArea.addEventListener("input", function () {
    noteTextArea.style.height = "auto";
    noteTextArea.style.height = noteTextArea.scrollHeight + "px";
});
