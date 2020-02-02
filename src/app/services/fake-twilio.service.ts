import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ITwilioService, TwilioResponse } from "../interfaces";

@Injectable({
     providedIn: "root"
})
export class FakeTwilioService implements ITwilioService {
     public send(message: string, phone: string): Observable<TwilioResponse> {
          console.log(phone, message);
          if (Math.random() < 0.2) {
               return of({
                    error_code: 500,
                    error_message: "FAIL"
               });
          } else {
               return of({
                    message_sid: "1234",
                    status: "OK",
                    to: "12345678",
                    body: "body",
                    error_code: null,
                    error_message: null
               });
          }
     }
}
