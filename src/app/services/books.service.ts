import { Injectable } from '@angular/core';
import {Book} from "../models/book.model";
import {Subject} from "rxjs/index";
import * as firebase from 'firebase';
import {reject} from "q";
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private  database:string = "/books";
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books.slice());
  }

  saveBooks() {
    firebase.database().ref(this.database).set(this.books);
  }

  getBooks() {
    firebase.database().ref(this.database).on('value',(data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSignleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.database +"/"+id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    )
  }

  createNewBook(newBook: Book){
    //console.log("my book", newBook);
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {

    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log("photo supprimée ! ");
        }
      ).catch(
        (error)=> {
         console.log("fichier non trouvé : "+ error);
      });
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl)=> {
        if(bookEl === book) {
          return true;
        }
      }
    )
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);




         upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadURL) => {
               // console.log('chargement terminé ! : ' +  downloadURL);
                resolve(downloadURL);
              }
            )

          }
        );

      }
    );
  }

}
