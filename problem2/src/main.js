import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import { getPrice } from "./getPrice.js";

const modalCloseButton = document.getElementById("modalCloseButton");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const swapForm = document.getElementById("swapForm");
const selectedBalance = document.getElementById("balance");
const transferAmount = document.getElementById("transferAmount");
const successMessage = document.getElementById("successMessage");
const transactionHistory = document.getElementById("transactionHistory");
const priceTable = await getPrice();
const transactionLog = [];

var balance = priceTable.reduce((acc, item) => {
  acc[item.currency] = 100;
  return acc;
}, {});

fromCurrency.addEventListener("change", function (e) {
  let currency = e.target.value;
  selectedBalance.value = balance[currency];
  hideSuccessMessage();
});

toCurrency.addEventListener("change", hideSuccessMessage);

swapForm.onsubmit = function (event) {
  event.preventDefault();
  if (transferAmount.value !== "") {
    if (transferAmount.value > balance[fromCurrency.value]) {
      showModal("Transaction cannot be done!!! Transfer amount is greater than the balance");
    } else {
      const fromCurrencyRate = getRate(fromCurrency.value);
      const toCurrencyRate = getRate(toCurrency.value);
      const convertedAmountReceive = (fromCurrencyRate * transferAmount.value) / toCurrencyRate;
      balance = {
        ...balance,
        [fromCurrency.value]: balance[fromCurrency.value] - transferAmount.value,
      };

      balance = {
        ...balance,
        [toCurrency.value]: balance[toCurrency.value] + convertedAmountReceive,
      };

      selectedBalance.value = balance[fromCurrency.value];
      setSuccessMessage(
        `Successfully conver ${transferAmount.value} ${fromCurrency.value} to ${convertedAmountReceive} ${toCurrency.value}`
      );
      transactionLog.unshift(
        `- Successfully conver ${transferAmount.value} ${fromCurrency.value} to ${convertedAmountReceive} ${toCurrency.value}`
      );
      setTransactionLog();
    }
  }
};

modalCloseButton.addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

function getRate(currency) {
  const result = priceTable.find((coin) => {
    return coin.currency === currency;
  });
  return result.price;
}

function showModal(message) {
  document.getElementById("modalContent").textContent = message;
  document.getElementById("modal").style.display = "flex";
}

function setSuccessMessage(message) {
  successMessage.style.display = "block";
  successMessage.textContent = message;
}

function hideSuccessMessage() {
  successMessage.style.display = "none";
}

function setTransactionLog() {
  transactionHistory.innerHTML = "";
  for (let i = 0; i < transactionLog.length; i++) {
    var opt = document.createElement("li");
    opt.textContent = transactionLog[i];
    opt.className = "text-[#4caf50]";
    transactionHistory.appendChild(opt);
  }
}
