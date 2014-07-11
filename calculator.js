function Calculator(form) {
    var self = this;
    var fieldValue = form.editField;
    var firstArgument = 0;
    var newNumberFlag = false;
    var currentOperation = "";
    var opCache = [];

    self.decimal = function () {
        var currFieldValue = fieldValue.value;
        if (newNumberFlag) {
            currFieldValue = "0.";
            newNumberFlag = false;
        } else {
            if (currFieldValue.indexOf(".") === -1) {
                currFieldValue += ".";
            }
        }
        fieldValue.value = currFieldValue;
    };

    self.negative = function () {
        fieldValue.value = +fieldValue.value * -1;
    };

    self.sqrt = function () {
        var operation = fieldValue.value + '√';
        var value = checkCache(operation);
        if (value) {
            console.log("From cache");
            fieldValue.value = value;
        } else {
            console.log("Computing");
            fieldValue.value = parseFloat(Math.sqrt(fieldValue.value));
            addCache(operation, fieldValue.value);
        }
        firstArgument = fieldValue.value;
    };

    self.sqr = function () {
        var operation = fieldValue.value + '^2';
        var value = checkCache(operation);
        if (value) {
            console.log("From cache");
            fieldValue.value = value;
        } else {
            console.log("Computing");
            fieldValue.value = parseFloat(Math.pow(fieldValue.value, 2));
            addCache(operation, fieldValue.value);
        }
        firstArgument = fieldValue.value;
    };

    self.pressNum = function (number) {
        if (newNumberFlag) {
            fieldValue.value = number;
            newNumberFlag = false;
        } else {
            if (fieldValue.value === "0") {
                fieldValue.value = number;
            } else {
                fieldValue.value += number;
            }
        }
    };

    self.clearEntry = function () {
        fieldValue.value = "0";
        newNumberFlag = true;
    };

    self.clearAll = function () {
        firstArgument = 0;
        currentOperation = "";
        self.clearEntry();
    };

    var compute = function (operation) {
        var secondArgument = fieldValue.value;
        newNumberFlag = true;
        switch (currentOperation) {
            case '+':
                firstArgument += +secondArgument;
                break;
            case '-':
                firstArgument -= +secondArgument;
                break;
            case '/':
                firstArgument /= +secondArgument;
                break;
            case '*':
                firstArgument *= +secondArgument;
                break;
            default :
                firstArgument = +secondArgument;
        }
        currentOperation = operation;
        fieldValue.value = firstArgument;
    };

    self.operation = function (operation) {
        var currentFieldData = fieldValue.value;
        var cachingOperation = firstArgument + currentOperation + currentFieldData;
        if (newNumberFlag && currentOperation != "=") {
            fieldValue.value = firstArgument;
        } else {
            if (operation === "=") {
                var value = checkCache(cachingOperation);
                if (value) {
                    fieldValue.value = value;
                    console.log("From cache");
                } else {
                    console.log("Computing");
                    compute(operation);
                    addCache(cachingOperation, firstArgument)
                }
            } else {
                compute(operation)
            }
        }
    };

    var checkCache = function (operation) {
        var value = null;

        for (var i = 0, len = opCache.length; i < len; i++) {
            if (opCache[i].operation === operation) {
               value = opCache[i].value;
                return value;
            }
        }

        return value;
    };

    var addCache = function (operation, value) {
        var addingOperation = {
            operation: operation,
            value: value
        };
        opCache.push(addingOperation)
    };
}