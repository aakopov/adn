import { SocketService } from './socket.service';

export class VolumeService {
    constructor(private socketService : SocketService){}

    public getVolumes() : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/volumes", "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}