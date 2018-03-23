import { Request, Response, NextFunction } from "express";
import { ContainerService } from '../docker/container.service';

export class ContainerController {
    constructor(private containerService: ContainerService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.containerService.getContainers(true)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    delete = (request: Request, response: Response, next: NextFunction) => {
        this.containerService.removeContainer(request.query.id)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    stop = (request: Request, response: Response, next: NextFunction) => {
        this.containerService.stopContainer(request.query.id)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    start = (request: Request, response: Response, next: NextFunction) => {
        this.containerService.startContainer(request.query.id)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    create = (request: Request, response: Response, next: NextFunction) => {
        this.containerService.createContainer(request.query.name, request.body)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}