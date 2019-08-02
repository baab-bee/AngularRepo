
import { Observable } from 'rxjs';
import { UserRequest } from '../donor-input/models/user.request.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserRequestService {
    private userRequestUrl = environment.baseUrl + 'donorRequests/search?status=initiated,processed';

    constructor(private http: HttpClient) {

    }

    findAll() :Observable<UserRequest>{
        return this.http.get<UserRequest>(this.userRequestUrl, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
        };
    }
