import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../content/content.component';
import { DetailComponent } from '../content/detail/detail.component';
import { EditComponent } from '../content/edit/edit.component';
import { SearchComponent } from '../content/search/search.component';

const routes: Routes = [
  { path: '', redirectTo:'main/1',
  pathMatch:'full' },
  { path: 'main', redirectTo:'main/1',
  pathMatch:'full' },
  { path: 'main/:id', component: ContentComponent },
  { path: 'detail/:name', component: DetailComponent },
  { path: 'edit', component: EditComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'search/:type/:value/:page',component: SearchComponent }
  // { path: 'detail', component: DetailDefineComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'BasicChartComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
