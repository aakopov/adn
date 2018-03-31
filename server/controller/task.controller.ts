import { Request, Response, NextFunction } from "express";
import { TaskService } from '../docker/task.service';

export class TaskController {
    constructor(private taskService: TaskService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.taskService.getTasksList(request.query.filters)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}