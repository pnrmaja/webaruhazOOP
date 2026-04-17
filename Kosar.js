export class KosarTetel {
    constructor(termek, darab = 1) {
        this.termek = termek;
        this.darab = darab;
    }

    osszeg() {
        return this.termek.ar * this.darab;
    }
}

export class Kosar {
    constructor() {
        this.tetelek = [];
    }

    addTermek(termek) {
        const letezo = this.tetelek.find(t => t.termek.id === termek.id);

        if (letezo) {
            letezo.darab++;
        } else {
            this.tetelek.push(new KosarTetel(termek));
        }
    }

    removeTermek(id) {
        this.tetelek = this.tetelek.filter(t => t.termek.id !== id);
    }

    darabNovel(id) {
        const t = this.tetelek.find(t => t.termek.id === id);
        if (t) {
            t.darab++;
        }
    }

    darabCsokkent(id) {
        const t = this.tetelek.find(t => t.termek.id === id);
        if (t) {
            t.darab--;
            if (t.darab <= 0) {
                this.removeTermek(id);
            }
        }
    }

    vegosszeg() {
        return this.tetelek.reduce((sum, t) => sum + t.osszeg(), 0);
    }

    osszDarab() {
        return this.tetelek.reduce((sum, t) => sum + t.darab, 0);
    }
}