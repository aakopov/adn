import { SocketService } from './socket.service';

export class SystemService {
    constructor(private socketService : SocketService){}

    public getInfo() : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/info", "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}