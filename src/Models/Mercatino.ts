import {FirestoreDataConverter} from "@firebase/firestore";
import {Timestamp, WithFieldValue} from "@firebase/firestore/lite";

export type ProduttoreSemplice = {
    id: string,
    photoURL: string,
}

export class Mercatino {
    readonly id: string;
    nome: string;
    indirizzo: string;
    citta: string;
    zipcode: string;
    data: string;
    ora: string;
    descrizione: string;
    latitudine: number;
    longitudine: number;
    immagine: string;
    ProduttoriIscritti: ProduttoreSemplice[] = [];

    constructor(id: string, nome: string, indirizzo: string, citta: string, zipcode: string, data: string, ora: string, descrizione: string, latitudine: number, longitudine: number, immagine: string,
                ProduttoriIscritti: ProduttoreSemplice[] = []) {
        if(zipcode.toString().length == 5)
        {
            this.id = id;
            this.nome = nome;
            this.indirizzo = indirizzo;
            this.citta = citta;
            this.zipcode = zipcode;
            this.data = data;
            this.ora = ora;
            this.descrizione = descrizione;
            this.latitudine = latitudine;
            this.longitudine = longitudine;
            this.immagine = immagine;
            this.ProduttoriIscritti = ProduttoriIscritti;
        }
        else throw new Error('Codice postale invalido')
    }
}

function getDateFromString(dateString: string) {

  return new Date(dateString.split(' ')[0] + 'T' + dateString.split(' ')[1] + ':00');
}

export const mercatinoConverter: FirestoreDataConverter<Mercatino> = {
    toFirestore: function (mercatino: Mercatino) {
        return {
            nome: mercatino.nome,
            indirizzo: mercatino.indirizzo,
            citta: mercatino.citta,
            zipcode: mercatino.zipcode,
            data: mercatino.data,
            ora: mercatino.ora,
            dataTimestamp: Timestamp.fromDate(getDateFromString(mercatino.data + ' ' + mercatino.ora)),
            descrizione: mercatino.descrizione,
            latitudine: mercatino.latitudine,
            longitudine: mercatino.longitudine,
            immagine: mercatino.immagine,
            produttoriIscritti: mercatino.ProduttoriIscritti
        };
    },
    fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new Mercatino(snapshot.id, data.nome, data.indirizzo, data.citta, data.zipcode, data.data, data.ora, data.descrizione, data.latitudine, data.longitudine, data.immagine, data.produttoriIscritti);
    }
}