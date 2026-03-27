import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PdfExtract } from './pdf-extract/pdf-extract';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Samples } from './samples/samples';
import { Adminlogin } from './auth/adminlogin/adminlogin';
import { ForgetLogin } from './auth/forget-login/forget-login';
import { TableData } from './auth/table-data/table-data';
import { UpdateUser } from './auth/update-user/update-user';



export const routes: Routes = [
  // Default route → login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth routes
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'adminlogin',component:Adminlogin},
  { path: 'forget-password',component:ForgetLogin},
  { path: 'table-data',component:TableData},
  { path: 'update-user/:id', component: UpdateUser},

  // Main page after login/signup
  { path: 'pdfextract', component: PdfExtract },

  //Sample Page
  {path:'samples',component:Samples},

  // Fallback for unknown URLs
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
