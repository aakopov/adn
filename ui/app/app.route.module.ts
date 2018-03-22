import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageComponent } from './component/image/image.component';
import { ContainerComponent } from './component/container/container.component';
import { SystemComponent } from './component/system/system.component';
import { NetworkComponent } from './component/network/network.component';

const routes : Routes = [
    {path: "", redirectTo: "/system", pathMatch: "full"},
    {path: "system", component: SystemComponent},
    {path: "image", component: ImageComponent},
    {path: "container", component: ContainerComponent},
    {path: "network", component: NetworkComponent}    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule {}