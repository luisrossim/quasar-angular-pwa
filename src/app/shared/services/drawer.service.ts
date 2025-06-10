import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  isDrawerVisible: WritableSignal<boolean> = signal(false)

  openDrawer(){
    this.isDrawerVisible.set(true);
  }

  closeDrawer(){
    this.isDrawerVisible.set(false);
  }
}
