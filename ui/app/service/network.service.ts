import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/network";
    }

    get() : Observable<{}[]> {
        return this.http.get<{}[]>(this.serviceUrl);
    }

    create(newNet) : Observable<{}> {
        return this.http.post<{}>(this.serviceUrl, newNet, this.httpOptions);
    }

    delete(netId) : Observable<boolean> {
        return this.http.delete<boolean>(this.serviceUrl + "?id=" + netId);
    }
}