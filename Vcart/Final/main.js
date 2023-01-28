// get Elements
const minus = document.querySelector('.counter__item-minus')
const plus = document.querySelector('.counter__item-plus')
const quantity = document.querySelector('.counter__item-quantity')

let count = 0;

// Quantity updater
minus.addEventListener('click', (e) => {
    if (count > 0)
        quantity.innerText = --count;
});
plus.addEventListener('click', (e) => {
    quantity.innerText = ++count;
});
