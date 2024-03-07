import { countryListAllIsoData, genericFibre } from "./lists";

//garment types
const GARMENT_TYPES = [
    { cat: 1, value: 'shirt', label: 'Shirt' },
    { cat: 1, value: 'dressShirt', label: 'Dress-Shirt' },
    { cat: 1, value: 'sweater', label: 'Sweater' },
    { cat: 2, value: 'pants', label: 'Pants' },
    { cat: 2, value: 'denim', label: 'Denim' },
    { cat: 2, value: 'skirt', label: 'Skirt' },
    { cat: 3, value: 'dress', label: 'Dress' },
];

//countries
const COUNTRIES = [];
for(let country of countryListAllIsoData) {
    COUNTRIES.push({value: country.code, label: country.name});
}

//fibres
const FIBRES = [];
for(let fibre of genericFibre) {
    FIBRES.push({value: fibre.code, label: fibre.name});
}

export { GARMENT_TYPES, COUNTRIES, FIBRES };