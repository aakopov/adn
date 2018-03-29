import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { ImageController } from './controller/image.controller';
import { ContainerController } from './controller/container.controller';
import { SystemController } from './controller/system.controller';
import { NetworkController } from './controller/network.controller';
import { ServiceController } from './controller/service.controller';
import { VolumeController } from './controller/volume.controller';

import { ImageService } from './docker/image.service';
import { ContainerService } from './docker/container.service';
import { SystemService } from './docker/system.service';
import { NetworkService } from './docker/network.service';
import { ServiceService } from './docker/service.service';
import { VolumeService } from './docker/volume.service';
import { SocketService } from './docker/socket.service';

export class Application {
    private readonly expressApplication;
    private readonly socketService;
    constructor(port: string, socketPath: string){
        this.expressApplication = express();
        this.socketService = new SocketService(socketPath);
        this.expressApplication.set("port", port);
        this.configure();
    }

    private configure() : void {
        this.expressApplication.use("/", express.static(path.join(__dirname, "../ui")));
        this.expressApplication.use(bodyParser.json());
        this.expressApplication.use(bodyParser.urlencoded({ extended: false }));
        var router = express.Router();

        var imageController = new ImageController(new ImageService(this.socketService));
        router.route("/image").get(imageController.list);
        router.route("/image/create").post(imageController.create);

        var containerController = new ContainerController(new ContainerService(this.socketService));
        router.route("/container").get(containerController.list);
        router.route("/container").delete(containerController.delete);
        router.route("/container/stop").post(containerController.stop);
        router.route("/container/start").post(containerController.start);
        router.route("/container").post(containerController.create);

        var systemController = new SystemController(new SystemService(this.socketService));
        router.route("/system/info").get(systemController.info);
        router.route("/system/swarm/init").post(systemController.swarmInit);
        router.route("/system/swarm/leave").post(systemController.leaveSwarm);

        var networkController = new NetworkController(new NetworkService(this.socketService));
        router.route("/network").get(networkController.list);
        router.route("/network").post(networkController.create);
        router.route("/network").delete(networkController.delete);

        var serviceController = new ServiceController(new ServiceService(this.socketService));
        router.route("/service").get(serviceController.list);
        router.route("/service").delete(serviceController.delete);
        router.route("/service").post(serviceController.create);

        var volumeController = new VolumeController(new VolumeService(this.socketService));
        router.route("/volume").get(volumeController.list);

        this.expressApplication.use("/api", router);

        this.expressApplication.get('/*', (request, response) => {
            response.sendFile(path.join(__dirname, '../ui/index.html'));
        });
    }

    public start(): void {
        this.expressApplication.listen(this.expressApplication.get("port"), () =>{
            console.log(`Express server started at port ${this.expressApplication.get("port")}`);
        });
    }
}