import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../content/content.component';
import { DetailComponent } from '../content/detail/detail.component';
import { EditComponent } from '../content/edit/edit.component';
import { SearchComponent } from '../content/search/search.component';
import { AboutComponent } from '../about/about.component';
import { SoftwareComponent } from '../software/software.component';
import { TipComponent } from '../content/tip/tip.component';
import { AuthGuard }                from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'main/1',
  pathMatch:'full' },
  { path: 'about', component: AboutComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'main', redirectTo:'main/1',
  pathMatch:'full' },
  { path: 'main/:id', component: ContentComponent },
  { path: 'detail/:name', component: DetailComponent },
  { path: 'edit', component: EditComponent , canActivate: [AuthGuard]},
  { path: 'tip', component: TipComponent , canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'search/:type/:value/:page',component: SearchComponent },
  { path: '**', redirectTo:'main/1',
  pathMatch:'full'},
  // { path: 'detail', component: DetailDefineComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'BasicChartComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
