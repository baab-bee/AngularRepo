
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { DonorRequest } from './models/donor.request.model';

@Injectable()
export class DonRequestService {
    private userRequestUrl = environment.baseUrl + 'donorRequests';
    constructor(private http: HttpClient, private logger: NGXLogger) {
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    // POST /donorRequest Rest API
    createDonRequest(donRequest): Observable<DonorRequest> {
        return this.http.post<DonorRequest>(this.userRequestUrl, donRequest, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

     handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
                if(error.status == 0){
                    errorMessage = "Please try again after sometimes. Check the Http Response"
                } else {
            // Get server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
        }
        window.alert(errorMessage);
        // return an observable with a user-facing error message
        return throwError(errorMessage);
    };
}