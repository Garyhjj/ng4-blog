import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

import { BlogService } from './services/blog.service';
import { NgValidatorExtendService } from './services/ng-validator-extend.service';

export function getAuthHttp(http: any) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    noTokenScheme: true, // 如果是false，token前面会自动增加Bearer
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.get('id_token')),
  }), http);
}

@NgModule({
  imports: [CommonModule, HttpModule, FormsModule,
    ReactiveFormsModule],
  declarations: [],
  providers: [
    BlogService,
    NgValidatorExtendService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  exports: []
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
