export class Webshop {
    constructor(termekek, kosar) {
        this.termekek = termekek;
        this.kosar = kosar;
        this.tartalomElem = document.getElementById("tartalom");
        this.kosarDarabElem = document.getElementById("kosarDarab");
    }

    renderTermekek(lista = this.termekek) {
        this.tartalomElem.innerHTML = "";

        if (lista.length === 0) {
            this.tartalomElem.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        Nincs a keresésnek vagy szűrésnek megfelelő termék.
                    </div>
                </div>
            `;
            return;
        }

        lista.forEach(termek => {
            this.tartalomElem.innerHTML += `
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${termek.kep}" class="card-img-top" alt="${termek.nev}" style="height:250px; object-fit:cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text mb-1"><strong>Márka:</strong> ${termek.marka}</p>
                            <p class="card-text mb-1"><strong>Kategória:</strong> ${termek.kategoria}</p>
                            <p class="card-text mb-1"><strong>Kiszerelés:</strong> ${termek.kiszereles}</p>
                            <p class="card-text">${termek.leiras}</p>
                            <p class="card-text fw-bold mt-auto">${termek.ar.toLocaleString()} Ft</p>
                            <button class="btn btn-primary w-100 kosar-gomb" data-id="${termek.id}">
                                Kosárba
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        this.tartalomElem.querySelectorAll(".kosar-gomb").forEach(gomb => {
            gomb.addEventListener("click", () => {
                this.kosarbaTesz(parseInt(gomb.dataset.id));
            });
        });
    }

    renderKosar() {
        this.tartalomElem.innerHTML = "";

        if (this.kosar.tetelek.length === 0) {
            this.tartalomElem.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        A kosár üres.
                    </div>
                </div>
            `;
            return;
        }

        let html = `
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h3 class="mb-4">Kosár</h3>
                        <div class="table-responsive">
                            <table class="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Termék neve</th>
                                        <th>Ár</th>
                                        <th>Darab</th>
                                        <th>Összesen</th>
                                        <th>Művelet</th>
                                    </tr>
                                </thead>
                                <tbody>
        `;

        this.kosar.tetelek.forEach(tetel => {
            html += `
                <tr>
                    <td>${tetel.termek.nev}</td>
                    <td>${tetel.termek.ar.toLocaleString()} Ft</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary minus" data-id="${tetel.termek.id}">-</button>
                        <span class="mx-2">${tetel.darab}</span>
                        <button class="btn btn-sm btn-outline-secondary plus" data-id="${tetel.termek.id}">+</button>
                    </td>
                    <td>${tetel.osszeg().toLocaleString()} Ft</td>
                    <td>
                        <button class="btn btn-sm btn-danger torol" data-id="${tetel.termek.id}">
                            Törlés
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                                </tbody>
                            </table>
                        </div>
                        <h4 class="text-end">Végösszeg: ${this.kosar.vegosszeg().toLocaleString()} Ft</h4>
                    </div>
                </div>
            </div>
        `;

        this.tartalomElem.innerHTML = html;

        this.tartalomElem.querySelectorAll(".plus").forEach(gomb => {
            gomb.addEventListener("click", () => {
                this.kosar.darabNovel(parseInt(gomb.dataset.id));
                this.frissitKosar();
            });
        });

        this.tartalomElem.querySelectorAll(".minus").forEach(gomb => {
            gomb.addEventListener("click", () => {
                this.kosar.darabCsokkent(parseInt(gomb.dataset.id));
                this.frissitKosar();
            });
        });

        this.tartalomElem.querySelectorAll(".torol").forEach(gomb => {
            gomb.addEventListener("click", () => {
                this.kosar.removeTermek(parseInt(gomb.dataset.id));
                this.frissitKosar();
            });
        });
    }

    kosarbaTesz(id) {
        const termek = this.termekek.find(t => t.id === id);

        if (termek) {
            this.kosar.addTermek(termek);
            this.frissitKosarDarab();
        }
    }

    frissitKosarDarab() {
        this.kosarDarabElem.textContent = this.kosar.osszDarab();
    }

    frissitKosar() {
        this.frissitKosarDarab();
        this.renderKosar();
    }

    keresEsSzur(keresoSzoveg, kategoria) {
        let szurtLista = this.termekek;

        if (kategoria !== "osszes") {
            szurtLista = szurtLista.filter(termek => termek.kategoria === kategoria);
        }

        if (keresoSzoveg.trim() !== "") {
            szurtLista = szurtLista.filter(termek =>
                termek.nev.toLowerCase().includes(keresoSzoveg.toLowerCase())
            );
        }

        this.renderTermekek(szurtLista);
    }
}