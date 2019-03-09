import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {Subscription} from "rxjs/index";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit , OnDestroy{

  books: Book[];
  booksSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
        if(books.length> 0){
          console.log("my first book : ", books[0].title, books[0].author);
          console.log("my books : ", books);
        }
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['books','new']);
  }

  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(["books", "view", id]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }



}
