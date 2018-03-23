import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/system";
    }

    info() : Observable<{}> {
        return this.http.get<{}>(this.serviceUrl + "/info");
    }

    swarmInit() : Observable<string> {
        return this.http.post<string>(this.serviceUrl + "/swarm/init", "", this.httpOptions);
    }

    leaveSwarm() : Observable<boolean> {
        return this.http.post<boolean>(this.serviceUrl + "/swarm/leave", "", this.httpOptions);
    }
}