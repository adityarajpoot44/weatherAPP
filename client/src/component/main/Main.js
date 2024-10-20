import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import weather from '../../assest/werther/sun.png'
// import { useState,useEffect } from 'react';



let weatherimg = weather;


function Main() {

    return (
        <>
            <div className="w-[90%] m-auto rounded-[40px] glass">
                <div className='flex flex-col md:flex-row justifiy-between'>
                    <div className='outborder w-[25%] p-6 flex flex-row md:flex-col px-10 '>
                        <form>
                            <div className='w-full flex items-center search_border mb-5'>
                                <FontAwesomeIcon icon={faTemperatureThreeQuarters} size='lg' className='pb-2' />
                                <input className='w-full placeholder:italic placeholder:text-white bg-transparent outline-none text-gray-600 text-[12px] pl-5' type='text' placeholder='Search City' />
                                <button><FontAwesomeIcon icon={faMagnifyingGlass} className='font33 pb-1' /></button>

                            </div>
                        </form>
                        <div className=' w-[100%]'>
                            <img src={weatherimg} width="100%" alt=''></img>
                        </div>
                        <div className='relative'>
                            <span className='text-[100px] font-thin'>12°</span>
                            <span className='absolute right-5 top-10 text-[11px] tag'>Rainy</span>
                        </div>
                        <div className=''>
                            <p className='text-[15px]'><span>20, </span>
                                <span>OCT</span>
                            </p>
                            <div className='flex gap-2 text-[25px]'>
                                <span className='text-black'>MONDAY,</span>
                                <span>00:00</span>
                            </div>
                            <div className=' mt-7 tag'>
                                <h2 className='pt-2 pl-2'>Aligarh City</h2>
                                <p className='text-[12px] py-3 pl-2 text-gray-700'>The Weather App provides real-time weather information for various locations worldwide me weather information for various locations worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[75%] p-6 '>
                        <div className='flex flex-col'>
                            <div className='mb-5 flex flex-row justify-between'>
                                <div className=''>
                                    <span className='text-lg'>Aligarh</span>
                                </div>
                                <div className='font-extralight text-sm'>
                                    lastupdate
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
                                            <p className='font-thin text-[12px]'>High <p>35°</p></p>
                                            <p className='font-thin text-[10px] '>Average <p className='font-normal text-[35px]'>35°</p></p>
                                            <p className='font-thin text-[12px]'>Low <p>35°</p></p>
                                        </div>
                                    </div>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Feels Like</p>
                                        <div className=''>
                                            <p className='font-normal text-[35px]'>35°</p>
                                        </div>
                                    </div>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <p className='pb-4 font-lighter'>Air Pollution</p>
                                        <div className='flex flex-col gap-3 place-content-center'>
                                            <p className='font-thin text-[22px] '>Moderate</p>
                                            <div className='flex justify-between  text-[14px]'>
                                                <span className='font-thin place-content-center  flex flex-row'>
                                                    <div>NO:</div>
                                                    <div className='pl-2'>4</div>
                                                </span>
                                                <span className='font-thin place-content-center flex flex-row'>
                                                    <div>NH<sub>3</sub>:</div>
                                                    <div className='pl-2'>4</div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border w-[23%] rounded-xl p-4 text-center'>
                                        <div className='flex flex-wrap gap-2 gap-y-4'>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight mb-2'>Wind</div>
                                                <div>3.5 <span className='text-gray-300'>Km/h</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>Humidity</div>
                                                <div>56<span className='text-gray-300'>%</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>Pressure</div>
                                                <div>1024<span className='text-gray-300'>hpa</span></div>
                                            </div>
                                            <div className='w-[47%]'>
                                                <div className='glass font-extralight  mb-2'>UV Index</div>
                                                <div>3</div>
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
                                    <div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
                                    <div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
                                    <div className='p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
                                    <div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
                                    <div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
                                    <div className=' p-4 rounded-xl'>
                                        <div className='text-[50px] font-thin'>12°</div>
                                        <p className='font-thin'>Aligarh</p>
                                    </div>
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