export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export const checkValidation = (value, rules) => {
    let isValid = true;

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLegth) {
        isValid = value.length <= rules.maxLegth && isValid;
    }

    if(rules.isEmail) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        isValid = emailPattern.test(value) && isValid;    
    }

    return isValid;
};