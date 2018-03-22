import { SocketService } from './socket.service';

export class NetworkService {
    constructor(private socketService : SocketService){}

    public getNetworks(): Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/networks", "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}