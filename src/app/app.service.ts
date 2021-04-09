import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  public showSideBarSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1)
  constructor() { }
}
