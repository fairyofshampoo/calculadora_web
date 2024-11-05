var operacion = "";
var pantalla;

window.onload = function () {
    pantalla = document.getElementById("txt_resultado");
}

function limpiar() {
    operacion = "";
    pantalla.value = operacion;
}

function borrar() {
    if (operacion.length > 0) {
        operacion = operacion.substring(0, operacion.length - 1);
    }
    pantalla.value = operacion;
}

function clickbutton(element) {
    switch (element.id) {
        case 'b00': operacion += "0"; break;
        case 'b01': operacion += "1"; break;
        case 'b02': operacion += "2"; break;
        case 'b03': operacion += "3"; break;
        case 'b04': operacion += "4"; break;
        case 'b05': operacion += "5"; break;
        case 'b06': operacion += "6"; break;
        case 'b07': operacion += "7"; break;
        case 'b08': operacion += "8"; break;
        case 'b09': operacion += "9"; break;
        case 'b_sum':
            if (validarOperadores()) {
                operacion += "+";
            }
            break;
        case 'b_res':
            if (validarOperadores()) {
                operacion += "-";
            }
            break;
        case 'b_mul':
            if (validarOperadores()) {
                operacion += "*";
            }
            break;
        case 'b_div':
            if (validarOperadores()) {
                operacion += "/";
            }
            break;
        case 'b_pun':
            if (validarPunto()) {
                operacion += ".";
            }
            break;
        case 'b_ig':
            if (operacion.length > 0) {
                try {
                    operacion = "" + eval(operacion);
                } catch (e) {
                    alert("La operación no es válida");
                    operacion = "";
                }
            }
            break;
        case 'b_open':
            if (puedeAbrirParentesis()) {
                operacion += "(";
            }
            break;
        case 'b_close':
            if (puedeCerrarParentesis()) {
                operacion += ")";
            }
            break;
    }
    pantalla.value = operacion;
}

function validarOperadores() {
    if (operacion.length === 0 || operacion.endsWith("(")) {
        return false; 
    }
    return !operacion.endsWith("+") && !operacion.endsWith("-") &&
           !operacion.endsWith("*") && !operacion.endsWith("/");
}

function validarPunto() {
    if (operacion.length === 0 || validarOperadores()) {
        return true;
    }

    var temp = operacion + '.';
    try {
        eval(temp);
        return true;
    } catch (e) {
        return false;
    }
}

function puedeAbrirParentesis() {
    return operacion.length === 0 || 
           /[\+\-\*\/]$/.test(operacion) || 
           operacion.endsWith("(");
}

function puedeCerrarParentesis() {
    let apertura = (operacion.match(/\(/g) || []).length;
    let cierre = (operacion.match(/\)/g) || []).length;
    return apertura > cierre &&
           !operacion.endsWith("(") &&
           !/[\+\-\*\/]$/.test(operacion);
}
