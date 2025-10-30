// src/app/pages/pages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PAGES_ROUTES)
  ]
})
export class PagesModule { }
