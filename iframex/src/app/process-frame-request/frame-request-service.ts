
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FrameRequest } from './models/frame.request.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FrameRequestService {
    private frameRequestUrl = environment.baseUrl + 'frameRequests/search?status=FRAME_REQ_INITAITED';

    constructor(private http: HttpClient) {

    }

    findAll() :Observable<FrameRequest>{
        return this.http.get<FrameRequest>(this.frameRequestUrl, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
        .pipe(catchError(this.handleError));
        };

        
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
