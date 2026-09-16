import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../../core/services/book.service';
import { Book as BookModel, CreateBookDto, UpdateBookDto } from '../../core/models/book.model';
import { BookFormDialogComponent } from './components/book-form-dialog.component';
import { ConfirmDialogComponent } from '../client/components/confirm-dialog.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  styles: `
    table {
      width: 100%;
    }

    .mat-mdc-form-field {
      font-size: 14px;
      width: 100%;
    }
  `,
  templateUrl: './book.html',
})
export class Book implements OnInit {
  displayedColumns: string[] = ['judul', 'penulis', 'tahunTerbit', 'isbn', 'stok', 'kategori', 'actions'];
  dataSource = new MatTableDataSource<BookModel>([]);

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: CreateBookDto) => {
      if (result) {
        this.bookService.createBook(result).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }

  edit = (book: BookModel) => {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '500px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe((result: UpdateBookDto) => {
      if (result) {
        this.bookService.updateBook(book.id, result).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }

  delete = (book: BookModel) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Book',
        message: `Are you sure you want to delete book "${book.judul}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bookService.deleteBook(book.id).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }
}
