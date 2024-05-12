import { careInstructions, countryListAllIsoData, genericFibre } from "./lists";

//garment types
const GARMENT_TYPES = [
    { cat: 'Top', value: 'tShirt', label: 'T-shirt (long or short sleeve)' },
    { cat: 'Top', value: 'poloShirt', label: 'Polo shirt (long or short sleeve)' },
    { cat: 'Top', value: 'sweatshirt', label: 'Sweatshirt or Hoodie' },
    { cat: 'Top', value: 'sweater', label: 'Sweater or Pullover' },
    { cat: 'Top', value: 'buttonDownShirt', label: 'Button-down shirt (long or short sleeve)' },
    { cat: 'Top', value: 'blouse', label: 'Blouse (long or short sleeve)' },
    { cat: 'Top', value: 'waistcoat', label: 'Waistcoat or Vest' },
    { cat: 'Top', value: 'cardigan', label: 'Cardigan' },
    { cat: 'Top', value: 'tankTop', label: 'Tank Top' },
    { cat: 'Top', value: 'corsage', label: 'Corsage' },
    { cat: 'Top', value: 'blazer', label: 'Blazer' },
    { cat: 'Top', value: 'suitJacket', label: 'Suit Jacket' },
    { cat: 'Top', value: 'jacket', label: 'Jacket' },
    { cat: 'Top', value: 'coat', label: 'Coat' },
    { cat: 'Top', value: 'rainJacket', label: 'Rain Jacket' },
    { cat: 'Bottom', value: 'pants', label: 'Pants' },
    { cat: 'Bottom', value: 'trouser', label: 'Trouser' },
    { cat: 'Bottom', value: 'jeans', label: 'Jeans or Denim Pants' },
    { cat: 'Bottom', value: 'shorts', label: 'Shorts' },
    { cat: 'Bottom', value: 'sweatpants', label: 'Sweatpants' },
    { cat: 'Bottom', value: 'leggings', label: 'Leggings or Tights' },
    { cat: 'Bottom', value: 'skirt', label: 'Skirt' },
    { cat: 'Combined', value: 'dress', label: 'Dress' },
    { cat: 'Combined', value: 'offShoulderDress', label: 'Off shoulder Dress' },
    { cat: 'Combined', value: 'jumpsuit', label: 'Jumpsuit or Coverall' },
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
const CARE_WASH_METHODS = {
    "Wash":[
        {value: 'noWash', label:'Did not wash'},
        {value: 'washHand', label: 'Hand wash'},
    ],
    "Heat":[
        {value: 'washHeatXXC', label:'Input temperature ('+String.fromCharCode(176)+'C)'},
        {value: 'washHeatXXF', label:'Input temperature ('+String.fromCharCode(176)+'F)'},
    ],
    "Temp":[],
};
//dry methods
const CARE_DRY_METHODS = {
    "Tumble":[
        {value: 'noTumble', label:'Air dry'},
    ],
    "Air":[],
    "Shade":[],
    "Heat":[],
};
//dry clean methods
const CARE_DRYC_METHODS = {
    "Solvent":[],
    "Care":[],
};
//iron methods
const CARE_IRON_METHODS = {
    "Heat":[],
};
//bleach methods
const CARE_BLEACH_METHODS = {
    "Bleach":[],
};

for(let key in careInstructions) {
    if(careInstructions[key].type === "wash" && careInstructions[key].subtype !== "") {
        CARE_WASH_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
    else if(careInstructions[key].type === "dry" && careInstructions[key].subtype !== "") {
        CARE_DRY_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
    else if(careInstructions[key].type === "tumble" && careInstructions[key].subtype !== "") {
        CARE_DRY_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
    else if(careInstructions[key].type === "dryC" && careInstructions[key].subtype !== "") {
        CARE_DRYC_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
    else if(careInstructions[key].type === "iron" && careInstructions[key].subtype !== "") {
        CARE_IRON_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
    else if(careInstructions[key].type === "bleach" && careInstructions[key].subtype !== "") {
        CARE_BLEACH_METHODS[careInstructions[key].subtype].push(
            {value:careInstructions[key].value,label:careInstructions[key].name});
    }
}

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
    {value: 'Fashion Boutique', label: 'Outside the Newnham building B fashion boutique'},
    {value: 'Cafeteria', label: 'Inside the Newnham building D Cafeteria'},
    {value: 'Library', label: 'Outside the Newnham building B Library'},
    {value: 'Starbucks', label: 'By the Newnham building A Starbucks'},
    {value: 'Other Campus', label: 'Other Seneca campus (please specify)'},
    {value: 'Off Campus', label: 'Off campus (please specify)'},
];

const PICKUP_CAMPUS = [
    {value: 'King', label: 'King Campus'},
    {value: 'Markham', label: 'Markham Campus (Seneca International Academy)'},
    {value: 'Peterborogh', label: 'Peterbrorough Campus'},
    {value: 'York', label: 'Seneca@York Campus'},
    {value: 'Yorkgate', label: 'Yorkgate Campus'},
];

export { GARMENT_TYPES, GARMENT_SIZE_TYPES, GARMENT_SIZES, GARMENT_FITS, COUNTRIES, FIBRES,
    CARE_WASH_METHODS, CARE_DRY_METHODS, CARE_DRYC_METHODS, CARE_IRON_METHODS, CARE_BLEACH_METHODS,
    WASH_TEMP_C, WASH_TEMP_F, PICKUP_LOCS, PICKUP_CAMPUS };