import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../service/network.service';

@Component({
    templateUrl: "./network.component.html"
})
export class NetworkComponent {
    networks:{}[]

    constructor(private networkService : NetworkService){}

    ngOnInit(){
        this.getNetworks();
    }

    getNetworks(){
        this.networkService.get()
            .subscribe(networks => this.networks = networks);
    }
}