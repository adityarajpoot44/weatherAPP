import axios from 'axios';
import weather from '../../assest/werther/sun.png'
import { weatherimg, coverimg } from '../../assest/img';




export function Air(num) {
    switch (num) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
    }
}

export function getDirection(angle) {
    let directions = ["N", "NNE", "NE", "ENE", "E",
        "ESE", "SE", "SSE", "S",
        "SSW", "SW", "WSW", "W",
        "WNW", "NW", "NNW"];
    let section = parseInt(angle / 22.5 + 0.5);
    section = section % 16;

    return directions[section];
}


export function WeImg(main) {
    switch (main) {
        case "clear":
            return weatherimg["sun"];
        case "clouds":
            return weatherimg["sun_cloud"];
        case "scattered clouds":
            return weatherimg["cloud"];
        case "shower rain":
            return weatherimg["sun_cloudrain"];
        case "Rain":
            return weatherimg["rain_rain"];
        case "thunderstorm":
            return weatherimg["thunder"];
        case "snow":
            return weatherimg["snowflake"];
        case "Haze":
            return weatherimg["mist"];
        case "fog":
            return weatherimg["mist"];
        case "Mist":
            return weatherimg["mist"];


    }

}

export function Threshold() {

}