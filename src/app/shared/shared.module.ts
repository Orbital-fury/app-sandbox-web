import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EuroCurrencyPipe } from '../components/pc-builder/euro-currency-pipe/euro-currency-pipe.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CustomToastComponent } from './components/toast/custom-toast/custom-toast.component';

@NgModule({
  declarations: [LoaderComponent, EuroCurrencyPipe, CustomToastComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NgbModule
  ],
  exports: [CommonModule, RouterModule, BrowserModule, NgbModule, LoaderComponent, EuroCurrencyPipe],
})
export class SharedModule { }
