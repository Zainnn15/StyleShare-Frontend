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

function formatDate(dateStr, options={ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) {
    let date = new Date(dateStr);
    return date.toLocaleDateString('en-us', options);
}

function formatTemp(tempCode) {
    let str = tempCode.substr(0, tempCode.length-1);
    str += String.fromCharCode(176)+tempCode[tempCode.length-1];
    return str;
}

export { findAttribute, parseID, formatStr, formatDate, formatTemp }