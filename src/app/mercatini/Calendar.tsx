'use client'

import {Mercatino} from "@/Models/Mercatino";
import {MercatinoCardForCalendar} from "@/app/mercatini/MercatinoCardForCalendar";
import {useState} from "react";
import {numberToMonth} from "@/app/Utils/DateUtil";



const mese = Date.now().toString().slice(0, 6)
const giorni = new Date(parseInt(mese.slice(0, 4)), parseInt(mese.slice(4, 6)), 0).getDate()
// @ts-ignore


export const Calendar = ({mercatini}: { mercatini: Mercatino[] }) => {
    const ora = new Date().getMonth() + 1
    const [currentMonth, setCurrentMonth] = useState(ora)

    return (
        <>
            <div className='flex space-x-3'>
                <button onClick={() => setCurrentMonth(currentMonth - 1)}>&larr;</button>
                <h1>{numberToMonth[currentMonth.toString()]}</h1>
                <button onClick={() => setCurrentMonth(currentMonth + 1)}>&rarr;</button>
            </div>
            <div className='grid grid-cols-7'>
                {Array(giorni).fill(0).map((_, i) => {
                    const mercatiniGiorno = mercatini.filter(merc => merc.data.split('-')[2] == (i + 1).toString())
                    if (mercatiniGiorno.length == 0) {
                        return <div key={i} className='relative border h-52'>
                            <div key={i} className='absolute top-1 left-1'>{i + 1}</div>
                        </div>
                    } else if (mercatiniGiorno.length == 1) {
                        return <div key={`cont${i}`} className='relative p-5 border h-52'>
                            <div key={i} className='absolute top-1 left-1'>{i + 1}</div>
                            <MercatinoCardForCalendar key={i}
                                                      mercatino={mercatiniGiorno[0]}/>
                        </div>
                    } else {
                        return <div key={`cont${i}`} className='relative flex flex-col p-5 h-52 border'>
                            <div key={i} className='absolute top-1 left-1'>{i + 1}</div>
                            {mercatiniGiorno.map(merc => <MercatinoCardForCalendar key={i} mercatino={merc}/>)}
                        </div>
                    }
                })}
                {new Date().getFullYear()}<br/>
                {numberToMonth[(new Date().getMonth() + 1).toString()]}<br/>
                {new Date().getDate()}<br/>
                {new Date().getHours()}<br/>
                {new Date().getMinutes()}<br/>
                {new Date().getSeconds()}<br/>
            </div>
        </>
    )
}