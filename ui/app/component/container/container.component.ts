import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../service/container.service';
import { ImageService } from '../../service/image.service';

@Component({
    templateUrl: "./container.component.html"
})
export class ContainerComponent implements OnInit {
    containers : {}[];
    images: {}[];
    newContainer: NewContainer = new NewContainer();

    constructor(private containerService: ContainerService,
        private imageService: ImageService){}

    ngOnInit(){
        this.getContainers();
        this.getImages();
    }

    private getContainers(){
        this.containerService.get()
            .subscribe(containers => this.containers = containers);
    }

    private getImages(){
        this.imageService.get()
            .subscribe(images => this.images = images);
    }
    
    private deleteContainer(containerId: string){
        this.containerService.delete(containerId)
            .subscribe(result => {
                this.getContainers();
            });
    }

    private stopContainer(containerId: string){
        this.containerService.stop(containerId)
            .subscribe(result => {
                this.getContainers();
            });
    }

    private startContainer(containerId: string){
        this.containerService.start(containerId)
            .subscribe(reuslt => {
                this.getContainers();
            });
    }

    createContainer(){
        this.containerService.create(this.newContainer.name, 
            `{
                "Image":"${this.newContainer.image}",
                "HostConfig":{
                    "PortBindings":{
                        "${this.newContainer.containerPort}/tcp":[
                            {
                                "HostPort":"${this.newContainer.hostPort}"
                            }
                        ]
                    }
                }
            }`)
            .subscribe(result => {
                this.newContainer = new NewContainer();
                this.getContainers();
            });
    }
}
export class NewContainer{
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