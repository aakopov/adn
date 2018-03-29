import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VolumeService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/volume";
    }

    get(): Observable<{}> {
        return this.http.get<{}>(this.serviceUrl);
    }

    create(newVolume) : Observable<{}> {
        return this.http.post<{}>(this.serviceUrl, newVolume, this.httpOptions);
    }

    delete(name: string, force: boolean) : Observable<boolean> {
        return this.http.delete<boolean>(`${this.serviceUrl}?name=${name}&force=${force}`);
    }
}