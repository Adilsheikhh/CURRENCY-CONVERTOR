const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultAmount = document.getElementById("resultAmount");

// Populate currency options
fetch('https://api.exchangerate-api.com/v4/latest/USD')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
      fromCurrencySelect.add(option);
      toCurrencySelect.add(option.cloneNode(true));
    });
  });

// Search Functionality - Removed
/* searchBtn.addEventListener("click", () => {
  const searchTerm = searchCurrencyInput.value.toUpperCase();
  const options = Array.from(fromCurrencySelect.options);
  const filteredOptions = options.filter(option => option.value.includes(searchTerm));
  fromCurrencySelect.innerHTML = '';
  filteredOptions.forEach(option => {
    fromCurrencySelect.add(option.cloneNode(true));
  });
  toCurrencySelect.innerHTML = '';
  filteredOptions.forEach(option => {
    toCurrencySelect.add(option.cloneNode(true));
  });
}); */

convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  // Fetch conversion rates from API (replace with your API call)
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const conversionRate = data.rates[toCurrency];

      const convertedAmount = amount * conversionRate;
      resultAmount.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error fetching conversion rates:", error);
      resultAmount.textContent = "Error converting";
    });
});