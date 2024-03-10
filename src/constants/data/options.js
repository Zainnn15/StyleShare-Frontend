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

//garment sizes
const GARMENT_SIZES = [
    {value: 'XXS', label: 'Double extra small'},
    {value: 'XS', label: 'Extra small'},
    {value: 'S', label: 'Small'},
    {value: 'M', label: 'Medium'},
    {value: 'L', label: 'Large'},
    {value: 'XL', label: 'Extra large'},
    {value: 'XXL', label: 'Double extra large'},
    {value: 'XXXL', label: 'Triple extra large'},
];

//garment fits
const GARMENT_FITS = [
    {value: 'Tight', label: 'Tight'},
    {value: 'Comfortable', label: 'Comfortable'},
    {value: 'Loose', label: 'Loose'},
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

//wash methods
const CARE_WASH_METHODS = [
    {value: 'washingMachine', label: 'Washing Machine'},
    {value: 'handWash', label: 'Hand Wash'},
];

//dry methods
const CARE_DRY_METHODS = [
    {value: 'dryer', label: 'Dryer'},
    {value: 'hangDry', label: 'Hang & Dry'},
];

export { GARMENT_TYPES, GARMENT_SIZES, GARMENT_FITS, COUNTRIES, FIBRES,
    CARE_WASH_METHODS, CARE_DRY_METHODS };