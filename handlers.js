var calculatorInstance = new Calculator(document.calculator);

(function () {
    var elements = document.getElementsByClassName("button");

    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener('click', function(e) {
            var type = e.target.dataset.type;
            var value = e.target.dataset.value;
            var action = e.target.dataset.action;

            switch(type) {
                case "number":
                    calculatorInstance.pressNum(value);
                    break;
                case "operation":
                    calculatorInstance.operation(value);
                    break;
                case "action":
                    calculatorInstance[action]();
            }
        }, false)
    }

}());