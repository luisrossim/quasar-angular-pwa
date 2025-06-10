import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, Button],
  template: `
    <div class="flex justify-center items-center w-screen h-screen text-center bg-zinc-900">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold text-slate-300">404 - Página não encontrada</h1>
        <p class="text-slate-400 mb-5">A rota que você tentou acessar não existe.</p>
        <p-button label="Voltar" icon="pi pi-chevron-left" size="small" severity="help" (click)="redirectToBase()" />
      </div>
    </div>
  `
})
export class NotFoundComponent {
  router = inject(Router);

  redirectToBase(){
    this.router.navigateByUrl('');
  }
}
