import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { of, Subject } from "rxjs";
import { tap, finalize, concatMap, delay, takeUntil } from "rxjs/operators";
import { Record, RecordStatus } from "../../interfaces";
import { TwilioService } from "../../services/twilio.service";
import { SubSink } from "subsink";

type FormValues = "ALL" | "INVALID" | "VALID" | "SENT" | "UNSENT" | "FAILED";

interface FormChanges {
     filter: FormValues;
}

interface Info {
     total: number;
     duplicates: number;
     invalid: number;
     valid: number;
     sent: number;
     unsent: number;
     failed: number;
}

@Component({
     selector: "app-home",
     templateUrl: "./home.component.html",
     styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
     public sourceData: Record[];
     public filteredData: Record[];
     public progress = 0;
     public sending = false;
     public info: Info;
     public form: FormGroup;
     public duplicates: Set<string>;
     public filter: string = null;
     public selectedTab = 0;
     public message: string;

     private cancel$: Subject<any>;
     private subsink = new SubSink();

     constructor(private twilio: TwilioService, fb: FormBuilder) {
          this.form = fb.group({ filter: "ALL" });

          this.subsink.sink = this.form.valueChanges.subscribe(
               (changes: FormChanges) => this.formChanges(changes)
          );
     }

     public ngOnInit() {
          this.loadData([]);
     }

     public ngOnDestroy() {
          this.subsink.unsubscribe();
     }

     public dummy() {
          this.loadData(require("../../data/sample1000").default);
     }

     public setMessage(msg: string) {
          this.message = msg;
     }

     public reset() {
          this.resetFilter();
          this.loadData([]);
     }

     public processCSV(data: string[][]) {
          this.loadData(data);
     }

     public filterDuplicates(phone: string) {
          this.resetFilter();
          this.filter = phone;
          this.filteredData = this.sourceData;
     }

     public resetFilter() {
          this.filter = null;
          this.form.patchValue({ filter: "ALL" });
     }

     public get pendingCount(): number {
          return this.dataToSend().length;
     }

     public startSend() {
          const toSend = this.dataToSend();
          const N = toSend.length;
          if (!N) {
               return;
          }
          this.progress = 0;
          const incr = 100.0 / N;
          this.sending = true;
          this.cancel$ = new Subject<any>();

          this.subsink.sink = of(...toSend)
               .pipe(
                    concatMap(row => {
                         this.progress += incr;
                         const msg = this.formattedMessage(row.name);
                         return this.twilio.send(msg, row.phone).pipe(
                              delay(1),
                              tap(res => {
                                   row.errorCode = res.error_code;
                                   row.errorMessage = res.error_message;
                                   if (!res.error_code) {
                                        row.sent = true;
                                        row.status = "OK";
                                   }
                                   this.updateTotals();
                              })
                         );
                    }),
                    finalize(() => {
                         this.sending = false;
                         this.progress = 0;
                         this.resetFilter();
                         // trigger change detection
                         this.filteredData = [...this.sourceData];
                         this.updateTotals();
                    }),
                    takeUntil(this.cancel$)
               )
               .subscribe();
     }

     public cancelSend() {
          this.cancel$.next(null);
          this.cancel$.complete();
     }

     private formChanges(changes: { filter: FormValues }) {
          this.filter = null;

          if (!changes.filter) {
               return;
          }

          const inData = this.sourceData;
          let outData: typeof inData;
          switch (changes.filter) {
               case "INVALID":
                    outData = inData.filter(row => !row.valid);
                    break;
               case "VALID":
                    outData = inData.filter(row => row.valid);
                    break;
               case "SENT":
                    outData = inData.filter(row => row.sent);
                    break;
               case "UNSENT":
                    outData = inData.filter(row => !row.sent);
                    break;
               case "FAILED":
                    outData = inData.filter(row => row.errorCode != null);
                    break;
               default:
                    outData = inData;
          }
          this.filteredData = outData;
     }

     private dataToSend(): Record[] {
          return this.sourceData.filter(
               row => !row.sent && row.valid && !row.duplicate
          );
     }

     private loadData(inData: string[][]) {
          this.resetFilter();
          const validNumber = /^[+]?\d+$/;
          const seen = new Set<string>();
          this.duplicates = new Set<string>();
          this.sourceData = inData.map<Record>(row => {
               const name = (row[0] || "Client").trim();
               const phone = (row[5] || "").trim();
               const isValid = validNumber.test(phone);
               const duplicate = seen.has(phone);
               let status: RecordStatus = "PENDING";
               if (duplicate) {
                    this.duplicates.add(phone);
                    status = "N/A";
               } else {
                    seen.add(phone);
               }
               return {
                    name,
                    phone,
                    valid: isValid,
                    duplicate,
                    sent: false,
                    status,
                    errorCode: null,
                    errorMessage: null
               };
          });

          this.filteredData = this.sourceData;

          const total = this.sourceData.length;
          const duplicates = total - seen.size;
          const invalid = this.sourceData.filter(row => !row.valid).length;
          const valid = total - invalid;
          this.info = {
               total,
               duplicates,
               invalid,
               valid,
               sent: 0,
               unsent: total,
               failed: 0
          };

          this.selectedTab = total ? 1 : 0;
     }

     private updateTotals() {
          const total = this.info.total;
          const sent = this.sourceData.filter(row => row.sent).length;
          const unsent = total - sent;
          const failed = this.sourceData.filter(row => row.errorCode != null)
               .length;

          this.info = { ...this.info, sent, unsent, failed };
     }

     private formattedMessage(name: string) {
          return this.message.replace(/\|NAME\|/g, name);
     }
}
