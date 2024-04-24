import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutComponent } from './about/about.component';
import { About2Component } from './about2/about2.component';


@NgModule({
  declarations: [
    AboutComponent,
    About2Component
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
