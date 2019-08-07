import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Frame } from './models/frame.model';

@Injectable()
export class FrameService {

    private frameUrl = environment.baseUrl + 'frames';
    
    constructor(private http: HttpClient) {

    }
    findAll() :Observable<Frame>{
        return this.http.get<Frame>(this.frameUrl, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
        };
}