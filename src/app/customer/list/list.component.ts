import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteModalComponent } from './../../modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
    Purpose: To open a modal popup.
    Request Params: N/A
    Created on 05/02/2021
  */
  openDeleteModal(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    const modalDialog = this.matDialog.open(DeleteModalComponent, dialogConfig);
  }

}
