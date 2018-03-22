import { SocketService } from './socket.service';

export class ImageService {
    constructor(private socketService : SocketService){}

    public getImages(all : boolean) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/images/json?all=${all}`, "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}