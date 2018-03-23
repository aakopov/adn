import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContainerService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/container";
    }

    get(): Observable<{}[]> {
        return this.http.get<{}[]>(this.serviceUrl);
    }

    delete(containerId: string): Observable<boolean> {
        return this.http.delete<boolean>(this.serviceUrl + "?id=" + containerId);
    }

    stop(containerId: string): Observable<boolean> {
        return this.http.post<boolean>(this.serviceUrl + "/stop?id=" + containerId, "");
    }

    start(containerId: string): Observable<boolean> {
        return this.http.post<boolean>(this.serviceUrl + "/start?id=" + containerId, "");
    }

    create(name: string, config: string): Observable<{}> {
        return this.http.post<{}>(this.serviceUrl + "?name=" + name, config, this.httpOptions);
    }
}