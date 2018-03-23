import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { ImageService } from '../../service/image.service';

@Component({
    templateUrl: "./service.component.html"
})
export class ServiceComponent implements OnInit {
    services: {}[];
    images: {}[];

    newService = new NewService();

    constructor(private serviceService: ServiceService,
        private imageService: ImageService){}

    ngOnInit(){
        this.getServices();
        this.getImages();
    }

    private getServices(){
        this.serviceService.get()
            .subscribe(services => this.services = services);
    }

    private getImages(){
        this.imageService.get()
            .subscribe(images => this.images = images);
    }

    private deleteService(serviceId: string){
        this.serviceService.delete(serviceId)
            .subscribe(result => this.getServices());
    }

    createService(){
        this.serviceService.create(`{
            "Name":"${this.newService.name}",
            "TaskTemplate":{
                "ContainerSpec":{
                    "Image":"${this.newService.image}"
                }
            },
            "EndpointSpec":{
                "Ports":[{
                    "PublishedPort":${this.newService.hostPort},
                    "TargetPort":${this.newService.containerPort}
                }]
            }
        }`)
            .subscribe(result => {
                this.newService = new NewService();
                this.getServices()
            });
    }
}

export class NewService {
    name : string;
    image: string;
    hostPort: string;
    containerPort: string;

    constructor(){
        this.name = "";
        this.image = "";
        this.hostPort = "";
        this.containerPort = "";
    }
}