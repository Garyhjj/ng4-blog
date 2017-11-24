import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';

const contentRoutes: Routes =[
    {
        path:'',
        redirectTo:'1',
        pathMatch:'full'
    },
    {
        path:':id',
        component:ContentComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ContentRoutingModule {}