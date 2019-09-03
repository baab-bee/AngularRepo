import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Frame } from './models/frame.model';
import { catchError } from 'rxjs/operators';
import { FrameRequest } from '../process-frame-request/models/frame.request.model';

@Injectable()
export class FrameService {

    private frameUrl = environment.baseUrl + 'frames';
    private matchFrameUrl = environment.baseUrl + 'frame/matchframe';
    private frameRequestUrl = environment.baseUrl + 'frameRequests'
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(private http: HttpClient) {

    }
    findAll() :Observable<Frame>{
        return this.http.get<Frame>(this.frameUrl, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
        };

    updateStatus(requestBody): Observable<FrameRequest> {
            return this.http.patch<FrameRequest>(this.frameRequestUrl+'/'+requestBody.id, requestBody, this.httpOptions)
                .pipe(catchError(this.handleError));
    }; 
         // POST /donorRequest Rest API
    matchFrameRequest(frameRequest): Observable<Frame> {
        return this.http.post<FrameRequest>(this.matchFrameUrl, frameRequest, this.httpOptions)
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