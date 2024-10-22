import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import weather from '../../assest/werther/sun.png'
import { useState, useEffect } from 'react';
import axios from 'axios';



function Main() {
    let weatherimg = weather;  


    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [time, setTime] = useState(new Date());
    const [temp,setTemp] = useState('0');
    const [sky,setSky] = useState('0');
    const [city,setCity] = useState('')
    const [name,setName] = useState('')
    const [roomtemp,setRoomtemp] =useState('')
    const [htemp,setHtemp] = useState('')
    const [ltemp,setLtemp] = useState('')
    const [atemp,setAtemp] = useState('')
    const [airPollution,setAirpol] = useState('')
    const [wind,setWind] = useState('')
    const [humidity,setHumidity] = useState('')
    const [pressure,setPressure] = useState('')
    const [uvIndex,setUVindex] = useState('3')
    const [apiUpdate,setApiupdate] = useState('')
    const [nh3,setnh3]=useState('')
    const [nh,setnh]=useState()

    useEffect(() => {
        axios.get("/data")
        .then((response)=>{
            console.log("api front line 15",response.data)
            update(response)// update is a function 
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    function update(response){
        const api=response.data
        setTemp((parseInt(api.main.temp)-273))
        setSky(api.weather[0].main)
        setName(api.name)
        setRoomtemp(parseInt(api.main.feels_like)-273)
        setHtemp(parseInt(api.main.temp_max)-273)
        setLtemp(parseInt(api.main.temp_min)-273)
        setAtemp(((parseInt(api.main.temp_max)-273)+(parseInt(api.main.temp_min)-273))/2)
        setWind(api.wind.speed)
        setHumidity(api.main.humidity)
        setPressure(api.main.pressure)
        setApiupdate((Math.floor(new Date().getTime() / 1000)-(parseInt(api.dt))))
        setnh3(api.list[0].components.nh3)
        setnh(api.list[0].components.no)
        setAirpol(api.list[0].main.aqi)
        setUVindex('4')
    }

    function handleform(e){
        e.preventDefault()
        apicall(city)
    }
    function apicall(Cityname){
    axios.post('/input',{Cityname}).then((response)=>(
        console.log("sent city name")
    )).catch((error)=>{
        console.error('Error submitting City Name:', error)
    })
   }
    function clickHandle(city){
      apicall(city)
    }

    useEffect(() => {
        const dates = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setDate(dates.getDate())
        setDay((weekday[dates.getDay()]).toUpperCase())
        setMonth(dates.toLocaleString('default', { month: "short" }))
        const interval = setInterval(() => (
            setTime(new Date())
        ), 1000);

        return () => {
            clearInterval(interval);
        };
    },[])

    return (
        <>
            <div className="w-[90%] m-auto rounded-[40px] glass">
                <div className='flex flex-col md:flex-row justifiy-between'>
                    <div className='outborder w-[25%] p-6 flex flex-row md:flex-col px-10 '>
                        <form onSubmit={handleform}>
                            <div className='w-full flex items-center search_border mb-5'>
                                <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='lg' className='pb-2' />
                                <input value={city} onChange={(e)=>(setCity(e.target.value))} className='w-full placeholder:italic placeholder:text-white bg-transparent outline-none text-gray-100 text-[12px] pl-5' type='text' placeholder='Search City' />
                                <button><FontAwesomeIcon icon={faMagnifyingGlass} className='font33 pb-1' /></button>

                            </div>
                        </form>
                        <div className=' w-[100%]'>
                            <img src={weatherimg} width="100%" alt=''></img>
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
                                <p className='text-[12px] py-3 pl-2 text-gray-700'>The Weather App provides real-time weather information for various locations worldwide me weather information for various locations worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[75%] p-6 '>
                        <div className='flex flex-col'>
                            <div className='mb-5 flex flex-row justify-between'>
                                <div className=''>
                                    <span className='text-lg'>{name}</span>
                                </div>
                                <div className='font-extralight text-sm'>
                                    lastupdate {apiUpdate}sec
                                </div>
                                <div className='convert flex gap-3'>
                                    <button className='active rounded-[50%] px-[4px] py-[2px] pr-[7px]'><span className=''>°C</span></button>
                                    <button className=' rounded-[50%] px-[6px] py-[2px] pr-[7px]'><span className=''>°F</span></button>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-wrap py-4 gap-4 '>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Temprature</p>
                                        <div className='flex flex-row gap-3 place-content-center'>
                                            <p className='font-thin text-[12px]'>High <p>{htemp}°</p></p>
                                            <p className='font-thin text-[10px] '>Average <p className='font-normal text-[35px]'>{atemp}°</p></p>
                                            <p className='font-thin text-[12px]'>Low <p>{ltemp}°</p></p>
                                        </div>
                                    </div>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Feels Like</p>
                                        <div className=''>
                                            <p className='font-normal text-[35px]'>{roomtemp}°</p>
                                        </div>
                                    </div>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
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
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <div className='flex flex-wrap gap-2 gap-y-4'>
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
                                    <div className='flex w-[50%] h-[25vh] flex-col glass rounded-xl p-2'>
                                        <h4 className='text-center font-lighter text-red-500 pb-2'>Alerts</h4>
                                        <p className='alert_border px-1'>Snow very fast compare</p>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-[00px]'>

                            </div>
                            <div className=''>
                                <div className='flex flex-row justify-evenly'>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Mumbai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Mumbai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Delhi"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Delhi</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Bangalore"))}><div className='p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Bangalore</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Chennai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Chennai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Kolkata"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Kolkata</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={()=>(clickHandle("Hyderabad"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Hyderabad</p>
                                    </div></button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Main;