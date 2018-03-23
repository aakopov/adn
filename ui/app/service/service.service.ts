import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/service";
    }

    get() : Observable<{}[]> {
        return this.http.get<{}[]>(this.serviceUrl);
    }

    delete(serviceId: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.serviceUrl + "?id=" + serviceId);        
    }

    create(config: string) : Observable<{}> {
        return this.http.post<{}>(this.serviceUrl, config, this.httpOptions);
    }
}