import { SocketService } from './socket.service';

export class ContainerService {
    constructor(private socketService : SocketService){}

    public getContainers(all: boolean) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/containers/json?all=${all}`, "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }

    public removeContainer(containerId: string) : Promise<string> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/containers/${containerId}`, "DELETE", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }

    public stopContainer(containerId: string) : Promise<string> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/containers/${containerId}/stop`, "POST", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }

    public startContainer(containerId: string) : Promise<string> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/containers/${containerId}/start`, "POST", null)
                .then(result => {
                    resolve("true");
                })
                .catch(result => error(result));
        });
    }

    public createContainer(name: string, newContainer: any) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/containers/create?name=${name}`, "POST", JSON.stringify(newContainer))
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}