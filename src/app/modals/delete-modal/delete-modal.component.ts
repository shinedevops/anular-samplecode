import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>) { }

  ngOnInit(): void {
  }

  /**
    Purpose: To close the modal popup.
    Request Params: N/A
    Created on 05/02/2021
  */
  closeModal(): void {
    this.dialogRef.close();
  }
}
