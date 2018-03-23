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

    public swarmInit() : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/swarm/init", "POST", '{"ListenAddr":"0.0.0.0"}')
                .then(result => {
                    resolve(result);
                })
                .catch(result => error(result));
        });
    }

    public leaveSwarm() : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/swarm/leave?force=true", "POST", "")
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }
}