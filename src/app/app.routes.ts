import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfExtract } from './pdf-extract/pdf-extract';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Samples } from './samples/samples';
export const routes: Routes = [
  // Default route → login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth routes
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // Main page after login/signup
  { path: 'pdfextract', component: PdfExtract },

  //Sample Page
  {path:'samples',component:Samples},

  // Fallback for unknown URLs
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
