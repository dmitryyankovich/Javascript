function Calculator(form){
    var self = this;
    var fieldValue = form.FieldValue;
    var current = 0;
    var newNumberFlag = false;
    var currentOperation = "";
    var opCache = [];

    this.decimal = function Decimal() {
        var currFieldValue =  fieldValue.value;
        if (newNumberFlag) {
            currFieldValue = "0.";
            newNumberFlag = false;
        }
        else {
            if (currFieldValue.indexOf(".") === -1) {
                currFieldValue += ".";
            }
        }
        fieldValue.value = currFieldValue;
    };

    this.negative = function Negative() {
        fieldValue.value = + fieldValue.value * -1;
    };

    this.sqrt = function Sqrt() {
        var oper = fieldValue.value+'√';
        var val = checkCache(oper);
        if(!(typeof val === "undefined")) {
            console.log("From cache");
            fieldValue.value = val;
        }
        else {
            console.log("Comp");
            fieldValue.value = parseFloat(Math.sqrt( fieldValue.value));
            addCache(oper, fieldValue.value);
        }
    };

    this.sqr = function Sqr() {
        var oper = fieldValue.value+'^2';
        var val = checkCache(oper);
        if( !(typeof val === "undefined") ) {
            console.log("From cache");
            fieldValue.value = val;
        }
        else {
            console.log("Comp");
            fieldValue.value = parseFloat(Math.pow( fieldValue.value,2));
            addCache(oper, fieldValue.value);
        }
    };

    this.pressNum = function numPressed(Num) {
        if (newNumberFlag) {
            fieldValue.value = Num;
            newNumberFlag = false;
        }
        else {
            if ( fieldValue.value === "0")
                fieldValue.value = Num;
            else
                fieldValue.value += Num;
        }
    };

    this.clearEntry = function clearEntry() {
        fieldValue.value = "0";
        newNumberFlag = true;
    };

    this.clearAll = function clearAll() {
        current = 0;
        currentOperation = "";
        self.clearEntry();
    };

    var compute = function computed(Op) {
        var Readout =  fieldValue.value;
        newNumberFlag = true;
        if ('+' === currentOperation)
            current += +Readout;
        else if ('-' === currentOperation)
            current -= +Readout;
        else if ('/' === currentOperation)
            current /= +Readout;
        else if ('*' === currentOperation)
            current *= +Readout;
        else
            current = +Readout;
        currentOperation = Op;
        fieldValue.value = current;
    };

    this.operation = function operations(Op) {
        var Readout =  fieldValue.value;
        var oper = current + currentOperation + Readout;
        if (newNumberFlag && currentOperation != "=") {
            fieldValue.value = current;
        }
        else {
            if (Op === "=") {
                var val = checkCache(oper);
                if (!(typeof val === "undefined")) {
                    fieldValue.value = val;
                    console.log("From cache");
                }
                else {
                    console.log("Computing");
                    compute(Op);
                    addCache(oper,current)
                }
            }
            else {
                compute(Op)
            }
        }
    };

    var checkCache = function CheckCache(operation) {
        for(var i = 0, len = opCache.length; i < len;i++) {
            if (opCache[i].oper === operation)
                return opCache[i].val;
        }
    };

    var addCache = function AddCache(operation, value) {
        var k = {
            oper : operation,
            val : value
        };
        opCache.push(k)
    };
}

var cal = new Calculator(document.calculator);

document.getElementById("Clear").addEventListener('click',cal.clearAll,false);

document.getElementById("Clear_Entry").addEventListener('click',cal.clearEntry,false);

document.getElementById("Sqrt").addEventListener('click', cal.sqrt, false);

document.getElementById("Sqr").addEventListener('click', cal.sqr, false);

var elements = document.getElementsByClassName("buttons");

for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener('click', function(e) {
        if (e.target.dataset.type === "number") {
            cal.pressNum(e.target.dataset.value);
        }
        else if (e.target.dataset.type === "operation"){
            cal.operation(e.target.dataset.value);
        }
    }, false)
}

document.getElementById("Dec").addEventListener('click', cal.decimal, false);

document.getElementById("Neg").addEventListener('click', cal.negative, false);