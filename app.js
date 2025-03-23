// API URL for fetching exchange rates
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let currencyData = {};  // Store currency data globally

// Fetch currencies and populate dropdowns
async function getCurrencies() {
    const response = await fetch(API_URL);
    const data = await response.json();
    currencyData = data.rates;

    const currencies = Object.keys(currencyData);

    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    currencies.forEach(currency => {
        let optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        let optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

// Convert currency
async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
        alert('Please provide valid inputs!');
        return;
    }

    const rateFrom = currencyData[fromCurrency];
    const rateTo = currencyData[toCurrency];

    // Get USD to the selected currency rates
    const conversionRate = rateTo / rateFrom;

    // Calculate converted amount
    const result = amount * conversionRate;
    document.getElementById('result').textContent = result.toFixed(2);
}

// Set up event listener for the convert button
document.getElementById('convert-btn').addEventListener('click', convertCurrency);

// Initial function call to populate the currencies
getCurrencies();
