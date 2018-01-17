import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/login/login.component';
import {IndexComponent} from './components/main/index/index.component';
import {NoopInterceptor} from "./services/NoopInterceptor";
import {TimingInterceptor} from "./services/TimingInterceptor";
import {CommonService} from "./services/common.service";
import {RecaptchaModule} from "ng-recaptcha";
import {UserCenterComponent} from './components/main/user-center/user-center.component';
import {CKEditorModule} from "ng2-ckeditor";
import { EditBlogComponent } from './components/main/edit-blog/edit-blog.component';
import { FancyMusicComponent } from './components/three/fancy-music/fancy-music.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    UserCenterComponent,
    EditBlogComponent,
    FancyMusicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CKEditorModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RecaptchaModule.forRoot(),
  ],
  providers: [CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
