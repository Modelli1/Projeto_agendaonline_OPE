const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julio', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates(e) {
    days_element.innerHTML = '';
    let amount_days = 31;

    if (month == 1) {
        amount_days = 28;
    }

    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function() {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDates();
        });

        days_element.appendChild(day_element);
    }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
}







function agendar(data, tempo, func, cond, intervalo) {
    var aryData = data.split('/'),
        dia = parseInt(aryData[0]),
        mes = parseInt(aryData[1]),
        ano = parseInt(aryData[2]);
    var aryTempo = tempo.split(':'),
        hora = parseInt(aryTempo[0]),
        minuto = parseInt(aryTempo[1]);
    console.log("Necessario Data: " + dia + "/" + mes + "/" + ano + " Tempo: " + hora + ":" + minuto);
    var agora = new Date();
    var diaAtual = agora.getDate(),
        mesAtual = (agora.getMonth() + 1),
        anoAtual = agora.getFullYear(),
        horaAtual = agora.getHours(),
        minAtual = agora.getMinutes();
    console.log("Atual Data: " + diaAtual + "/" + mesAtual + "/" + anoAtual + " Tempo: " + horaAtual + ":" + minAtual);
    if (ano == anoAtual && mes == mesAtual && dia == diaAtual && hora == horaAtual && minuto == minAtual) {
        func();
    } else if (cond) {
        cond = false;
        return setTimeout(scheduler, intervalo, data, tempo, func, cond, intervalo);
    }
}

function scheduler(data, tempo, func, cond, intervalo) {
    return setTimeout(agendar, 0, data, tempo, func, true, intervalo);
}


agendar('18/03/2021', '22:03', function() { alert("Está na hora!"); }, true, 5000);