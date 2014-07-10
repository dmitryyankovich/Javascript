"use strict";

var calc = document.calculator;
var current = 0;
var newNumberFlag = false;
var currentOperation = "";
var opCache = [];

var decimal = function Decimal (){
    var currFieldValue = calc.FieldValue.value;
    if (newNumberFlag)
    {
        currFieldValue = "0.";
        newNumberFlag = false;
    }
    else
    {
        if (currFieldValue.indexOf(".") == -1) {
            currFieldValue += ".";
        }
    }
    calc.FieldValue.value = currFieldValue;
};

var negative = function Negative (){
    calc.FieldValue.value =
        parseFloat(calc.FieldValue.value) * -1;
};

var sqrt = function Sqrt(){
    var oper=calc.FieldValue.value+'√';
    var val = checkcache(oper);
    if( !(typeof val == "undefined") ){
        console.log("From cache");
        calc.FieldValue.value = val;}
    else {
        console.log("Comp");
        calc.FieldValue.value = parseFloat(Math.sqrt(calc.FieldValue.value));
        addcache(oper,calc.FieldValue.value);
    }
};

var sqr = function Sqr(){
    var oper=calc.FieldValue.value+'^2';
    var val = checkcache(oper);
    if( !(typeof val == "undefined") ){
        console.log("From cache");
        calc.FieldValue.value = val;}
    else {
        console.log("Comp");
        calc.FieldValue.value = parseFloat(Math.pow(calc.FieldValue.value,2));
        addcache(oper,calc.FieldValue.value);
    }
};

var pressnum = function NumPressed(Num){
    if (newNumberFlag)
    {
        calc.FieldValue.value = Num;
        newNumberFlag = false;
    }
    else
    {
        if (calc.FieldValue.value == "0")
            calc.FieldValue.value = Num;
        else
            calc.FieldValue.value += Num;
    }
};

var clearEntry = function ClearEntry (){
    calc.FieldValue.value = "0";
    newNumberFlag = true;
};

var clearAll = function Clear (){
    current = 0;
    currentOperation = "";
    clearEntry();
};

var operation = function Operation (Op) {
    var Readout = calc.FieldValue.value;
    var oper = current + currentOperation + Readout;
    if (newNumberFlag && currentOperation != "=") {
        calc.FieldValue.value = current;
    }
    else {
        if (Op == "=") {
            var val = checkcache(oper);
            if (!(typeof val == "undefined")) {
                calc.FieldValue.value = val;
                console.log("From cache");
            }
            else {
                console.log("Computing");
                newNumberFlag = true;
                if ('+' == currentOperation)
                    current += parseFloat(Readout);
                else if ('-' == currentOperation)
                    current -= parseFloat(Readout);
                else if ('/' == currentOperation)
                    current /= parseFloat(Readout);
                else if ('*' == currentOperation)
                    current *= parseFloat(Readout);
                else
                    current = parseFloat(Readout);
                currentOperation = Op;
                calc.FieldValue.value = current;
                addcache(oper,current)
            }
        }
        else {
            newNumberFlag = true;
            if ('+' == currentOperation)
                current += parseFloat(Readout);
            else if ('-' == currentOperation)
                current -= parseFloat(Readout);
            else if ('/' == currentOperation)
                current /= parseFloat(Readout);
            else if ('*' == currentOperation)
                current *= parseFloat(Readout);
            else
                current = parseFloat(Readout);
            currentOperation = Op;
            calc.FieldValue.value = current;
        }
    }
};

var checkcache = function checkCache(operation){
    for(var i =0; i < opCache.length;i++){
        if (opCache[i].oper === operation)
        return opCache[i].val;
    }
};

var addcache = function addCache(operation, value){
    var k = {
      oper : operation,
      val : value
    };
    opCache.push(k)
};

document.querySelector("#Clear").addEventListener('click',clearAll,false);

document.querySelector("#Clear_Entry").addEventListener('click',clearEntry,false);

document.querySelector("#Sqrt").addEventListener('click', sqrt, false);

document.querySelector("#Sqr").addEventListener('click', sqr, false);

document.querySelector('#zero').addEventListener('click',function(){pressnum(0)},false);

document.querySelector("#one").addEventListener('click', function(){pressnum(1)},false);

document.querySelector("#two").addEventListener('click', function(){pressnum(2)},false);

document.querySelector("#three").addEventListener('click', function(){pressnum(3)},false);

document.querySelector("#four").addEventListener('click', function(){pressnum(4)},false);

document.querySelector("#five").addEventListener('click', function(){pressnum(5)},false);

document.querySelector("#six").addEventListener('click', function(){pressnum(6)},false);

document.querySelector("#seven").addEventListener('click', function(){pressnum(7)},false);

document.querySelector("#eight").addEventListener('click', function(){pressnum(8)},false);

document.querySelector("#nine").addEventListener('click', function(){pressnum(9)},false);

document.querySelector("#dec").addEventListener('click', decimal, false);

document.querySelector("#neg").addEventListener('click', negative, false);

document.querySelector("#plus").addEventListener('click', function(){operation('+')});

document.querySelector("#multiply").addEventListener('click', function(){operation('*')});

document.querySelector("#minus").addEventListener('click', function(){operation('-')});

document.querySelector("#divide").addEventListener('click', function(){operation('/')});

document.querySelector("#equals").addEventListener('click', function(){operation('=')});