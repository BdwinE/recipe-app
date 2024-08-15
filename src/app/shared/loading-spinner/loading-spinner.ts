import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {}
