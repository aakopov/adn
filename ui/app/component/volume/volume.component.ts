import { Component, OnInit } from '@angular/core';
import { VolumeService } from '../../service/volume.service';

@Component({
    templateUrl: "./volume.component.html"
})
export class VolumeComponent {
    volumes:{}[]
    newVolume : NewVolume = new NewVolume();
    drivers = [
        "local"
    ];

    constructor(private volumeService : VolumeService){}

    ngOnInit(){
        this.getVolumes();
    }

    getVolumes(){
        this.volumeService.get()
            .subscribe(volumes => this.volumes = volumes["Volumes"]);
    }

    createVolume(){
        this.volumeService.create(`{
            "Name":"${this.newVolume.name}",
            "Driver":"local"
        }`)
            .subscribe(result => {
                this.getVolumes();
                this.newVolume = new NewVolume();
            })
    }

    deleteNetwork(name: string){
        this.volumeService.delete(name, false)
            .subscribe(result => {
                this.getVolumes();
            })
    }
}

export class NewVolume {
    name: string;

    constructor(){
        this.name = "";
    }
}