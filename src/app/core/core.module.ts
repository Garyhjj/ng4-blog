import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogService } from './services/blog.service';

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule,
    ReactiveFormsModule],
    declarations: [],
    providers: [
      BlogService
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
