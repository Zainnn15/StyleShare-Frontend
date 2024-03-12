function checkOnID(elemID, id) {
    if(elemID === id) {
        return true;
    }
    return false;
}

function selectID(idName) {
    let e_inp = document.getElementById(idName);
    if(!e_inp) {
        return;
    }
    e_inp.focus();
    // e_inp.select();
}

function clickID(idName) {
    let e_content = document.getElementById(idName);
    if(!e_content) {
        return;
    }
    e_content.click();
}

function signOut() {
    return;
}

function changeTitle(titleName) {
    document.title = titleName;
}

function removeAllChildNodes(parent) {
    if(!parent) {
        return;
    }
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addErrorMessage(element, message) {
    if(!element) {
        return;
    }
    //check if node element
    if(element.nodeType !== Node.ELEMENT_NODE) {
        element = document.getElementById(element);
        if(!element) {
            return;
        }
    }

    //delete message
    removeAllChildNodes(element);

    //add error message
    if(message) {
        let e_message = document.createElement("p");
        e_message.className = "message-error";
        e_message.innerHTML = `*${message.trim()}*`;
        element.appendChild(e_message);
    }
}

function addErrorMessageByID(id, message) {
    let e_inp = document.getElementById(id);
    addErrorMessage(e_inp, message);
}

//common validations
function validate(idName) {
    let e_inp = document.getElementById(idName);
    if(!e_inp) {
        return false;
    }
    let val = e_inp.value.trim().toLowerCase();
    if(val.length === 0) {
        addErrorMessage(e_inp.id+"_error", "Must not be empty");
        return false;
    }

    addErrorMessage(e_inp.id+"_error", null);
    return true;
}

function validateInpName(formDataName, checkNotEmpty) {
    if(!checkNotEmpty || checkNotEmpty.trim() === "") {
        addErrorMessage(formDataName+"_error", "Please select an option");
        return false;
    }
    addErrorMessage(formDataName+"_error", null);
    return true;
}

//MUST: each object in namesToValidate array must have "name" property and "check" property
function validatePage(querySelect="input", namesToValidate=[]) {
    let isValid = true;

    //validate inputs
    if(querySelect) {
        let inpArr = document.querySelectorAll(querySelect);
        inpArr.forEach((inp) => {
            isValid = validate(inp.id) && isValid;
        });
    }

    //validate per name (radio, checkbox)
    namesToValidate.forEach((obj)=>{
        isValid = validateInpName(obj.name, obj.check) && isValid;
    });
    
    return isValid;
}

//options must be an object with "value" property
function validateSelect(idName, options) {
    let e_select = document.getElementById(idName);
    if(!e_select) {
        return false;
    }
    if(e_select.value === "") {
        addErrorMessage(idName+"_error", "Please select an option");
        return false;
    }

    //if there are options
    if(options) {
        for(let i=0; i < options.length; i++) {
            if(e_select.value === options[i].value) {
                addErrorMessage(idName+"_error", null);
                return true;
            }
        }
        addErrorMessage(idName+"_error", "Please select an option");
        return false;
    }
    addErrorMessage(idName+"_error", null);
    return true;
}

export { checkOnID, selectID, clickID, signOut, changeTitle, addErrorMessage, addErrorMessageByID,
    validate, validateInpName, validatePage, validateSelect };