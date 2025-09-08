document.addEventListener('DOMContentLoaded', () => {
    // Selectores
    const bsInput = document.getElementById('bs-input');
    const outputInput = document.getElementById('output-input');
    const outputSymbol = document.getElementById('output-symbol');
    const currencyToggle = document.getElementById('currency-toggle');
    const currencyList = document.getElementById('currency-list');
    const paypalLink = document.getElementById('paypal-link');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    const SERVER_URL = 'http://localhost:3000/api/rates'; // Cambia esto al URL de tu servidor
    let rates = {};
    let currentCurrency = 'USDT';

    async function fetchRates() {
        try {
            const response = await fetch(SERVER_URL);
            rates = await response.json();
        } catch (error) {
            console.error('Error fetching rates:', error);
            // Opcional: usar valores por defecto en caso de error
            rates = { USDT: 35.5, BCV: 36.5, PAYPAL: 38.0 };
        }
        updateConversion('bs'); // Actualiza la conversión después de cargar los datos
    }

    function updateConversion(source) {
        let bsValue = 0;
        let outputValue = 0;

        if (source === 'bs') {
            bsValue = parseFloat(bsInput.value);
            if (!isNaN(bsValue)) {
                outputValue = bsValue / rates[currentCurrency];
                outputInput.value = outputValue.toFixed(2);
            }
        } else if (source === 'output') {
            outputValue = parseFloat(outputInput.value);
            if (!isNaN(outputValue)) {
                bsValue = outputValue * rates[currentCurrency];
                bsInput.value = bsValue.toFixed(2);
            }
        }
    }

    bsInput.addEventListener('input', () => updateConversion('bs'));
    outputInput.addEventListener('input', () => updateConversion('output'));

    currencyToggle.addEventListener('click', () => {
        currencyList.classList.toggle('hidden');
    });

    currencyList.addEventListener('click', (e) => {
        const selectedCurrency = e.target.getAttribute('data-currency');
        if (selectedCurrency) {
            currentCurrency = selectedCurrency;
            currencyToggle.textContent = selectedCurrency + ' ▼';
            outputSymbol.textContent = selectedCurrency;
            currencyList.classList.add('hidden');
            updateConversion('bs');

            if (selectedCurrency === 'PAYPAL') {
                paypalLink.style.display = 'block';
                paypalLink.href = "https://tueditablelink.com";
            } else {
                paypalLink.style.display = 'none';
            }
        }
    });

    menuBtn.addEventListener('click', () => {
        sidebar.style.width = "250px";
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== menuBtn) {
            sidebar.style.width = "0";
        }
    });

    fetchRates(); // Cargar los valores al iniciar la página
});