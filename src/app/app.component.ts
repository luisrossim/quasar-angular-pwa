import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { ToastService } from './shared/services/toast.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from './shared/services/loading.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoadingComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private toastService = inject(ToastService);
  private messageService = inject(MessageService);
  private loadingService = inject(LoadingService);
  isLoading: boolean = false;

  
  ngOnInit(): void {
    this.listenToastService();
    this.listenLoadingService();
  }


  private listenToastService() {
    this.toastService.send$.subscribe({
      next: newMessage => {
        if(newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      }
    })
  }


  private listenLoadingService() {
    this.loadingService.loading$.subscribe((value) => {
      this.isLoading = value;
    })
  }
}
