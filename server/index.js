const express = require('express');
const axios = require('axios');
const { Axios } = require('axios');
const dotenv= require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const apiKey = process.env.WEATHER_API_KEY;
let currentCityName = 'Aligarh';
let unit = "metric"

app.post('/input', (req, res) => {

    console.log('Received form data:', req.body);
    console.log(req.body)
    let temp=req.body["Cityname"]
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${temp}&limit=1&appid=${apiKey}`)
    .then(()=>(
        currentCityName=req.body["Cityname"]
    )).catch((error)=>(
        console.log(error),
        currentCityName="Aligarh"
    ))
    unit=req.body["unit"]

  });
app.get('/data', async (req, res) => {
    const cityName = currentCityName;
    const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    const geoResponse = await axios.get(geoLocationUrl)
    const {lat,lon} =geoResponse.data[0]
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`
    const currentResponse = await axios.get(weatherUrl)
    const airPollutionUrl= `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
    const airResponse = await axios.get(airPollutionUrl)

    // res.send(airResponse.data)
    const apidata={
        ...currentResponse.data,
        ...airResponse.data
    }
    res.send(apidata)
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});