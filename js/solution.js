document.getElementById("weather-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const city = document.getElementById("city-input").value.trim();
    const apiKey = "0bd88d602125f912e04266d35d8437e1";
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
                alerta = "🦟 Condições favoráveis à proliferação do Aedes aegypti. Recomendam-se ações de monitoramento de criadouros, campanhas de conscientização e intensificação da vigilância para arboviroses como dengue, zika e chikungunya.";
            } else if (temperatura <= 15 && umidade < 40) {
                alerta = "❄️ Clima frio e seco: aumento de síndromes respiratórias. Indica-se reforço em unidades sentinela, distribuição de material informativo e ampliação de acesso à vacinação contra gripe e doenças respiratórias.";
            } else if (clima.includes("rain") && umidade >= 80) {
                alerta = "🌧️ Risco elevado de doenças de veiculação hídrica, como leptospirose, hepatite A e diarreias infecciosas. Sugerem-se ações de saneamento emergencial, alerta em áreas de alagamento e orientações sobre higiene pós-enchente.";
            } else if (temperatura > 35) {
                alerta = "🌡️ Onda de calor intensa: aumento de casos de desidratação, insolação e agravamento de comorbidades. Recomendam-se intervenções em centros de acolhimento, distribuição de água e campanhas de prevenção para populações vulneráveis.";
            } else if (temperatura >= 25 && umidade >= 60 && clima.includes("nublado")) {
                alerta = "🌫️ Ambientes úmidos e pouca ventilação favorecem surtos de doenças alérgicas e respiratórias (asma, rinite). Estratégias de controle ambiental e orientação em escolas e postos de saúde são recomendadas.";
            } else if (temperatura >= 28 && umidade <= 30) {
                alerta = "🔥 Tempo quente e seco: risco de agravamento de quadros respiratórios, irritações oculares e desidratação leve. Indica-se reforço na rede de atenção primária e ampliação da distribuição de insumos como soro fisiológico.";
            } else if (temperatura < 10) {
                alerta = "🧊 Frio extremo: propício ao aumento de internações por doenças respiratórias agudas. Recomendam-se campanhas de vacinação, abrigos emergenciais e monitoramento de populações em situação de rua.";
            } else if (clima.includes("neblina") || clima.includes("nevoeiro")) {
                alerta = "🌫️ Alta umidade com baixa temperatura: condições críticas para surtos respiratórios e infecções oportunistas. Sugere-se atenção especial a grupos de risco e protocolos de triagem nas unidades de saúde.";
            } else {
                alerta = "✅ Nenhuma condição crítica identificada. Reforça-se a importância da vigilância contínua e da coleta de dados regionais para monitoramento epidemiológico.";
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