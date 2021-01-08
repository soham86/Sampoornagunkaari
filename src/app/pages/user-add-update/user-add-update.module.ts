import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAddUpdatePageRoutingModule } from './user-add-update-routing.module';

import { UserAddUpdatePage } from './user-add-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAddUpdatePageRoutingModule
  ],
  declarations: [UserAddUpdatePage]
})
export class UserAddUpdatePageModule {}
