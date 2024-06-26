"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey){
    /*
     Напишіть свій код тут!
     Як ви бачите функція повертає статичні дані.
     Замість масиву який прописаний хардкодом, вам необхідно реалізувати цю функцію
     так, щоб вона повертала масив відповідно переданому значенню в функцію.
     Саме значення - це "Пошук за номером" або "Пошук за типом штрафу"
     Тип штрафу може бути тільки
     - Перевищення швидкості
     - Невірне паркування
     - Їзда у не тверезому стані
     */

     // Перевірка, чи це пошук за номером штрафу (повинен бути цифровим)
     if (!isNaN(searchKey)) {
        return DB.filter(fine => fine.номер.includes(searchKey));
    }

    // Пошук за типом штрафу
    const validTypes = ["Перевищення швидкості", "Невірне паркування", "Їзда у не тверезому стані"];
    if (validTypes.includes(searchKey)) {
        return DB.filter(fine => fine.тип === searchKey);
    }

    // Якщо значення не відповідає жодному з вищезазначених критеріїв
    return [];

   /* return [
        {номер: '001', тип: 'Перевищення швидкості', сума: 100, дата: '2023-01-15'}
    ];*/
}

