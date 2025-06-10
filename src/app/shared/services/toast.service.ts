import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  INIT_STATE = "INIT";

  private sendSubject = new BehaviorSubject<Message>({summary: this.INIT_STATE});
  send$ = this.sendSubject.asObservable();

  public send(message: Message): void {
    this.sendSubject.next(message);
  }

  public error403(): void {
    this.send({
      severity: "error",
      summary: "Acesso negado",
      detail: "Você não tem permissão para acessar esse recurso."
    });
  }

  public error(msg: string): void {
    this.send({ severity: "error", summary: "Erro!", detail: msg, life: 3000 });
  }

  public success(msg: string): void {
    this.send({ severity: "success", summary: "Sucesso!", detail: msg, life: 3000 });
  }
}
