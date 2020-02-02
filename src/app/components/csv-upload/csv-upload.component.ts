import { Component, HostListener, Output, EventEmitter } from "@angular/core";
import * as Papa from "papaparse";

@Component({
     selector: "app-csv-upload",
     templateUrl: "./csv-upload.component.html",
     styleUrls: ["./csv-upload.component.scss"]
})
export class CSVUploadComponent {
     public over = false;
     @Output() public fileDropped = new EventEmitter<any>();

     @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
          this.clearEvents(evt);
          this.over = true;
     }

     @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
          this.clearEvents(evt);
          this.over = false;
     }

     @HostListener("drop", ["$event"]) public onDrop(evt: DragEvent) {
          this.clearEvents(evt);
          this.over = false;
          const files = evt.dataTransfer.files;
          if (files.length > 0) {
               const reader = new FileReader();

               const fn = () => {
                    const obj = Papa.parse(
                         ((reader.result as string) || "").trim()
                    );
                    this.fileDropped.emit(obj.data);
                    reader.removeEventListener("load", fn);
               };

               reader.addEventListener("load", fn, false);

               reader.readAsText(files[0]);
          }
     }

     private clearEvents(evt: DragEvent) {
          evt.preventDefault();
          evt.stopPropagation();
     }
}
