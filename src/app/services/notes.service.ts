import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  baseUrl: string = "https://bsite.net/engmoamenragab/api/Note/";
  userDetails: any;
  userId: any;
  userToken: any;
  data: any;
  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) {
    this.userToken = localStorage.getItem("userToken");
    this.userDetails = this._AuthService.currentUser.getValue();
    this.userId = this.userDetails.sid;
    this.data = { _id: this.userId };
    //token: this.userToken
  }
  getAllNotes(getAllNotesData: any): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}GetAllUserNotes`, { params: getAllNotesData });
  }
  addNote(addNoteFormData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}AddNote`, addNoteFormData);
  }
  updateNote(updateNoteFormData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}UpdateNote`, updateNoteFormData);
  }
  deleteNote(deleteNoteData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}DeleteNote`, deleteNoteData);
  }
}
