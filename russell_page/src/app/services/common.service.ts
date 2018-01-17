import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class CommonService {

  public prefix: string = 'http://localhost:5000/1.0';

  constructor(private http: HttpClient) {
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }

  login(data: any): any {
    return this.http.post<any>(this.prefix + '/common/login', data);
  }
}
