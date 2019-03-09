import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/book.model";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title : ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSaveBook() {
    const title = this.bookForm.value.title;
    //const title = this.bookForm.get('title').value;
    const author = this.bookForm.value.author;
    const newBook  = new Book(title, author);

    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    //console.log(newBook);
    this.bookService.createNewBook(newBook);
    this.router.navigate(["/books"]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFile(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
