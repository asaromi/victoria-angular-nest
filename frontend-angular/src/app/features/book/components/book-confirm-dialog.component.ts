import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  /** 'primary' | 'accent' | 'warn' | 'danger' (danger maps to warn) */
  type?: 'primary' | 'accent' | 'warn' | 'danger';
}

const BUTTON_COLOR_MAP: Record<'primary' | 'accent' | 'warn' | 'danger', string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  accent: 'bg-blue-500 text-white hover:bg-blue-600',
  warn: 'bg-yellow-500 text-black hover:bg-yellow-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

@Component({
  selector: 'app-client-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button="filled" color="{{ BUTTON_COLOR_MAP[data.type || 'primary'] }}" (click)="onConfirm()">
        {{ data.confirmLabel || 'Confirm' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class BookConfirmDialogComponent {
  BUTTON_COLOR_MAP = BUTTON_COLOR_MAP;

  constructor(
    private dialogRef: MatDialogRef<BookConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }

  onConfirm(): void {
    this.dialogRef.close(true)
  }
}
