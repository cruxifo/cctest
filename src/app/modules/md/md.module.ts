import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatChipsModule } from "@angular/material/chips";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";

@NgModule({
     imports: [
          CommonModule,
          MatButtonModule,
          MatIconModule,
          MatProgressBarModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatTabsModule,
          MatTooltipModule,
          MatBadgeModule
     ],
     exports: [
          MatButtonModule,
          MatIconModule,
          MatProgressBarModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatRadioModule,
          MatChipsModule,
          MatTabsModule,
          MatTooltipModule,
          MatBadgeModule
     ]
})
export class MdModule {}
