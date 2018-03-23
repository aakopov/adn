import { SocketService } from './socket.service';

export class ServiceService {
    constructor(private socketService : SocketService){}

    public getServices() : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/services", "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }

    public deleteService(serviceId: string) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/services/${serviceId}`, "DELETE", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }

    public createService(newService: any) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/services/create", "POST", JSON.stringify(newService))
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}