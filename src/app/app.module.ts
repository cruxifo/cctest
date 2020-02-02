import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MdModule } from "@modules/md/md.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { TableComponent } from "./components/table/table.component";
import { TwilioService } from "./services/twilio.service";
import { FakeTwilioService } from "./services/fake-twilio.service";
import { BooleanIconComponent } from "./components/boolean-icon/boolean-icon.component";
import { CSVUploadComponent } from "./components/csv-upload/csv-upload.component";
import { MessageComposerComponent } from "./components/message-composer/message-composer.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
     declarations: [
          AppComponent,
          HomeComponent,
          TableComponent,
          BooleanIconComponent,
          CSVUploadComponent,
          MessageComposerComponent
     ],
     imports: [
          BrowserModule,
          AppRoutingModule,
          BrowserAnimationsModule,
          MdModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
     ],
     providers: [
          {
               provide: TwilioService,
               useClass: FakeTwilioService
          }
     ],
     bootstrap: [AppComponent]
})
export class AppModule {}
