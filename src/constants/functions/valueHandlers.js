import { careInstructions } from "../data/lists";

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

export { findAttribute, parseID, formatStr, formatDate, formatTemp, getAttrByInpID }