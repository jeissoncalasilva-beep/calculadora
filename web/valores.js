document.addEventListener('DOMContentLoaded', () => {
    const usdtRateInput = document.getElementById('usdt-rate');
    const bcvRateInput = document.getElementById('bcv-rate');
    const paypalRateInput = document.getElementById('paypal-rate');
    const saveRatesBtn = document.getElementById('save-rates');
    
    const passwordInput = document.getElementById('password-input');
    const submitPasswordBtn = document.getElementById('submit-password');
    const passwordForm = document.getElementById('password-form');
    const ratesContainer = document.getElementById('rates-container');
    const errorMessage = document.getElementById('error-message');

    const CORRECT_PASSWORD = 'Amelia2020';
    const SERVER_URL = 'http://localhost:3000/api/rates'; // Cambia esto al URL de tu servidor

    // Lógica para el formulario de contraseña
    submitPasswordBtn.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            passwordForm.style.display = 'none';
            ratesContainer.classList.remove('hidden');
            loadRates();
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // Esta parte del código es para manejar la carga y guardado de los valores
    // desde el servidor, tal como lo habíamos definido antes.

    async function loadRates() {
        try {
            const response = await fetch(SERVER_URL);
            const rates = await response.json();
            usdtRateInput.value = rates.USDT;
            bcvRateInput.value = rates.BCV;
            paypalRateInput.value = rates.PAYPAL;
        } catch (error) {
            console.error('Error loading rates:', error);
            alert('Error al cargar los valores. Asegúrate de que el servidor esté activo.');
        }
    }

    saveRatesBtn.addEventListener('click', async () => {
        const newRates = {
            USDT: parseFloat(usdtRateInput.value),
            BCV: parseFloat(bcvRateInput.value),
            PAYPAL: parseFloat(paypalRateInput.value)
        };

        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newRates: newRates }) // No enviamos la contraseña al servidor
            });
            
            if (response.ok) {
                alert('Valores guardados exitosamente!');
            } else {
                alert('Error al guardar los valores. El servidor respondió con un error.');
            }
        } catch (error) {
            console.error('Error saving rates:', error);
            alert('Error de conexión al servidor.');
        }
    });
});