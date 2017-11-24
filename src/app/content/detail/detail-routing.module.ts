import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';

const detailRoutes: Routes = [
    {
        path: ':name',
        component: DetailComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(detailRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class DetailRoutingModule{}