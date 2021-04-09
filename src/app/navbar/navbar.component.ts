import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AppService } from './../app.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // Navbar animation logic
  animations: [
    trigger('sideBarOpenClose', [
      state('onOpen', style({
        marginLeft: '250px'
      })),
      state('onClose', style({
        marginLeft: '0px'
      })),
      transition('onOpen => onClose', [
        animate('0.2s')
      ]),
      transition('onClose => onOpen', [
        animate('0.3s')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  
  showSideBar: boolean = true

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    // Broadcast the sidebar state value initially
    this.appService.showSideBarSubject.next(this.showSideBar)
  }

  /**
    Purpose: To open/close sidebar on icon click.
    Request Params: N/A
    Created on 05/02/2021
  */
  onClickSideBar(): void {
    this.showSideBar = !this.showSideBar
    this.appService.showSideBarSubject.next(this.showSideBar)
  }

}
