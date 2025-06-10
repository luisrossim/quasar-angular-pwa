import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    <div class="loading-overlay">
      <div class="loading-content">
        <img src="assets/loading-icon.svg" class="w-[50px] h-[50px]" alt="loading">
      </div>
    </div>
  `,
  styles: `
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
    }
  `
})
export class LoadingComponent {}
