import { useEffect, useState } from "react"

export const DateTime = () => {

    const [date, setDate] = useState("12")
    const [month, setMonth] = useState("NOV")
    const [day, setDay] = useState("MONDAY")
    const [time, setTime] = useState(new Date());

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
    })
   
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