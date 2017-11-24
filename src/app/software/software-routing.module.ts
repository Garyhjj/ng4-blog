import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoftwareComponent } from './software.component';

const softwareRoutes: Routes = [
    {
        path: '',
        component:SoftwareComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(softwareRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})
export class SoftwareRoutingModule { }
