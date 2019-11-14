import {Injectable} from '@angular/core';
import {IRocket} from './IRocket';
import {HttpClient} from '@angular/common/http';

const ROCKET_URL = 'https://api.spacexdata.com/v2/rockets';

@Injectable({
  providedIn: 'root'
})

export class RocketService {

  rockets: Array<IRocket>;
  isAvailable: boolean;

  constructor(private http: HttpClient) {
    this.isAvailable = false;
    this.rockets = [];
    this.getRocket();
  }

  getRocket() {
    this.http.get(ROCKET_URL).subscribe((rockets: Array<any>) => {
      for (let i = 0; i < rockets.length; i++) {
        const rocketFromJson = rockets[i];
        const rocket: IRocket = {} as IRocket;
        rocket.rocketId = rocketFromJson.rocketid;
        rocket.name = rocketFromJson.name;
        rocket.firstStageFuel = rocketFromJson.first_stage.fuel_amount_tons;
        rocket.secondStageFuel = rocketFromJson.second_stage.fuel_amount_tons;
        this.rockets.push(rocket);
      }
      this.isAvailable = true;
    });
  }
}
