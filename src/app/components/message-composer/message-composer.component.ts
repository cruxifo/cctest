import {
     Component,
     OnInit,
     OnDestroy,
     Output,
     EventEmitter
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

const defaultMessage = `Dear |NAME|,

With the winter holidays coming up, we’d like to make sure that the Consultant Connect rotas are up-to-date. Please just reply to this text to tell us when you’re on leave and we’ll enter it into our system to ensure that you’re not called then.

Happy holidays!
The Consultant Connect Team
`.trim();

@Component({
     selector: "app-message-composer",
     templateUrl: "./message-composer.component.html",
     styleUrls: ["./message-composer.component.scss"]
})
export class MessageComposerComponent implements OnInit, OnDestroy {
     @Output() public message = new EventEmitter<string>();

     public msg = defaultMessage;

     public form: FormGroup;
     public error = false;

     private sub$: Subscription;

     constructor(fb: FormBuilder) {
          this.form = fb.group({
               message: this.msg
          });
          this.sub$ = this.form
               .get("message")
               .valueChanges.subscribe((change: string) => {
                    if (!change.includes("|NAME|")) {
                         this.msg = null;
                         this.error = true;
                    } else {
                         this.msg = (change || "").trim();
                         this.error = false;
                    }
                    this.message.emit(this.msg);
               });
     }

     public ngOnInit() {
          this.message.emit(this.msg);
     }

     public ngOnDestroy() {
          this.sub$.unsubscribe();
     }
}
