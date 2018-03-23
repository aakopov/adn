import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../service/network.service';

@Component({
    templateUrl: "./network.component.html"
})
export class NetworkComponent {
    networks:{}[]
    newNetwork : NewNetwork = new NewNetwork();
    drivers = [
        "overlay",
        "bridge"
    ];

    constructor(private networkService : NetworkService){}

    ngOnInit(){
        this.getNetworks();
    }

    getNetworks(){
        this.networkService.get()
            .subscribe(networks => this.networks = networks);
    }

    createNetwork(){
        this.networkService.create(`{
            "Name":"${this.newNetwork.name}",
            "Driver":"${this.newNetwork.driver}",
            "IPAM":{
                "Config":[
                    {
                        "Subnet":"${this.newNetwork.subnet}"
                    }
                ]
            }
        }`)
        .subscribe(result => {
            this.newNetwork = new NewNetwork();
            this.getNetworks();
        });
    }

    deleteNetwork(netId : string){
        this.networkService.delete(netId)
            .subscribe(result => {
                this.getNetworks();
            });
    }
}

export class NewNetwork {
    name: string;
    driver: string;
    subnet: string;

    constructor(){
        this.name = "";
        this.driver = "";
        this.subnet = "";
    }
}