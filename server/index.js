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

app.get('/',(req,res)=>{
    res.send('server')
})
app.post('/input', (req, res) => {
    // const formData = req.body;
    console.log('Received form data:', req.body);
    cityName=req.body["Cityname"]
    currentCityName = cityName;

  });
app.get('/data', async (req, res) => {
    const cityName = currentCityName;
    const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    const geoResponse = await axios.get(geoLocationUrl)
    const {lat,lon} =geoResponse.data[0]

    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    const currentResponse = await axios.get(weatherUrl)
    const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${apiKey}`
    const forecastResponse = await axios.get(forecastUrl)
    const airPollutionUrl= `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
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