const express = require('express');
const axios = require('axios');
const { Axios } = require('axios');

const app = express();

const port = process.env.PORT || 3001;
const apiKey = '59ccdc0e6d25ad5bc6cd8d162304dbed';
let cityName='Aligarh'
let longitude,latitude
app.get('/',(req,res)=>{
    res.send('server')
})

app.get('/data', async (req, res) => {

    const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    const geoResponse = await axios.get(geoLocationUrl)
    const {name,lat,lon} =geoResponse.data[0]

    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    const currentResponse = await axios.get(weatherUrl)
    const forecastUrl= `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${apiKey}`
    const forecastResponse = await axios.get(forecastUrl)
    
    res.send(forecastResponse.data)
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});