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

//measurement size types
const GARMENT_SIZE_TYPES = [
    {value: 'general', label: 'General Size (XXS - XXL)'},
    {value: 'us', label: 'US Clothing Size'},
    {value: 'eu', label: 'European Clothing Size'},
    {value: 'uk', label: 'UK Size'},
    {value: 'denim', label: 'Denim Pants (waist)'},
    {value: 'dressShirt', label: 'Dress-shirt Size (collar size)'},
];

//garment sizes
const GARMENT_SIZES = {
    "general": 
    [    
        {value: 'XXS', label: 'Double extra small (XXS)'},
        {value: 'XS', label: 'Extra small (XS)'},
        {value: 'S', label: 'Small (S)'},
        {value: 'M', label: 'Medium (M)'},
        {value: 'L', label: 'Large (L)'},
        {value: 'XL', label: 'Extra large (XL)'},
        {value: 'XXL', label: 'Double extra large (XXL)'},
    ],
    "us": [],
    "eu": [],
    "uk": [],
    "denim": [],
    "dressShirt": [],
};
//populate sizes
let size = 2;
while(size <= 20) {
    GARMENT_SIZES["us"].push({value:size, label:size});
    GARMENT_SIZES["eu"].push({value:size+30, label:size+30});
    GARMENT_SIZES["uk"].push({value:size+2, label:size+2});
    size += 2;
}
size = 24;
while(size <= 42) {
    GARMENT_SIZES["denim"].push({value:size, label:size});
    size++;
}
size = 14;
while(size <= 18.5) {
    GARMENT_SIZES["dressShirt"].push({value:size, label:size});
    size+=0.5;
}

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

//on campus pickup locations
const PICKUP_LOCS = [
    {value: 'Fashion Boutique', label: 'Outside the building B fashion boutique'},
    {value: 'Cafeteria', label: 'Inside the building D Cafeteria'},
    {value: 'Library', label: 'Outside the building B Library'},
    {value: 'Starbucks', label: 'By the building A Starbucks'},
];

export { GARMENT_TYPES, GARMENT_SIZE_TYPES, GARMENT_SIZES, GARMENT_FITS, COUNTRIES, FIBRES,
    CARE_WASH_METHODS, CARE_DRY_METHODS, WASH_TEMP_C, WASH_TEMP_F, PICKUP_LOCS };