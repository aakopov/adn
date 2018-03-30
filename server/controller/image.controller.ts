import { Request, Response, NextFunction } from "express";
import { ImageService } from '../docker/image.service';

export class ImageController {
    constructor(private imageService: ImageService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.imageService.getImages(false)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    create = (request: Request, response: Response, next: NextFunction) => {
        this.imageService.createImage(request.query.imageName, request.query.tag)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }

    delete = (request: Request, response: Response, next: NextFunction) => {
        this.imageService.removeImage(request.query.imageName, request.query.force)
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}