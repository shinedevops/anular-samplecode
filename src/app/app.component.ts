import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Sidebar animation logic
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
        animate('0.1s')
      ])
    ])
  ]
})
export class AppComponent {

  showSideBar: any
  showHideSideBarSub: any

  constructor(private appService: AppService){}

  ngOnInit(): void {
    // Initialize sidebar subject subscription
    this.initShowHideSideBarSub()
  }

  /**
    Purpose: To initialize sidebar subject subscription.
    Request Params: N/A
    Created on 05/02/2021
  */
  initShowHideSideBarSub(): void {
    this.showHideSideBarSub = this.appService.showSideBarSubject.subscribe((resp: boolean) => {
      this.showSideBar = resp
    })
  }
  
  ngOnDestroy(): void {
    // Unsubscribe the subscription when component destroys
    this.showHideSideBarSub && this.showHideSideBarSub.unsubscribe()
  }
}
