import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { StatusbarTop } from './components/statusbar/statusbar-top/statusbar-top';
import { Login } from './components/login/login';

@NgModule({
  declarations: [App, StatusbarTop, Login],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
