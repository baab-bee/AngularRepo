
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FrameRequest } from './models/frame.request.model';

@Injectable()
export class FrameRequestService {
    private frameRequestUrl = environment.baseUrl + 'frameRequests';

    constructor(private http: HttpClient) {

    }

    findAll() :Observable<FrameRequest>{
        return this.http.get<FrameRequest>(this.frameRequestUrl, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
        };
    }
