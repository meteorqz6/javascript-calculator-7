function isInputValid(input) {
    const positiveIntegerPattern = /^\d+$/;

    if(input.startsWith('//')) {
        validateCustomDelimiterInput(input, positiveIntegerPattern);
    } else {
        validateDefaultInput(input, positiveIntegerPattern);
    }
}

function validateCustomDelimiterInput(input, pattern) {
    const customDelimiterStartIndex = input.indexOf('\\n');
    if(customDelimiterStartIndex === -1){
        throw new Error('[ERROR] 잘못된 값을 입력했습니다.');
    }

    const delimiter = input.slice(2, customDelimiterStartIndex);
    const string = input.slice(customDelimiterStartIndex + 2);
    validateString(string, delimiter, pattern);
}

function validateDefaultInput(input, pattern) {
    const arr = input.split(/[,:]/);
    validateArray(arr, pattern);

}

function validateString(string, delimiter, pattern) {
    const arr = string.split(new RegExp(`[${delimiter},:]`));
    if(arr.length === 0 || arr.some(value => !pattern.test(value))) {
        throw new Error('[ERROR] 잘못된 값을 입력했습니다.');
    }
}

function validateArray(arr, pattern) {
    if(arr.some(value=> !pattern.test(value))) {
        throw new Error('[ERROR] 잘못된 값을 입력했습니다.');
    }
}

export default isInputValid;

