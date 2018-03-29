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

    public createVolume(newVolume: any) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket("/volumes/create", "POST", JSON.stringify(newVolume))
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }

    public deleteVolume(name: string, force: boolean) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/volumes/${name}?force=${force}`, "DELETE", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }
}