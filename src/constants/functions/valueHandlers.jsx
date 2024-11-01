/* eslint-disable no-undef */
import { careInstructions } from "../data/lists";

//const imgHostURL = import.meta.env.VITE_API_URL;


function findAttribute(objArr, val, attrCheck="value", attrReturn="label") {
    try {
        for(let i=0; i<objArr.length; i++) {
            if(objArr[i][attrCheck] === val) {
                return objArr[i][attrReturn];
            }
        }
        return val;
    } catch (error) {
        return val;
    }
}

function parseID(idName, index=-1, del='_') {
    let tokenArr = idName.split(del);
    if(index < 0) {
        index = tokenArr.length-1;
    }
    if(index >= tokenArr.length) {
        index %= tokenArr.length;
    } 
    return tokenArr.length > 0 ? tokenArr[index].trim() : "";
}

function formatStr(str) {
    let finalStr = str.toLowerCase();
    return str.length > 0 ? finalStr[0].toUpperCase()+finalStr.substr(1) : finalStr;
} 

function formatDate(dateStr) {
    let fmtStr = "";
    let date = new Date(dateStr);

    if(date.getMonth()+1 < 10) {
        fmtStr += "0";
    }
    fmtStr += date.getMonth()+1 + "/";
    if(date.getUTCDate() < 10) {
        fmtStr += "0";
    }
    fmtStr += date.getUTCDate()+"/"+date.getFullYear();

    return fmtStr;
}

function formatTemp(tempCode) {
    let str = tempCode.substr(0, tempCode.length-1);
    str += String.fromCharCode(176)+tempCode[tempCode.length-1];
    return str;
}

function getAttrByInpID(dataID, mapObj, listAttr="img", listObj=careInstructions) {
    if(!dataID || !mapObj) {
        return;
    }
    if(!mapObj[dataID]) {
        return;
    }
    if(!listObj[mapObj[dataID]]) {
        return;
    }
    return listObj[mapObj[dataID]][listAttr];
}

export const getImageFromURL = (imagePath) => {
    const S3_BUCKET_URL = 'https://garment-picture.s3.amazonaws.com';
    
    if (!imagePath || typeof imagePath !== 'string') {
        return ''; // Return a default image URL or an empty string if imagePath is not valid
    }

    // If imagePath already contains the S3 bucket URL, return it directly
    if (imagePath.startsWith(S3_BUCKET_URL)) {
      return imagePath;
    }

    // Ensure that the imagePath does not have leading slashes or 'images/' prefix
    const cleanPath = imagePath.replace(/^\/|images\//g, '');
    return `${S3_BUCKET_URL}/${cleanPath}`;
};



function getElemByMaxAttr(objArr, attrCheck="value", isDate=false) {
    let maxIndex = -1;
    for(let i=0; i < objArr.length; i++) {
        let obj = objArr[i];
        if(!obj[attrCheck]) {
            continue;
        }
        if(maxIndex < 0) {
            maxIndex = i;
            continue;
        }

        if(isDate) {
            let date1 = new Date(objArr[maxIndex][attrCheck]);
            let date2 = new Date(obj[attrCheck]);
            if(date1 <= date2) {
                maxIndex = i;
            }
        }
        else {
           if(objArr[maxIndex][attrCheck] <= obj[attrCheck]) {
                maxIndex = i;
           }
        }
    }
    return maxIndex < 0 ? null : objArr[maxIndex];
}

function dateComparator(dateX, dateY) {
    let date1 = new Date(dateX);
    let date2 = new Date(dateY);
    if(date1 < date2) {
        return -1;
    }
    else {
        return 1;
    }
}

export { findAttribute, parseID, formatStr, formatDate, formatTemp, getAttrByInpID, getElemByMaxAttr, dateComparator }