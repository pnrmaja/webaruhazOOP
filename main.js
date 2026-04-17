import { Kosar } from "./Kosar.js";
import { Webshop } from "./Webshop.js";
import { termekLista } from "./termekLista.js";

const kosar = new Kosar();
const webshop = new Webshop(termekLista, kosar);

webshop.renderTermekek();
webshop.frissitKosarDarab();

document.getElementById("termekekGomb").addEventListener("click", () => {
    const keresoSzoveg = document.getElementById("keresoMezo").value;
    const kategoria = document.getElementById("kategoriaValaszto").value;
    webshop.keresEsSzur(keresoSzoveg, kategoria);
});

document.getElementById("kosarGomb").addEventListener("click", () => {
    webshop.renderKosar();
});

document.getElementById("keresoMezo").addEventListener("input", () => {
    const keresoSzoveg = document.getElementById("keresoMezo").value;
    const kategoria = document.getElementById("kategoriaValaszto").value;
    webshop.keresEsSzur(keresoSzoveg, kategoria);
});

document.getElementById("kategoriaValaszto").addEventListener("change", () => {
    const keresoSzoveg = document.getElementById("keresoMezo").value;
    const kategoria = document.getElementById("kategoriaValaszto").value;
    webshop.keresEsSzur(keresoSzoveg, kategoria);
});