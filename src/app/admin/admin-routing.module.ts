import { AdminComponent } from './admin.component';
import { AuthGuard } from './../route/auth-guard.service';
import { TipComponent } from './../admin/tip/tip.component';
import { EditComponent } from './../admin/edit/edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const adminRoutes: Routes = [
    {
        path: '',
        component:AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'edit',
                        component: EditComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: EditComponent,
                    },
                    {
                        path: 'tip',
                        component: TipComponent,
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
