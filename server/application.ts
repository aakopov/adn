import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { ImageController } from './controller/image.controller';
import { ContainerController } from './controller/container.controller';
import { SystemController } from './controller/system.controller';

import { ImageService } from './docker/image.service';
import { ContainerService } from './docker/container.service';
import { SystemService } from './docker/system.service';
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

        var containerController = new ContainerController(new ContainerService(this.socketService));
        router.route("/container").get(containerController.list);
        router.route("/container/:id").delete(containerController.delete);
        router.route("/container/stop/:id").post(containerController.stop);
        router.route("/container/start/:id").post(containerController.start);
        router.route("/container/:name").post(containerController.create);

        var systemController = new SystemController(new SystemService(this.socketService));
        router.route("/system/info").get(systemController.info);

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