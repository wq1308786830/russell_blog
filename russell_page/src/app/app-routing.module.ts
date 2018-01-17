import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {IndexComponent} from "./components/main/index/index.component";
import {EditBlogComponent} from "./components/main/edit-blog/edit-blog.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: '登录'}},
  {path: 'index', component: IndexComponent, data: {title: '首页'}},
  {path: 'blogEdit', component: EditBlogComponent, data: {title: '编辑博文'}},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {useHash: true}
      // {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
