

// import {getMercatini} from "@/FirebaseUtils/CRUDmercatini";
import {Mercatino} from "@/Models/Mercatino";
import {getMercatiniByDate} from "@/FirebaseUtils/CRUDmercatini";


export default async function Mercatini() {
    const mercatini: Mercatino[] = await getMercatiniByDate()
    return (
        <div>
        <h1>Mercatini</h1>
            {mercatini.map(merc => <p key={merc.id}>{merc.nome}</p>)}
        </div>
    )
}