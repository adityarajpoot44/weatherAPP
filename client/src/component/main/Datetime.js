import { useEffect, useState } from "react"

export const DateTime = () => {

    const [date, setDate] = useState(null)
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null)
    const [time, setTime] = useState(new Date());
    console.log("Date")
    useEffect(() => {

        const dates = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setDate(dates.getDate())
        setDay((weekday[dates.getDay()]).toUpperCase())
        setMonth(dates.toLocaleString('default', { month: "short" }))
       const timer= setTimeout(()=>{
            setTime(new Date())
        },1000)
        return () => clearInterval(timer);
    },[date])
   
    return (
        <div className=''>
            <p className='text-[15px]'><span>{date}, </span>
                <span>{month}</span>
            </p>
            <div className='flex gap-2 text-[25px] w-[230px]'>
                <span className='text-black'>{day},</span>
                <span>{time.toLocaleTimeString()}</span>
            </div>

        </div>
    )
}