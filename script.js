var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Note = /** @class */ (function () {
    function Note(title, description, imagePath, backgroundColor, id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.backgroundColor = backgroundColor;
    }
    //getters
    Note.prototype.getId = function () {
        return this.id;
    };
    Note.prototype.getTitle = function () {
        return this.title;
    };
    Note.prototype.getDescription = function () {
        return this.description;
    };
    Note.prototype.getImagePath = function () {
        return this.imagePath;
    };
    Note.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    //setters
    Note.prototype.setTitle = function (title) {
        this.title = title;
    };
    Note.prototype.setDescription = function (description) {
        this.description = description;
    };
    Note.prototype.setImagePath = function (imagePath) {
        this.imagePath = imagePath;
    };
    Note.prototype.setBackgroundColor = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
    };
    Note.prototype.displayModalNote = function () {
        var _this = this;
        var modalArea = document.createElement("div");
        modalArea.className = "modal-note";
        var modalTitle = document.createElement("textarea");
        var modalDescription = document.createElement("textarea");
        var modalImage = document.createElement("img");
        var modalEdits = document.createElement("div");
        modalEdits.className = "edits";
        var modalChangeBackgroundColor = document.createElement("input");
        var modalChangeImage = document.createElement("input");
        var modalSaveButton = document.createElement("button");
        var modalDeleteButton = document.createElement("button");
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
        modalDescription === null || modalDescription === void 0 ? void 0 : modalDescription.addEventListener("input", function () {
            modalDescription.style.height = "auto";
            modalDescription.style.height = modalDescription.scrollHeight + "px";
        });
        modalChangeImage.addEventListener("change", function () {
            var file = this.files[0];
            if (file) {
                var reader_1 = new FileReader();
                reader_1.addEventListener("load", function () {
                    var result = typeof reader_1.result === "string"
                        ? new TextEncoder().encode(reader_1.result)
                        : reader_1.result;
                    var url = URL.createObjectURL(new Blob([result]));
                    modalImage.src = url;
                });
                reader_1.readAsArrayBuffer(file);
            }
        });
        modalChangeBackgroundColor === null || modalChangeBackgroundColor === void 0 ? void 0 : modalChangeBackgroundColor.addEventListener("input", function (event) {
            var newColor = event.target.value;
            modalArea.style.backgroundColor = newColor;
            modalTitle.style.backgroundColor = newColor;
            modalDescription.style.backgroundColor = newColor;
        });
        modalSaveButton.addEventListener("click", function () {
            var noteToChange = new Note((_this.title = modalTitle.value), (_this.description = modalDescription.value), (_this.imagePath = modalImage.src), (_this.backgroundColor = modalChangeBackgroundColor.value));
            document.body.removeChild(modalArea);
            var backgroundClass = document.querySelector(".background");
            backgroundClass.classList.remove("blur");
            // displayNotesAfterEditing();
        });
        modalDeleteButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var backgroundClass;
            return __generator(this, function (_a) {
                document.body.removeChild(modalArea);
                backgroundClass = document.querySelector(".background");
                backgroundClass.classList.remove("blur");
                // displayNotesAfterEditing(this.id);
                deleteNote(this.id);
                return [2 /*return*/];
            });
        }); });
    };
    Note.prototype.displayNote = function (searchNote) {
        var _this = this;
        var addedNoteDiv = document.querySelector(".notes-wrapper");
        var noteArea = document.createElement("div");
        var noteTitle = document.createElement("h2");
        var noteDescription = document.createElement("h3");
        var noteImage = document.createElement("img");
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
        noteArea.addEventListener("click", function () {
            var body = document.querySelector(".background");
            body.classList.add("blur");
            _this.displayModalNote();
        });
        if (searchNote) {
            var search = searchNote.toLowerCase();
            var titleMatches = this.title.toLowerCase().indexOf(search) !== -1;
            var descriptionMatches = this.description.toLowerCase().indexOf(search) !== -1;
            if (!titleMatches && !descriptionMatches) {
                noteArea.style.display = "none";
            }
        }
        addedNoteDiv.appendChild(noteArea);
    };
    return Note;
}());
var notes = [];
var idCounter = 0;
var notesUrl = "http://localhost:3000/notes";
function getNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var res, notes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(notesUrl)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    notes = _a.sent();
                    return [2 /*return*/, notes.map(function (note) {
                            return new Note(note.title, note.description, note.imagePath, note.backgroundColor, note.id);
                        })];
            }
        });
    });
}
function displayTheNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNotes()];
                case 1:
                    notes = _a.sent();
                    console.log(notes);
                    notes.forEach(function (note) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            note.displayNote();
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function addNote(newNote) {
    fetch(notesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
    });
}
function deleteNote(id) {
    fetch("".concat(notesUrl, "/").concat(id), {
        method: "DELETE",
    });
}
displayTheNotes();
var noteTextArea = document.getElementById("takeNoteTextArea");
var addNoteInput = document.querySelector(".add-note-input");
var extendedNote = 0; //so when i press again on the write note section, the
//title and buttons will not appear over and over again
noteTextArea === null || noteTextArea === void 0 ? void 0 : noteTextArea.addEventListener("click", function () {
    if (extendedNote == 0) {
        var titleInput_1 = document.createElement("input");
        titleInput_1.type = "text";
        titleInput_1.placeholder = "Title...";
        titleInput_1.classList.add("title-input");
        var buttonsHolder_1 = document.createElement("div");
        buttonsHolder_1.classList.add("buttons");
        var imageHolder_1 = document.createElement("div");
        imageHolder_1.classList.add("image");
        var changeBackground_1 = document.createElement("input");
        changeBackground_1.type = "color";
        changeBackground_1.value = "#E1D7FF";
        changeBackground_1.classList.add("color-input");
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.classList.add("image-input");
        var imagePreview_1 = document.createElement("img");
        imagePreview_1.classList.add("image-preview");
        var saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.classList.add("save-button");
        imageHolder_1.appendChild(imagePreview_1);
        buttonsHolder_1.appendChild(changeBackground_1);
        buttonsHolder_1.appendChild(fileInput);
        buttonsHolder_1.appendChild(saveButton);
        addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.insertBefore(titleInput_1, noteTextArea);
        addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.appendChild(imageHolder_1);
        addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.appendChild(buttonsHolder_1);
        extendedNote++;
        //delete everything when pressing outside the div
        var clickOutsideHandler_1 = function (event) {
            if (!(addNoteInput === null || addNoteInput === void 0 ? void 0 : addNoteInput.contains(event.target))) {
                if (titleInput_1.value !== "" && noteTextArea.value !== "") {
                    var newNote = new Note(titleInput_1.value, noteTextArea.value, imagePreview_1.src, changeBackground_1.value, idCounter++);
                    // notes.push(newNote);
                    // newNote.displayNote();
                    addNote(newNote);
                    titleInput_1.remove();
                    changeBackground_1.remove();
                    buttonsHolder_1.remove();
                    imageHolder_1.remove();
                    document.removeEventListener("click", clickOutsideHandler_1);
                    extendedNote = 0;
                    noteTextArea.value = "";
                    noteTextArea.style.backgroundColor = "rgb(225, 215, 255)";
                    addNoteInput.style.backgroundColor = "rgb(225, 215, 255)";
                }
            }
        };
        document.addEventListener("click", clickOutsideHandler_1);
        //display the image
        fileInput.addEventListener("change", function () {
            var file = this.files[0];
            if (file) {
                var reader_2 = new FileReader();
                reader_2.addEventListener("load", function () {
                    var result = typeof reader_2.result === "string"
                        ? new TextEncoder().encode(reader_2.result)
                        : reader_2.result;
                    var url = URL.createObjectURL(new Blob([result]));
                    imagePreview_1.src = url;
                });
                reader_2.readAsArrayBuffer(file);
            }
        });
        //background
        changeBackground_1 === null || changeBackground_1 === void 0 ? void 0 : changeBackground_1.addEventListener("input", function (event) {
            var newColor = event.target.value;
            addNoteInput.style.backgroundColor = newColor;
            titleInput_1.style.backgroundColor = newColor;
            noteTextArea.style.backgroundColor = newColor;
        });
        //saving the note
        saveButton.addEventListener("click", function () {
            if (titleInput_1.value !== "" && noteTextArea.value !== "") {
                var newNote = new Note(titleInput_1.value, noteTextArea.value, imagePreview_1.src, changeBackground_1.value, idCounter++);
                addNote(newNote);
            }
            titleInput_1.remove();
            changeBackground_1.remove();
            buttonsHolder_1.remove();
            imageHolder_1.remove();
            document.removeEventListener("click", clickOutsideHandler_1);
            extendedNote = 0;
            noteTextArea.value = "";
            noteTextArea.style.backgroundColor = "rgb(225, 215, 255)";
            addNoteInput.style.backgroundColor = "rgb(225, 215, 255)";
        });
    }
    //extending the textarea based on the text inside
    noteTextArea === null || noteTextArea === void 0 ? void 0 : noteTextArea.addEventListener("input", function () {
        noteTextArea.style.height = "auto";
        noteTextArea.style.height = noteTextArea.scrollHeight + "px";
    });
});
var searchNotes = document.querySelector("#search-note");
var notesWrapper = document.querySelector(".notes-wrapper");
searchNotes.addEventListener("keyup", function () {
    var searchedString = searchNotes.value;
    var filteredNotes = notes.filter(function (note) {
        return note.getTitle().includes(searchedString) ||
            note.getDescription().includes(searchedString);
    });
    // Remove all previously displayed notes
    while (notesWrapper.firstChild) {
        notesWrapper.removeChild(notesWrapper.firstChild);
    }
    // Display filtered notes
    filteredNotes.forEach(function (note) {
        note.displayNote();
    });
});
// function displayNotesAfterEditing(id?: number): void {
//   notes = notes.filter((note) => note.getId() !== id);
//   while (notesWrapper.firstChild) {
//     notesWrapper.removeChild(notesWrapper.firstChild);
//   }
//   notes.forEach((note) => {
//     note.displayNote();
//   });
// }
