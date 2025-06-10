import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

export interface ConfirmOptions {
  event: Event;
  message: string;
  acceptButtonLabel?: string;
  acceptButtonSeverity?: string;
  onAccept: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private confirmationService: ConfirmationService){}

  confirmation(options: ConfirmOptions){
    this.confirmationService.confirm({
      target: options.event.target as EventTarget,
      message: options.message,
      header: 'Confirmação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: options.acceptButtonLabel || 'Confirmar',
          severity: options.acceptButtonSeverity || 'primary',
      },
      accept: options.onAccept,
      reject: () => {},
    });
  }
}