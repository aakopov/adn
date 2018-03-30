import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { ImageService } from '../../service/image.service';
import { VolumeService } from '../../service/volume.service';

@Component({
    templateUrl: "./service.component.html"
})
export class ServiceComponent implements OnInit {
    services: {}[];
    images: {}[];
    volumes: {}[];

    newService = new NewService();

    constructor(private serviceService: ServiceService,
        private imageService: ImageService,
        private volumeService: VolumeService){}

    ngOnInit(){
        this.getServices();
        this.getImages();
        this.getVolumes();
    }

    private getServices(){
        this.serviceService.get()
            .subscribe(services => this.services = services);
    }

    private getImages(){
        this.imageService.get()
            .subscribe(images => {
                this.images = images;
                this.newService.image = this.images[0]["RepoTags"][0] as string;
            });
    }

    getVolumes(){
        this.volumeService.get()
            .subscribe(volumes => {
                this.volumes = volumes["Volumes"];
            });
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
                    "Image":"${this.newService.image}",
                    "Mounts":[
                        ${this.buildMounts()}
                    ]
                }
            },
            "EndpointSpec":{
                "Ports":[
                    ${this.buildPorts()}
                ]
            }
        }`)
            .subscribe(result => {
                this.newService = new NewService();
                this.getServices()
            });
    }

    buildMounts(): string {
        var mounts: string = "";
        if(this.newService.mountVolume){
            mounts = `{
                "Source":"${this.newService.mountVolume}",
                "Target":"${this.newService.volumeTarget}",
                "Type":"volume"
            }`;
        }
        if(this.newService.mountDir){
            if(mounts){
                mounts += ",";
            }
            mounts += `{
                "Source":"${this.newService.mountDir}",
                "Target":"${this.newService.dirTarget}",
                "Type":"bind"
            }`;
        }

        return mounts;
    }

    buildPorts(): string {
        var ports: string = "";
        if(this.newService.containerPort){
            ports = `{
                "PublishedPort":${this.newService.hostPort},
                "TargetPort":${this.newService.containerPort}
            }`
        }
        return ports;
    }
}

export class NewService {
    name : string;
    image: string;
    hostPort: string;
    containerPort: string;
    mountVolume: string;
    volumeTarget: string;
    mountDir: string;
    dirTarget: string;

    constructor(){
        this.name = "";
        this.image = "";
        this.hostPort = "";
        this.containerPort = "";
        this.mountVolume = "";
        this.volumeTarget = "";
        this.mountDir = "";
        this.dirTarget = "";
    }
}