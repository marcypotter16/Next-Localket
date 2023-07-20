import {FirestoreDataConverter} from "@firebase/firestore";

export class Prodotto {
    nome: string;
    descrizione: string;
    prezzo: number;
    immagine: string;
    idProprietario: string;

    constructor(nome: string, descrizione: string, prezzo: number, immagine: string, idProprietario: string) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.immagine = immagine;
        this.idProprietario = idProprietario;
    }
}

export const prodottoConverter: FirestoreDataConverter<Prodotto> = {
    toFirestore: function (prodotto: Prodotto) {
        return {
            nome: prodotto.nome,
            descrizione: prodotto.descrizione,
            prezzo: prodotto.prezzo,
            immagine: prodotto.immagine,
            idProprietario: prodotto.idProprietario
        };
    },
    fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new Prodotto(data.nome, data.descrizione, data.prezzo, data.immagine, data.idProprietario);
    }
}