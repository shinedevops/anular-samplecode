import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  showHideSideBarSub: any
  showSideBar: any

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    // Initialize sidebar subject subscription
    this.initShowHideSideBarSub()
  }

  /**
    Purpose: To initialize sidebar subject subscription.
    Request Params: N/A
    Created on 05/02/2021
  */
  initShowHideSideBarSub() {
    this.showHideSideBarSub = this.appService.showSideBarSubject.subscribe((resp: boolean) => {
      this.showSideBar = resp
    })
  }

  ngOnDestroy() {
    // Unsubscribe the subscription when component destroys
    this.showHideSideBarSub && this.showHideSideBarSub.unsubscribe()
  }

}
