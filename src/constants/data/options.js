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
    {value: '0', label: 'US Size 0'},
    {value: '2', label: 'US Size 2'},
    {value: '4', label: 'US Size 4'},
    {value: '6', label: 'US Size 6'},
    {value: '8', label: 'US Size 8'},
    {value: '10', label: 'US Size 10'},
    {value: '12', label: 'US Size 12'},
    {value: '14', label: 'US Size 14'},
    {value: '16', label: 'US Size 16'},
    {value: '18', label: 'US Size 18'},
    {value: '20', label: 'US Size 20'},
    {value: '22', label: 'US Size 22'},
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

//wash temperatures celsius
const WASH_TEMP_C = [
    {value: '30C', label: '30'+String.fromCharCode(176)+'C'},
    {value: '40C', label: '40'+String.fromCharCode(176)+'C'},
    {value: '50C', label: '50'+String.fromCharCode(176)+'C'},
    {value: '60C', label: '60'+String.fromCharCode(176)+'C'},
    {value: '70C', label: '70'+String.fromCharCode(176)+'C'},
    {value: '95C', label: '95'+String.fromCharCode(176)+'C'},
];

//wash temperatures celsius
const WASH_TEMP_F = [
    {value: '65-85F', label: '65-85'+String.fromCharCode(176)+'F'},
    {value: '105F', label: '105'+String.fromCharCode(176)+'F'},
    {value: '120F', label: '120'+String.fromCharCode(176)+'F'},
    {value: '140F', label: '140'+String.fromCharCode(176)+'F'},
    {value: '160F', label: '160'+String.fromCharCode(176)+'F'},
    {value: '200F', label: '200'+String.fromCharCode(176)+'F'},
];

export { GARMENT_TYPES, GARMENT_SIZES, GARMENT_FITS, COUNTRIES, FIBRES,
    CARE_WASH_METHODS, CARE_DRY_METHODS, WASH_TEMP_C, WASH_TEMP_F };