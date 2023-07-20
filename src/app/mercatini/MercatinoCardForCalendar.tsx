import {Mercatino, ProduttoreSemplice} from "@/Models/Mercatino";
import Link from "next/link";
import {getProduttoriIscritti} from "@/FirebaseUtils/CRUDmercatini";

export async function MercatinoCardForCalendar({mercatino}: { mercatino: Mercatino }) {
    const produttoriIscritti: ProduttoreSemplice[] = await getProduttoriIscritti(mercatino.id) as ProduttoreSemplice[];
    return (
        // Container
        <div
            className='flex group border border-white w-44 h-36 mb-4 bg-transparent justify-center items-center rounded-3xl shadow-2xl shadow-zinc-950 hover:border-teal-400 transition ease-out duration-400'>
            <Link
                href={`/mercatini/${mercatino.id}`}
                className={"flex-1"}
            >
                {/* <div className='rounded-3xl bg-gray-800 text-center basis-1/2'>
                    {produttoriIscritti && (
                        <div className='bg-transparent'>
                            {produttoriIscritti.map((ps) => (
                                <Image
                                    src={ps.photoURL}
                                    className='h-28 w-full brightness-[.8] object-contain rounded-t-3xl mb-1 hover:brightness-100 transition duration-500 ease-in-out'
                                    alt={mercatino.nome}
                                    key={v4()}
                                />
                            ))}
                        </div>
                    )}*/}
                <div className='flex flex-col text-center'>
                    <p className='text-white font-bold overflow-ellipsis bg-inherit px-2 group-hover:text-teal-400 transition ease-out duration-400'>
                        {mercatino.nome}
                    </p>
                    <p className='text-white font-bold overflow-ellipsis bg-inherit px-2 group-hover:text-teal-400 transition ease-out duration-400'>
                        {mercatino.citta}
                    </p>
                    <p className='text-white font-bold overflow-ellipsis bg-inherit px-2 group-hover:text-teal-400 transition ease-out duration-400'>
                        {mercatino.ora}
                    </p>

                </div>
            </Link>

            {/** USER ICON */}
            {/* <div
                className='absolute -top-3 -left-3 flex-none flex justify-center items-center w-12 h-12 rounded-full
      bg-gradient-to-tr from-yellow-400 to-red-700 transform hover:scale-150 transition ease-in-out duration-200
      '
            >
                {produttoriIscritti ? produttoriIscritti.map((produttore) => (
                    <Link
                        href={`/accounts/${produttore.id}`}
                        className='flex-none'
                        key={produttore.id}
                    >
                        <Image
                            src={produttore.photoURL}
                            alt={produttore.id}
                            className='h-10 w-10 rounded-full border-4 border-gray-900 transform transition duration-200 ease-in-out hover:rotate-12'
                        />
                    </Link>
                )) : <h4>Nessun produttore iscritto</h4>}
            </div>*/}


        </div>
    );

}
