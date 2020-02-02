import { Observable } from "rxjs";

export interface Record {
     name: string;
     phone: string;
     valid: boolean;
     duplicate: boolean;
     sent: boolean;
     status: RecordStatus;
     errorCode: number;
     errorMessage: string;
}

export type RecordStatus = "PENDING" | "OK" | "ERROR" | "N/A";

export interface ITwilioService {
     send: (message: string, phone: string) => Observable<TwilioResponse>;
}

export interface TwilioRequest {
     to: string;
     message: string;
}

export interface TwilioResponse {
     message_sid?: string;
     status?: string;
     to?: string;
     body?: string;
     error_code: number;
     error_message: string;
}

/*
{
     "body": "28:32:48:32:5a:0b:3e:b8:9f:04:64:86:20:7b:98:48",
     "error_code": null,
     "error_message": null,
     "message_sid": "SMc1bbe4de0bb94f7888fd70f35b35595d",
     "status": "queued",
     "to": "+447931726105"
   }
{
  "error_code": 21606,
  "error_message": "The From phone number +441133207256 is not a valid, SMS-capable inbound phone number or short code for your account."
}


*/
