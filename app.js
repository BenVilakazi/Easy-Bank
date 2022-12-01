"use strict";

const menu = document.querySelector(".mobile-menu");
const menuLinks = document.querySelector(".nav");

const currencyOne = document.querySelector(".cur-converter__currency-one");
const currencyTwo = document.querySelector(".cur-converter__currency-two");

const amountOne = document.querySelector(".cur-converter__amount-one");
const amountTwo = document.querySelector(".cur-converter__amount-two");

const rateEl = document.querySelector(".cur-converter__rate");
const swap = document.querySelector(".cur-converter__btn");

const timeEl = document.querySelector(".cur-converter__paragraph");

const cookieMsg = document.querySelector(".cookie-message");
const cookieBtn = document.querySelector(".cookie-message__btn-container");

const closeBtn = document.querySelector(".modal__btn");
const navBtn = document.querySelector(".nav__btn");
const headerBtn = document.querySelector(".header__btn");
const footerBtn = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btns = [navBtn, headerBtn, footerBtn];
const closeBtns = [closeBtn, overlay];

const calculate = function () {
  const currencyOneValue = currencyOne.value;
  const currencyTwoValue = currencyTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/12956613a332dfb77adad269/latest/${currencyOneValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      const date = data.time_last_update_utc.slice(0, -9);
      timeEl.innerText = `Last updated on: ${date}`;
      const rate = data.conversion_rates[currencyTwoValue];
      rateEl.innerText = `1 ${currencyOneValue} = ${rate} ${currencyTwoValue}`;

      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
};
const swapAmount = function (e) {
  e.preventDefault();
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
};

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);

amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", swapAmount);

calculate();

menu.addEventListener("click", function () {
  menu.classList.toggle("active");
  menuLinks.classList.toggle("active");
});

cookieBtn.addEventListener("click", function (e) {
  e.preventDefault();
  cookieMsg.classList.remove("active");
});

setTimeout(function () {
  cookieMsg.classList.add("active");
}, 2000);

btns.forEach((el) => {
  console.log(el);
  el.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("active");
    overlay.classList.add("active");
  });
});

closeBtns.forEach((el) => {
  console.log(el);
  el.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});
