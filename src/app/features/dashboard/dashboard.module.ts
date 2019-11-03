import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from 'src/app/shared/module/material/material.module';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
// import {CdkAccordionModule} from '@angular/cdk/accordion';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatOptionModule, MatSelectModule, MatButtonToggleModule, CdkTableModule, A11yModule, BidiModule, OverlayModule, PlatformModule, ObserversModule, PortalModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxMatDrpModule
  ]
})
export class DashboardModule { }
