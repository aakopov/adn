import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRouteModule } from './app.route.module';

import { ImageService } from './service/image.service';
import { ContainerService } from './service/container.service';
import { SystemService } from './service/system.service';
import { NetworkService } from './service/network.service';
import { ServiceService } from './service/service.service';
import { VolumeService } from './service/volume.service';

import { AppComponent } from './app.component';
import { ImageComponent } from './component/image/image.component';
import { ContainerComponent } from './component/container/container.component';
import { SystemComponent } from './component/system/system.component';
import { NetworkComponent } from './component/network/network.component';
import { ServiceComponent } from './component/service/service.component';
import { VolumeComponent } from './component/volume/volume.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ContainerComponent,
    SystemComponent,
    NetworkComponent,
    ServiceComponent,
    VolumeComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ImageService,
    ContainerService,
    SystemService,
    NetworkService,
    ServiceService,
    VolumeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
