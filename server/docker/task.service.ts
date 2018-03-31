import { SocketService } from './socket.service';

export class TaskService {
    constructor(private socketService : SocketService){}

    public getTasksList(filters: string) : Promise<any> {
        return new Promise((resolve, error) => {
            this.socketService.invokeSocket(`/tasks?filters=${filters}`, "GET", null)
                .then(result => {
                    resolve(JSON.parse(result));
                })
                .catch(result => error(result));
        });
    }
}