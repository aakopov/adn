import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {
    private serviceUrl: string;
    constructor(private http: HttpClient){
        this.serviceUrl = "/api/system";
    }

    info() : Observable<{}> {
        return this.http.get<{}>(this.serviceUrl + "/info");
    }
}