import { Request, Response, NextFunction } from "express";
import { ServiceService } from '../docker/service.service';

export class ServiceController {
    constructor(private serviceService: ServiceService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.serviceService.getServices()
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    delete = (request: Request, response: Response, next: NextFunction) => {
        this.serviceService.deleteService(request.query.id)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    create = (request: Request, response: Response, next: NextFunction) => {
        this.serviceService.createService(request.body)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}