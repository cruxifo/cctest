import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { ITwilioService, TwilioResponse } from "../interfaces";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
     providedIn: "root"
})
export class TwilioService implements ITwilioService {
     constructor(private http: HttpClient) {}
     public send(message: string, to: string): Observable<TwilioResponse> {
          console.log(to, message);

          return this.http
               .post<TwilioResponse>("/sms/send", { to, message })
               .pipe(
                    catchError(e => {
                         console.error(e);
                         return of({
                              error_code: 500,
                              error_message: e
                         });
                    })
               );
     }
}
