import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'pokemons',
      pathMatch: 'full'
   },
   {
      path: 'pokemons',
      canActivate: [authGuard],
      loadChildren: () => import('./routes/pokemon.routes').then(m => m.pokemonRoutes)
   },
   { 
      path: '404', 
      component: NotFoundComponent 
   },
   { 
      path: '**', 
      redirectTo: '404', 
      pathMatch: 'full' 
   },
];
