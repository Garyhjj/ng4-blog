import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './../content/content.component';
import { AdminComponent } from './../admin/admin.component';
import { DetailComponent } from '../content/detail/detail.component';
import { EditComponent } from '../admin/edit/edit.component';
import { AboutComponent } from '../about/about.component';
import { SoftwareComponent } from '../software/software.component';
import { TipComponent } from '../admin/tip/tip.component';

import { AuthGuard }                from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'home',
  pathMatch:'full' },
  { path: 'home', loadChildren: 'app/content/content.module#ContentModule'},
  { path: 'detail', loadChildren: 'app/content/detail/detail.module#DetailModule' },
  { path: 'search',loadChildren: 'app/content/search/search.module#SearchModule' },
  { path: 'software', loadChildren: 'app/software/software.module#SoftwareModule' },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
  { path: '**', redirectTo:'home',
  pathMatch:'full'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
