import { Component } from '@angular/core';
import axios from 'axios';

interface Player {
    first_name: string,
    h_in: number,
    h_meters: number,
    last_name: string,
    pair?: Player[]
}
interface Data {
    data: { values: Player[] },
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'test-machEight';
    nbaPlayers: any[];
    playersSort: Player[];
    displayedColumns: string[] = ['position', 'name'];
    h_in: number = 0;

    constructor() {
        axios.get('https://mach-eight.uc.r.appspot.com/').then(({ data }: Data) => {

            this.playersSort = data.values.sort((playerA: Player, playerB: Player) => playerA.h_in - playerB.h_in);

        });
    }

    getPairs() {
        console.log(new Date().getTime());
        let pairsPlayers = this.playersSort.map((player: Player) => {
            if (player.h_in * 2 > this.h_in)
                return false;

            let pairs = this.playersSort.filter((p: Player) => p.first_name != player.first_name && p.last_name != player.last_name && (Number(p.h_in) + Number(player.h_in)) == this.h_in);
            if (pairs.length == 0)
                return false;

            return { ...player, pairs };
        }).filter(Boolean);

        this.nbaPlayers = pairsPlayers;
        console.log(new Date().getTime());
    }
}
