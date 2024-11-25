
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Air,getDirection,WeImg,backcoverImg } from './component/main/function';
import { DateTime } from './component/main/Datetime';


const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  console.log("outer fun")
  const [temp, setTemp] = useState('0');
  const [sky, setSky] = useState('0');
  const [city, setCity] = useState('Aligarh')
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
  const [nh, setnh] = useState(null)
  const [dis,setDis]=useState(null)
  const [degree,setDegree] =useState()
  const [currentweatherimg, setWeatherimg] = useState('')
  const [unit,setUnit] = useState('metric')
  const [mumbai,setmumbai]=useState(null);
  const [delhi,setdelhi]=useState(null);
  const [Chennai,setChennai]=useState(null);
  const [Bangalore,setBangalore]=useState(null);
  const [Hyderabad,setHyderabad]=useState(null);
  const [Kolkata,setKolkata]=useState(null);
  const [backImg,setback]=useState(null);
  const textInputRef = useRef(null);
  const coverImg = useRef();

  function update(response) {
      const api = response
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
      setback(backcoverImg(api.weather[0].main))

  }
  async function apiCall(city){

      const geoLocationUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      const geoResponse = await axios.get(geoLocationUrl)
      const {lat,lon} =geoResponse.data[0]

      const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      const currentResponse = await axios.get(weatherUrl)

      const airPollutionUrl= `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
      const airResponse = await axios.get(airPollutionUrl)

      const apidata={
          ...currentResponse.data,
          ...airResponse.data
      }
      update(apidata)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=${unit}&appid=${apiKey}`).then((data)=>(setmumbai(parseInt(data.data.main.temp))))
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=delhi&units=${unit}&appid=${apiKey}`).then((data)=>(setdelhi(parseInt(data.data.main.temp))))
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Bangalore&units=${unit}&appid=${apiKey}`).then((data)=>(setBangalore(parseInt(data.data.main.temp))))
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Chennai&units=${unit}&appid=${apiKey}`).then((data)=>(setChennai(parseInt(data.data.main.temp))))
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=${unit}&appid=${apiKey}`).then((data)=>(setKolkata(parseInt(data.data.main.temp))))
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=${unit}&appid=${apiKey}`).then((data)=>(setHyderabad(parseInt(data.data.main.temp))))
  }

  useEffect(()=>{
      apiCall(city)
  },[city,unit])

  useEffect(()=>{
    if (coverImg.current) {
      coverImg.current.style.backgroundImage = `url("${backImg}")`
  }
      const updateTimer=setTimeout(() => {
          apiCall(city)
      }, 1000*1*30);
      return ()=>clearInterval(updateTimer)
  })
  function converter() {
      var checkBox = document.getElementById("myCheck");
      (checkBox.checked? setUnit("imperial") : setUnit("metric"))
  }
  function handleform(e) {
      e.preventDefault()
      const enteredText = textInputRef.current.value;
      setCity(enteredText)
  }
  return (
    <div ref={coverImg} className={`coverimg h-[100vh] relative content-center`}>
     <div className="w-[90%] m-auto my-[42px] rounded-[40px] glass ">
                <div className='flex w-full flex-col md:flex-row justifiy-between'>
                    <div className='outborder w-full md:w-[325px] p-6 flex flex-col px-10 '>
                        <form onSubmit={handleform}>
                            <div className='w-full flex items-center search_border mb-5'>
                                <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='lg' className='pb-2' />
                                <input ref={textInputRef} className='w-full placeholder:italic placeholder:text-white bg-transparent outline-none text-gray-100 text-[12px] pl-5' type='text' placeholder='Search City' />
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
                        <DateTime/>
                        <div className=' mt-7 tag'>
                                <h2 className='pt-2 pl-2'>{name} City</h2>
                                <p className='text-[12px] py-3 pl-2 text-gray-700'>{name} is currently experiencing {dis} with a temperature of {temp} °C.The humidity is {humidity}%. Winds are blowing from {degree} at {wind} km/h 
                                </p>
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
                                        <p className='alert_border px-1'></p>
                                    </div>
                                </div>
                            </div>
                            <div className='md:pt-[100px]'>

                            </div>
                                <div className='w-full flex flex-wrap justify-evenly'>
                                    <button className='cursor-pointer' onClick={() => (setCity("Mumbai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{mumbai}°</div>
                                        <p className='font-thin'>Mumbai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (setCity("Delhi"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{delhi}°</div>
                                        <p className='font-thin'>Delhi</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (setCity("Bangalore"))}><div className='p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{Bangalore}°</div>
                                        <p className='font-thin'>Bangalore</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (setCity("Chennai"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{Chennai}°</div>
                                        <p className='font-thin'>Chennai</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (setCity("Kolkata"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{Kolkata}°</div>
                                        <p className='font-thin'>Kolkata</p>
                                    </div></button>
                                    <button className='cursor-pointer' onClick={() => (setCity("Hyderabad"))}><div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>{Hyderabad}°</div>
                                        <p className='font-thin'>Hyderabad</p>
                                    </div></button>
                                </div>
                        </div>

                    </div>
                </div>
            </div >
    </div>
  );
}

export default App;
