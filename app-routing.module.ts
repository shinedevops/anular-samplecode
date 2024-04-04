import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '@components/on-boarding/forgot-password/forgot-password.component';
import { LoginComponent } from '@components/on-boarding/login/login.component';
import { PermissionGuard } from './guards/admin.guard';

import { Roles } from '@constants/constants';

import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: "enabled",
    anchorScrolling: "enabled",
    scrollOffset: [0, 64]
};

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'admin', loadChildren: () => import('@modules/user/user.module').then(m => m.UserModule), data: { role: Roles.ADMINISTRATOR }, canLoad: [PermissionGuard] },
    { path: 'company', loadChildren: () => import('@modules/company/company.module').then(m => m.CompanyModule), data: { role: Roles.COMPANY }, canLoad: [PermissionGuard] },
    { path: ':role', loadChildren: () => import('@modules/under-writter/under-writter.module').then(m => m.UnderWritterModule) },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
