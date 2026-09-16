import { CommonModule } from '@angular/common'
import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { formatIsoDate } from '@shared/utils'
import { Book as BookModel } from '../../../core/models/book.model'

@Component({
  selector: 'app-book-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 class="mat-mdc-dialog-title">Book Preview</h2>

    <div class="mat-mdc-dialog-content">
      <dl class="grid grid-cols-2 gap-x-3 gap-y-2 items-center">
        <dt class="text-start font-semibold">Judul</dt>
        <dd class="text-end">{{ data.judul }}</dd>

        <dt class="text-start font-semibold">Penulis</dt>
        <dd class="text-end">{{ data.penulis }}</dd>

        <ng-container *ngIf="data.penerbit">
          <dt class="text-start font-semibold">Penerbit</dt>
          <dd class="text-end">{{ data.penerbit }}</dd>
        </ng-container>

        <dt class="text-start font-semibold">Tahun Terbit</dt>
        <dd class="text-end">{{ data.tahunTerbit }}</dd>

        <dt class="text-start font-semibold">ISBN</dt>
        <dd class="text-end">{{ data.isbn }}</dd>

        <dt class="text-start font-semibold">Stok</dt>
        <dd class="text-end">{{ data.stok }}</dd>

        <ng-container *ngIf="data.kategori">
          <dt class="text-start font-semibold">Kategori</dt>
          <dd class="text-end">{{ data.kategori }}</dd>
        </ng-container>

        <dt class="text-start font-semibold">Created</dt>
        <dd class="text-end text-sm text-gray-500">{{ formatIsoDate(data.createdAt) }}</dd>

        <ng-container *ngIf="data.updatedAt">
          <dt class="text-start font-semibold">Updated</dt>
          <dd class="text-end text-sm text-gray-500">{{ formatIsoDate(data?.updatedAt) }}</dd>
        </ng-container>
      </dl>
    </div>

    <div class="mat-mdc-dialog-actions" style="justify-content: flex-end; margin-top: 16px;">
      <button mat-stroked-button color="primary" (click)="onClose()">
        <mat-icon aria-hidden="false" aria-label="close">close</mat-icon>
        Close
      </button>
    </div>
  `,
})
export class BookPreviewDialogComponent {
  public formatIsoDate = formatIsoDate

  constructor(
    private dialogRef: MatDialogRef<BookPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookModel,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
