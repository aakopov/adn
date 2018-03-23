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

    public createNetwork(newNetwork: any) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/networks/create", "POST", JSON.stringify(newNetwork))
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }

    public deleteNetwork(netId: string) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/networks/${netId}`, "DELETE", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }
}