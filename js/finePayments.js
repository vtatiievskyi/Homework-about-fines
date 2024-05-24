"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){
    // Значення з форми
    let fineNumValue = fineNumber.value.trim();
    let passportValue = passport.value.trim();
    let creditCardNumberValue = creditCardNumber.value.trim();
    let cvvValue = cvv.value.trim();
    let amountValue = amount.value.trim();

    // Перевірка, чи штраф існує в базі даних
    let fine = DB.find(f => f.номер === fineNumValue);

    if (!fine) {
        alert("Номер не співпадає");
        return;
    }

    // Перевірка суми штрафу
    if (fine.сума != amountValue) {
        alert("Сума не співпадає");
        return;
    }

    // Перевірка паспортних даних (дві укр літери і шість цифр)
    let passportRegex = /^[А-ЯІЇЄҐа-яіїєґ]{2}\d{6}$/;
    if (!passportRegex.test(passportValue)) {
        alert("Не вірний паспортний номер");
        return;
    }

    // Перевірка номера кредитної картки (16 цифр)
    let creditCardRegex = /^\d{16}$/;
    if (!creditCardRegex.test(creditCardNumberValue)) {
        alert("Не вірна кредитна картка");
        return;
    }

    // Перевірка CVV (3 цифри)
    let cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvvValue)) {
        alert("Не вірний cvv");
        return;
    }

    // Видалення штрафу з бази даних після успішної оплати
    DB = DB.filter(f => f.номер !== fineNumValue);
    data.finesData = DB;  // Оновлення глобальної змінної даних

    alert("Оплата успішна");
}