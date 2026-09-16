import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Book } from '../../../core/models/book.model';

export interface BookDialogData {
  book?: Book;
}

@Component({
  selector: 'app-book-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit Book' : 'Create Book' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="bookForm" class="flex flex-col gap-4 pt-2">
        <mat-form-field appearance="outline">
          <mat-label>Judul</mat-label>
          <input matInput formControlName="judul" placeholder="Enter book title" />
          <mat-error *ngIf="bookForm.get('judul')?.hasError('required')">
            Judul is required
          </mat-error>
          <mat-error *ngIf="bookForm.get('judul')?.hasError('maxlength')">
            Judul must be less than 150 characters
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Penulis</mat-label>
          <input matInput formControlName="penulis" placeholder="Enter author name" />
          <mat-error *ngIf="bookForm.get('penulis')?.hasError('required')">
            Penulis is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Penerbit</mat-label>
          <input matInput formControlName="penerbit" placeholder="Enter publisher name" />
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Tahun Terbit</mat-label>
            <input matInput formControlName="tahunTerbit" type="number" placeholder="Year" />
            <mat-error *ngIf="bookForm.get('tahunTerbit')?.hasError('required')">
              Tahun Terbit is required
            </mat-error>
            <mat-error *ngIf="bookForm.get('tahunTerbit')?.hasError('max')">
              Tahun Terbit max current year
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Stok</mat-label>
            <input matInput formControlName="stok" type="number" placeholder="Stock" />
            <mat-error *ngIf="bookForm.get('stok')?.hasError('required')">
              Stok is required
            </mat-error>
            <mat-error *ngIf="bookForm.get('stok')?.hasError('min')">
              Stok must be positive
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>ISBN</mat-label>
          <input matInput formControlName="isbn" placeholder="Enter ISBN" />
          <mat-error *ngIf="bookForm.get('isbn')?.hasError('required')">
            ISBN is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Kategori</mat-label>
          <input matInput formControlName="kategori" placeholder="Enter category" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="bookForm.invalid" (click)="onSubmit()">
        {{ isEdit ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class BookFormDialogComponent {
  bookForm: FormGroup;
  isEdit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDialogData
  ) {
    this.isEdit = !!data.book;
    this.bookForm = this.formBuilder.group({
      judul: [data.book?.judul || '', [Validators.required, Validators.maxLength(150)]],
      penulis: [data.book?.penulis || '', [Validators.required]],
      penerbit: [data.book?.penerbit || ''],
      tahunTerbit: [data.book?.tahunTerbit || new Date().getFullYear(), [Validators.required, Validators.max(new Date().getFullYear())]],
      isbn: [data.book?.isbn || '', [Validators.required]],
      stok: [data.book?.stok ?? 0, [Validators.required, Validators.min(0)]],
      kategori: [data.book?.kategori || ''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }
}
