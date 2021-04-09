import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './customer/list/list.component';

const routes: Routes = [
  { 'path': '', pathMatch:'full', redirectTo:'customers' },
  { 'path': 'customers', component: ListComponent },
  { 'path': '**', redirectTo:'/customers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
