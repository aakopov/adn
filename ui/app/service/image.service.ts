import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/image";
    }

    get(): Observable<{}[]> {
        return this.http.get<{}[]>(this.serviceUrl);
    }

    create(imageName: string, tag: string): Observable<boolean> {
        return this.http.post<boolean>(this.serviceUrl + "/create?imageName=" + imageName + "&tag=" + tag, "");
    }
}