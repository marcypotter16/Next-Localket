'use client'

import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {v4} from "uuid";
import {Mercatino, mercatinoConverter} from "@/Models/Mercatino";
import {ref, uploadBytes} from "@firebase/storage";
import {db, storage} from "@/FirebaseUtils/firebase";
import {doc, increment, setDoc, updateDoc} from "@firebase/firestore/lite";


export default function PublishMercatini() {
    const nullMercatino: Mercatino = new Mercatino(v4(), '', '', '', '12345', '',  '', '',  0, 0, '');
    const [input, setInput] = useState(nullMercatino)
    const photoRef = useRef<HTMLInputElement>(null);

    function submit(e: FormEvent<HTMLFormElement>) {
        const today = new Date();
        const productId = v4();
        e.preventDefault();
        for (const file of photoRef!.current!.files!) {
            const imageId = file.name + v4();
            const imageRef = ref(
                storage,
                `${today.getFullYear()}/mercatini/${productId}/${imageId}`
            );
            uploadBytes(imageRef, file);
        }
        /* db.collection('products')
      .withConverter(productConverter)
      .doc(productId)
      .set(input)
      .then((_res) => alert('Added: ' + input.name)); */

        // Add the product to the database
        setDoc(
            doc(db, "mercatini", productId).withConverter(mercatinoConverter),
            input
        ).then((_res) => alert("Added: " + input.nome));

        // Increment the product count
        updateDoc(doc(db, "counters", "mercatini"), {
            count: increment(1),
        }).then((_res) => alert("Incremented mercatini count"));
    }

    function handleChange(
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) {
        const {name, value} = e.target;
        if (name == "category") {
            setInput((prevInput) => ({
                ...prevInput,
                category: value.split(","),
            }));
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value,
            }));
        }
    }

    return (
        <>
            <div className=''>
                <form
                    className='px-4 my-32 max-w-3xl mx-auto space-y-6'
                    onSubmit={(e) => submit(e)}
                >
                    <h1 className='text-3xl font-semibold text-white'>
                        Inserisci un Mercatino
                    </h1>
                    <div>
                        <label className='text-gray-200'>Nome:</label>
                        <input
                            className='border border-gray-400 shadow bg-inherit text-white block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                            type='text'
                            name='nome'
                            value={input.nome}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label className='text-gray-200'>Descrizione: </label>
                        <textarea
                            className='border border-gray-400 shadow bg-inherit text-white block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                            name='descrizione'
                            value={input.descrizione}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className='flex space-x-1'>
                        <div className='w-1/4'>
                            <label className='text-gray-200'>Città:</label>
                            <input
                                className='border border-gray-400 shadow bg-inherit text-white text-center block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                                type='text'
                                name='citta'
                                value={input.citta}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='w-full'>
                            <label className='text-gray-200'>Indirizzo: </label>
                            <input
                                className='border border-gray-400 shadow bg-inherit text-white block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                                type='text'
                                name='indirizzo'
                                value={input.indirizzo}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='w-28'>
                            <label className='text-gray-200'>CAP: </label>
                            <input
                                className='border border-gray-400 shadow bg-inherit text-white text-center block py-2 px-2 w-full rounded focus:outline-none focus:border-teal-500'
                                type='text'
                                name='zipcode'
                                value={input.zipcode}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    {/** DATA E ORARIO */}
                    <div>
                        <label className='text-gray-200'>Data: </label>
                        <input
                            className='border border-gray-400 shadow bg-inherit text-white block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                            type='date'
                            name='data'
                            value={input.data}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label className='text-gray-200'>Ora: </label>
                        <input
                            className='border border-gray-400 shadow bg-inherit text-white block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500'
                            type='text'
                            name='ora'
                            value={input.ora}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>


                    {/* CATEGORIE && SELEZIONE PROVINCIA */}
                    <div className='flex'>


                        {/* PROVINCIA */}
                        <div className='w-2/3'>
                            <label className='text-gray-200'>Provincia: </label>
                            {/*<AutocompleteProvince/>*/}
                            <label className='text-gray-600 text-sm'>
                                Seleziona la provincia in cui si trova il prodotto</label>
                        </div>
					</div>

                        {/* FOTO */}
                        <div>
                            <label
                                className='block text-sm font-medium text-gray-400 dark:text-white'
                                htmlFor='file_input'
                            >
                                Carica foto:
                            </label>
                            <input
                                className='block w-full text-sm border border-gray-300 rounded-lg file:mx cursor-pointer text-gray-600 focus:outline-none p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                                id='file_input'
                                type='file'
                                name='photos'
                                accept='image/png, image/jpg, image/jpeg'
                                multiple
                                ref={photoRef}
                            />
                        </div>

					{/* SUBMIT */}
                        <div className='flex flex-col-reverse max-w-3xl justify-center'>

                            <button
                                type='submit'
                                className='border border-gray-200 text-white rounded py-2 px-5 hover:shadow-lg hover:shadow-cyan-500/50 hover:border-teal-500'
                            >
                                Inserisci Prodotto
                            </button>
                        </div>

                </form>
            </div>
        </>
    );
};
