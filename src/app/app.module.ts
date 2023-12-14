import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { LeftTileComponent } from './components/home/left-tile/left-tile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModule } from './components/test/test.module';
import { CoreModule } from './core.module';
import { MmmModule } from './components/mmm/mmm.module';
import { PCBuilderModule } from './components/pc-builder/pc-builder.module';

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
    PCBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
