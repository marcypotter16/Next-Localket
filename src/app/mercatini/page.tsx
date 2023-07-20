// import {getMercatini} from "@/FirebaseUtils/CRUDmercatini";
import {Mercatino} from "@/Models/Mercatino";
import {getMercatiniByDate} from "@/FirebaseUtils/CRUDmercatini";
import {MercatinoCardForCalendar} from "@/app/mercatini/MercatinoCardForCalendar";
import {Calendar} from "@/app/mercatini/Calendar";


export default async function Mercatini() {
    const mercatini: Mercatino[] = await getMercatiniByDate()
    return (
        <div>

            <div className='flex flex-col items-center py-8 px-2 w-screen bg-slate-800'>
                <div className='flex space-x-3 py-5 px-2 justify-center w-full bg-inherit'>
                    <h1 className='text-3xl bg-inherit font-bold text-white'>Mercatini</h1>
                </div>
                <Calendar mercatini={mercatini}/>
                <div className='flex space-x-8 border py-5 px-2 justify-center w-full bg-inherit'>
                    {mercatini.map(merc => <MercatinoCardForCalendar mercatino={merc} key={merc.id}/>)}
                </div>
            </div>
        </div>
    )
}