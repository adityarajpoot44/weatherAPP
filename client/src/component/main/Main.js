import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Air,getDirection,WeImg,Threshold } from './function';



function Main() {

    
    
    // const backimg = document.querySelectorAll('.coverimg')
    // console.log(backimg)

    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [time, setTime] = useState(new Date());
    const [temp, setTemp] = useState('0');
    const [sky, setSky] = useState('0');
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [roomtemp, setRoomtemp] = useState('')
    const [htemp, setHtemp] = useState('')
    const [ltemp, setLtemp] = useState('')
    const [atemp, setAtemp] = useState('')
    const [airPollution, setAirpol] = useState('')
    const [wind, setWind] = useState('')
    const [humidity, setHumidity] = useState('')
    const [pressure, setPressure] = useState('')
    const [uvIndex, setUVindex] = useState('3')
    const [apiUpdate, setApiupdate] = useState('')
    const [nh3, setnh3] = useState('')
    const [nh, setnh] = useState()
    const [dis,setDis]=useState()
    const [degree,setDegree] =useState()
    const [currentweatherimg, setWeatherimg] = useState('')
    const [unit,setUnit] = useState('metric')
    const [alert2,setalert2] =useState('')

    function update(response) {
        const api = response.data
        setTemp((parseInt(api.main.temp)))
        setSky(api.weather[0].main)
        setName(api.name)
        setRoomtemp(parseInt(api.main.feels_like))
        setHtemp(parseInt(api.main.temp_max))
        setLtemp(parseInt(api.main.temp_min))
        setAtemp(((parseInt(api.main.temp_max)) + (parseInt(api.main.temp_min))) / 2)
        setWind(api.wind.speed)
        setHumidity(api.main.humidity)
        setPressure(api.main.pressure)
        setApiupdate((Math.floor(new Date().getTime() / 1000) - (parseInt(api.dt))))
        setnh3(api.list[0].components.nh3)
        setnh(api.list[0].components.no)
        setAirpol(Air(api.list[0].main.aqi))
        setUVindex('4')
        setDis(api.weather[0].description)
        setDegree(getDirection(api.wind.deg))
        setWeatherimg(WeImg(api.weather[0].main))

    }
     useEffect(() => {
        axios.get("/data")
        .then((response) => {
            console.log("api front line 15", response.data)
            update(response)// update is a function 
        }).catch((error) => {
            console.log(error)
        })
        const dates = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setDate(dates.getDate())
        setDay((weekday[dates.getDay()]).toUpperCase())
        setMonth(dates.toLocaleString('default', { month: "short" }))
        if(Threshold(temp)){
            setalert2("critical temprature")
        }
        const interval = setInterval(() => (
            setTime(new Date())
        ), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [converter,clickHandle])


    function converter() {
        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked === true){
             setUnit("imperial")
        }else{
    
            setUnit("metric")
        }
        console.log(unit)
        apicall(name,unit)
    }
    function handleform(e) {
        e.preventDefault()
        apicall(city,unit)
    }

    function clickHandle(city) {
        apicall(city,unit)
    }
    function apicall(Cityname,unit) {
        axios.post('/input', { Cityname,unit }).then((response) => (
            console.log("sent city name")
        )).catch((error) => {
            console.error('Error submitting City Name:', error)
        })
    }

   
    return (
        <>
            <div className="w-[90%] m-auto my-[42px] rounded-[40px] glass ">
                <div className='flex w-full flex-col md:flex-row justifiy-between'>
                    <div className='outborder w-full md:w-[325px] p-6 flex flex-col px-10 '>
                        <form onSubmit={handleform}>
                            <div className='w-full flex items-center search_border mb-5'>
                                <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='lg' className='pb-2' />
                                <input value={city} onChange={(e) => (setCity(e.target.value))} className='w-full placeholder:italic placeholder:text-white bg-transparent outline-none text-gray-100 text-[12px] pl-5' type='text' placeholder='Search City' />
                                <button><FontAwesomeIcon icon={faMagnifyingGlass} className='font33 pb-1' /></button>

                            </div>
                        </form>
                        <div className=' w-[30vh] h-[30vh] m-auto'>
                            <img src={currentweatherimg} width="100%" alt=''></img>
                        </div>
                        <div className='relative'>
                            <span className='text-[100px] font-thin'>{temp}°</span>
                            <span className='absolute right-5 top-10 text-[11px] tag'>{sky}</span>
                        </div>
                        <div className=''>
                            <p className='text-[15px]'><span>{date}, </span>
                                <span>{month}</span>
                            </p>
                            <div className='flex gap-2 text-[25px]'>
                                <span className='text-black'>{day},</span>
                                <span>{time.toLocaleTimeString()}</span>
                            </div>
                            <div className=' mt-7 tag'>
                                <h2 className='pt-2 pl-2'>{name} City</h2>
                                <p className='text-[12px] py-3 pl-2 text-gray-700'>{name} is currently experiencing {dis} with a temperature of {temp} °C.The humidity is {humidity}%. Winds are blowing from {degree} at {wind} km/h 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='p-6'>
                        <div className=''>
                            <div className='mb-5 flex flex-row justify-between'>
                                <div className=''>
                                    <span className='text-lg'>{name}</span>
                                </div>
                                <div className='font-extralight text-sm'>
                                    {apiUpdate}s ago
                                </div>
                                <div className='convert flex'>
                                <button><span className=''>°C</span></button>

                                    <label class="switch">
                                        <input id="myCheck" type="checkbox" onChange={converter}/>
                                            <span class="slider round"></span> 
                                    </label>
                                    <button><span className=''>°F</span></button>
                                </div>
                            </div>
                            <div>
                                <div className='flex  flex-wrap py-4 gap-3 justify-evenly'>
                                    <div className='border w-full md:w-fit rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Temprature</p>
                                        <div className='flex flex-row gap-3 place-content-evenly'>
                                            <p className='font-thin text-[12px]'>High <p>{htemp}°</p></p>
                                            <p className='font-thin text-[10px] '>Average <p className='font-normal text-[35px]'>{atemp}°</p></p>
                                            <p className='font-thin text-[12px]'>Low <p>{ltemp}°</p></p>
                                        </div>
                                    </div>
                                    <div className='border w-full md:w-fit rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Feels Like</p>
                                        <div className=''>
                                            <p className='font-normal text-[35px]'>{roomtemp}°</p>
                                        </div>
                                    </div>
                                    <div className='border w-full md:w-fit rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Air Pollution</p>
                                        <div className='flex flex-col gap-3 place-content-center'>
                                            <p className='font-thin text-[22px] '>{airPollution}</p>
                                            <div className='flex justify-between  text-[14px]'>
                                                <span className='font-thin place-content-center  flex flex-row'>
                                                    <div>NO:</div>
                                                    <div className='pl-2'>{nh}</div>
                                                </span>
                                                <span className='font-thin place-content-center flex flex-row'>
                                                    <div>NH<sub>3</sub>:</div>
                                                    <div className='pl-2'>{nh3}</div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border w-full md:w-fit rounded-xl p-4 text-center'>
                                        <div className='flex  flex-wrap gap-2 gap-y-4'>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight mb-2'>Wind</div>
                                                <div>{wind} <span className='text-gray-300'>Km/h</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>Humidity</div>
                                                <div>{humidity}<span className='text-gray-300'>%</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>Pressure</div>
                                                <div>{pressure}<span className='text-gray-300'>hpa</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>UV Index</div>
                                                <div>{uvIndex}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-full h-[25vh] flex-col glass rounded-xl p-2'>
                                        <h4 className='text-center font-lighter text-red-500 pb-2'>Alerts</h4>
                                        <p className='alert_border px-1'>{alert2}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='md:pt-[100px]'>

                            </div>
                                <div className='w-full flex flex-wrap justify-evenly'>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Mumbai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Mumbai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Delhi"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Delhi</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Bangalore"))}><div className='p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Bangalore</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Chennai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Chennai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Kolkata"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Kolkata</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (clickHandle("Hyderabad"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'></div>
                                        <p className='font-thin'>Hyderabad</p>
                                    </div></button>
                                </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Main;