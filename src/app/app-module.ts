import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule                                  } from '@angular/forms';
import { BrowserModule                                } from '@angular/platform-browser';
import { StatusbarTop                                 } from './components/statusbar/statusbar-top/statusbar-top';
import { Logout                                       } from './components/logout/logout';
import { Login                                        } from './components/login/login';
import { ApplicationSelection                         } from './components/application-selection/application-selection';
import { Vorgangssteuerung                            } from './app_vorgang/components/vorgangssteuerung/vorgangssteuerung';
import { Vorgangsbearbeitung                          } from './app_vorgang/components/vorgangsbearbeitung/vorgangsbearbeitung';
import { AppRoutingModule                             } from './app-routing-module';
import { App                                          } from './app';

@NgModule({
  declarations: [
    App,
    StatusbarTop,
    Login,
    ApplicationSelection,
    Logout,
    Vorgangssteuerung,
    Vorgangsbearbeitung,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
