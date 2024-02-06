import { NgModule, importProvidersFrom, isDevMode } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastContainerDirective, ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LeftTileComponent } from './components/home/left-tile/left-tile.component';
import { MmmModule } from './components/mmm/mmm.module';
import { PcBuilderModule } from './components/pc-builder/pc-builder.module';
import { TestModule } from './components/test/test.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { effects, reducers } from './store';
import { connexionRefusedInterceptorProvider } from './interceptors/connexion-refused-interceptor.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, LeftTileComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TestModule,
    MmmModule,
    PcBuilderModule,
    ToastrModule.forRoot(),
    ToastContainerDirective,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    connexionRefusedInterceptorProvider,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
