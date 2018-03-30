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

    public createImage(imageName : string, tag : string) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/images/create?fromImage=${imageName}&tag=${tag}`, "POST", "")
                .then(result => {
                    console.log(result);
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }

    public removeImage(imageName: string, force: boolean) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/images/${imageName}?force=${force}`, "DELETE", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }
}