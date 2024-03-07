import { countryListAllIsoData, genericFibre } from "./lists";

//garment types
const GARMENT_TYPES = [
    { value: 'shirt', label: 'Shirt' },
    { value: 'dressShirt', label: 'Dress-Shirt' },
    { value: 'sweater', label: 'Sweater' },
    { value: 'pants', label: 'Pants' },
    { value: 'denim', label: 'Denim' },
    { value: 'dress', label: 'Dress' },
    { value: 'skirt', label: 'Skirt' }
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