import { Request, Response, NextFunction } from "express";
import { VolumeService } from '../docker/volume.service';

export class VolumeController {
    constructor(private volumeService: VolumeService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.volumeService.getVolumes()
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    create = (request: Request, response: Response, next: NextFunction) => {
        this.volumeService.createVolume(request.body)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    delete = (request: Request, response: Response, next: NextFunction) => {
        this.volumeService.deleteVolume(request.query.name, request.query.force)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}