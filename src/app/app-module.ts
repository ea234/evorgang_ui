import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { StatusbarTop } from './components/statusbar/statusbar-top/statusbar-top';
import { Login } from './components/login/login';
import { ApplicationSelection } from './components/application-selection/application-selection';

@NgModule({
  declarations: [App, StatusbarTop, Login, ApplicationSelection],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
