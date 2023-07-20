import {addDoc} from "@firebase/firestore";
import {collection, deleteDoc, doc, getDocs, orderBy, setDoc, query} from "@firebase/firestore/lite";
import {db} from "./firebase";
import {Mercatino, mercatinoConverter} from "@/Models/Mercatino";

export const insertMercatino = async (mercatino: Mercatino) => {
    const mercatiniCollection = collection(db, "mercatini").withConverter(mercatinoConverter);
    const mercatinoDoc = await addDoc(mercatiniCollection, mercatino);
    return mercatinoDoc.id;
}

export const updateMercatino = async (mercatino: Mercatino, id: string) => {
    const mercatiniCollection = collection(db, "mercatini").withConverter(mercatinoConverter);
    await setDoc(doc(mercatiniCollection, id), mercatino);
}

export const deleteMercatino = async (id: string) => {
    const mercatiniCollection = collection(db, "mercatini").withConverter(mercatinoConverter);
    await deleteDoc(doc(mercatiniCollection, id));
}

export const getMercatiniByDate = async (): Promise<Mercatino[]> => {
    // @ts-ignore
    const mercatiniCollection = query(collection(db, "mercatini"), orderBy('dataTimestamp', 'asc')).withConverter(mercatinoConverter);
    const mercatiniSnapshot = await getDocs(mercatiniCollection);
    return mercatiniSnapshot.docs.map(doc => doc.data() as Mercatino);
}