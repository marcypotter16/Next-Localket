import {Prodotto} from "@/Models/Prodotto";
import {FirestoreDataConverter} from "@firebase/firestore";

export class Utente {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    indirizzo: string;
    citta: string;
    telefono: string;
    immagine: string;
    prodotti: Prodotto[] = [];
    puoPubblicareMercatini: boolean = false;

    constructor(nome: string, cognome: string, email: string, password: string, indirizzo: string, citta: string, telefono: string, immagine: string, prodotti: Prodotto[], puoPubblicareMercatini: boolean) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.indirizzo = indirizzo;
        this.citta = citta;
        this.telefono = telefono;
        this.immagine = immagine;
        this.prodotti = prodotti;
        this.puoPubblicareMercatini = puoPubblicareMercatini;
    }
}

export const utenteConverter: FirestoreDataConverter<Utente> = {
    toFirestore: function (utente: Utente) {
        return {
            nome: utente.nome,
            cognome: utente.cognome,
            email: utente.email,
            password: utente.password,
            indirizzo: utente.indirizzo,
            citta: utente.citta,
            telefono: utente.telefono,
            immagine: utente.immagine,
            prodotti: utente.prodotti,
            puoPubblicareMercatini: utente.puoPubblicareMercatini
        };
    },
    fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new Utente(data.nome, data.cognome, data.email, data.password, data.indirizzo, data.citta, data.telefono, data.immagine, data.prodotti, data.puoPubblicareMercatini);
    }
}