const input_decimal = document.querySelector('.input-decimal');
const input_romano = document.querySelector('.input-romano');
const btn = document.querySelector('.btn-converte');
const container_resultado = document.querySelector('.resultado');
const res_principal = document.querySelector('.res-principal');
const res_secundaria = document.querySelector('.res-secundaria');
let check = 0;

const data = [
    { num: 1000, algarismo: 'M' },
    { num: 900, algarismo: 'CM' },
    { num: 500, algarismo: 'D' },
    { num: 400, algarismo: 'CD' },
    { num: 100, algarismo: 'C' },
    { num: 90, algarismo: 'XC' },
    { num: 50, algarismo: 'L' },
    { num: 40, algarismo: 'XL' },
    { num: 10, algarismo: 'X' },
    { num: 9, algarismo: 'IX' },
    { num: 5, algarismo: 'V' },
    { num: 4, algarismo: 'IV' },
    { num: 1, algarismo: 'I' }
];

function firstCheck(input) {

    if (typeof (input) == 'number') {
        for (let i = 0; i < data.length; i++) {
            if (input == data[i].num) {
                res_principal.innerHTML = `${data[i].algarismo}`;
                res_secundaria.innerHTML = `${input}`;
                return true;
            };
        };
    } else {
        for (let i = 0; i < data.length; i++) {
            if (input.toUpperCase() == data[i].algarismo) {
                res_principal.innerHTML = `${data[i].num}`;
                res_secundaria.innerHTML = `${input.toUpperCase()}`;
                return true;
            };
        };
    };

    return false;
};

function converteNumero(input) {
    let resultado = '';
    for (let i = 0; i < data.length; i++) {
        while (data[i].num <= input) {
            input -= data[i].num;
            resultado += data[i].algarismo;
        };
    };
    return resultado;
}

function converteAlgarismo(input) {
    let arrayInput = Array.from(input.toUpperCase());
    let arrayTemp = [];
    for (let i in arrayInput) {
        for (let x of data) {
            if (arrayInput[i] == x.algarismo) {
                arrayTemp.push(x.num);
            };
        };
    };
    let resultado = 0;
    let esquerda, direita;

    for (let i = 0; i < arrayTemp.length; i++) {
        esquerda = arrayTemp[i];
        direita = arrayTemp[i + 1];

        if (esquerda < direita) {
            resultado = resultado - esquerda;
        } else {
            resultado = resultado + esquerda;
        };
    };
    return resultado;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    container_resultado.style.display ='flex';
    let inputValue = 0;
    let resultado = 0;
    let resultadoSec = 0;
    if (input_decimal.value != '') {
        inputValue = Number(input_decimal.value);
    } else {
        inputValue = input_romano.value;
    };
    
    check = firstCheck(inputValue);
    if (!check) {
        if (typeof (inputValue) == 'number') {
            resultado = converteNumero(inputValue);
            res_principal.innerHTML = `${resultado}`;
            res_secundaria.innerHTML = `${inputValue}`;
        } else {
            resultado = converteAlgarismo(inputValue);
            res_principal.innerHTML = `${resultado}`;
            resultadoSec = converteNumero(resultado);
            res_secundaria.innerHTML = `${resultadoSec}`;
        };
    };
    input_decimal.value = '';
    input_romano.value = '';
});