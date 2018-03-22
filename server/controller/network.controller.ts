import { Request, Response, NextFunction } from "express";
import { NetworkService } from '../docker/network.service';

export class NetworkController {
    constructor(private networkService: NetworkService){}

    list = (request: Request, response: Response, next: NextFunction) => {
        this.networkService.getNetworks()
            .then(result => {
                response.send(result);
            })
            .catch(result => {
                console.log(result);
                response.sendStatus(500);
            });
    }
}