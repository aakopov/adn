import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { ImageService } from '../../service/image.service';
import { VolumeService } from '../../service/volume.service';
import { NetworkService } from '../../service/network.service';
import { TaskService } from '../../service/task.service';

@Component({
    templateUrl: "./service.component.html"
})
export class ServiceComponent implements OnInit {
    services: {}[];
    images: {}[];
    volumes: {}[];
    networks: {}[];

    newService = new NewService();

    constructor(private serviceService: ServiceService,
        private imageService: ImageService,
        private volumeService: VolumeService,
        private networkService: NetworkService,
        private taskService: TaskService){}

    ngOnInit(){
        this.getServices();
        this.getImages();
        this.getVolumes();
        this.getNetworks();
    }

    private getServices(){
        this.serviceService.get()
            .subscribe(services => {                
                this.services = services;
                for(let s of this.services){
                    this.taskService.listTasks(`{"service":{"${s["Spec"]["Name"]}":true}}`)
                        .subscribe(result => {
                            s["Status"] = result[0]["Status"];
                        });
                }                
            });
    }

    private getNetworks(){
        this.networkService.get()
            .subscribe(networks => this.networks = networks);
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
                    ],
                    "Env":[${this.buildVars()}]
                },
                "Networks": [${this.buildNetworks()}]
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

    buildNetworks(): string {
        if(this.newService.network){
            return `{
                "Target":"${this.newService.network}"
            }`
        }
        return "";
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

    buildVars(): string {
        var variables: string = "";
        for(let v of this.newService.envVars){
            if(variables){
                variables += ",";
            }
            if(v.name){
                variables += `"${v.name}=${v.value}"`;
            }            
        }

        return variables;
    }

    addVariable(){
        this.newService.envVars.push(new EnvironmentVariable());
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
    envVars: EnvironmentVariable[];
    network: string;

    constructor(){
        this.name = "";
        this.image = "";
        this.hostPort = "";
        this.containerPort = "";
        this.mountVolume = "";
        this.volumeTarget = "";
        this.mountDir = "";
        this.dirTarget = "";
        this.envVars = [new EnvironmentVariable()];
        this.network = "";
    }
}

export class EnvironmentVariable {
    name: string;
    value: string;

    constructor(){
        this.name = "";
        this.value = "";
    }
}