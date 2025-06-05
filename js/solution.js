document.getElementById("weather-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const city = document.getElementById("city-input").value.trim();
    const apiKey = "1bd88d602125f912e04266d35d8437e1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    const resultDiv = document.getElementById("weather-result");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temperatura = data.main.temp;
            const umidade = data.main.humidity;
            const clima = data.weather[0].main.toLowerCase(); // Ex: rain, clear, clouds
            const descricao = data.weather[0].description;

            let alerta = "";

            // 💡 Condições de risco para populações vulneráveis
            if (temperatura >= 30 && umidade >= 70 && clima.includes("rain")) {
                alerta = "⚠️ Risco alto de proliferação de mosquitos como o da dengue. Evite acúmulo de água.";
            } else if (temperatura <= 15 && umidade < 40) {
                alerta = "⚠️ Risco de doenças respiratórias por clima seco e frio. Hidrate-se e evite locais fechados.";
            } else if (clima.includes("rain") && umidade >= 80) {
                alerta = "🌧️  Atenção com enchentes e doenças transmitidas pela água em áreas vulneráveis.";
            } else if (temperatura > 35) {
                alerta = "⚠️ Onda de calor: risco de desidratação e insolação, especialmente para crianças e idosos.";
            } else {
                alerta = "✅ Sem riscos graves identificados no momento.";
            }

            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                <p><strong>Clima:</strong> ${descricao}</p>
                <p><strong>Umidade:</strong> ${umidade}%</p>
                <p><strong>Vento:</strong> ${data.wind.speed} km/h</p>
                <div class="alerta"><strong>${alerta}</strong></div>
            `;
        } else {
            resultDiv.innerHTML = `<p>Cidade não encontrada.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Erro ao buscar dados do clima.</p>`;
        console.error(error);
    }
});
