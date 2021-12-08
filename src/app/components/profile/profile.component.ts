import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  allNotes: any;
  note: any;
  noteId: any;
  constructor(private _NotesService: NotesService) {}
  addNoteForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    color: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  updateNoteForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    color: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  ngOnInit(): void {
    this.getAllNotesData();
  }
  getAllNotesData() {
    let data = { userId: this._NotesService.userId };
    //token: this._NotesService.userToken
    this._NotesService.getAllNotes(data).subscribe((response) => {
      this.allNotes = response;
    });
  }
  addNoteFormSubmit(addNoteForm: FormGroup) {
    let addNoteFormData: any = {
      title: addNoteForm.value.title,
      description: addNoteForm.value.description,
      color: addNoteForm.value.color,
      userId: this._NotesService.userId,
      token: this._NotesService.userToken,
    };
    this._NotesService.addNote(addNoteFormData).subscribe((response) => {
      if (response.message == "Note Added") {
        $("#addNote").modal("hide");
        this.getAllNotesData();
        this.addNoteForm.reset();
      }
    });
  }
  fillUpdateModal() {
    // this._NotesService.currentNote.next({
    //   noteId: this.note.id,
    //   title: this.note.title,
    //   description: this.note.description,
    //   color: this.note.color,
    //   userId: this._NotesService.userId,
    // });
    this.updateNoteForm.controls.title.setValue(this.note.title);
    this.updateNoteForm.controls.description.setValue(this.note.description);
    this.updateNoteForm.controls.color.setValue(this.note.color);
  }
  updateNoteFormSubmit(updateNoteForm: FormGroup) {
    let updateNoteFormData: any = {
      id: this.note.id,
      title: updateNoteForm.value.title,
      description: updateNoteForm.value.description,
      color: updateNoteForm.value.color,
      userId: this._NotesService.userId,
    };
    this._NotesService.updateNote(updateNoteFormData).subscribe((response) => {
      if (response.message == "Note Updated") {
        $("#editNote").modal("hide");
        this.getAllNotesData();
        this.updateNoteForm.reset();
      }
    });
  }
  getNoteUpdate(note: any) {
    this.note = note;
    this.fillUpdateModal();
  }
  getNoteDelete(note: any) {
    this.note = note;
  }
  deleteNote() {
    let deleteNoteData: any = {
      id: this.note.id,
      title: this.note.title,
      description: this.note.description,
      color: this.note.color,
      userId: this._NotesService.userId,
    };
    this._NotesService.deleteNote(deleteNoteData).subscribe((response) => {
      if (response.message == "Note Deleted") {
        $("#deleteNote").modal("hide");
        this.getAllNotesData();
      }
    });
  }
}
