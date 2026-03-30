function getNumberValue(id) {
    const element = document.getElementById(id);
    if (!element) return 0;
    const value = parseFloat(element.value);
    return isNaN(value) ? 0 : value;
}

function calculate() {
    console.log("Calculate started"); 
    
    const selector = document.getElementById('calculatorSelector');
    const selectedCalc = selector?.value || 'pps';
    const resultsDiv = document.getElementById('results');
    
    let results = '';
    
    switch(selectedCalc) {
        case 'pps':
            results = calculatePPS();
            break;
        case 'ngt':
            results = calculateNGT();
            break;
        default:
            results = '<p>Выберите калькулятор</p>';
    }
    
    if (resultsDiv) {
        if (results === '') {
            resultsDiv.innerHTML = '<p>Введите объем для расчета</p>';
        } else {
            resultsDiv.innerHTML = results;
        }
        resultsDiv.style.display = 'block';
    }
    
    console.log("Calculate finished");
}

function calculatePPS() {
    const ppsToPrep = getNumberValue('ppsToPrepare');
    const rirType = document.getElementById('rirType')?.value || 'ovp';
    
    if (ppsToPrep <= 0) {
        return '<p>Введите объем ППС для приготовления</p>';
    }
    
    let ppsVolume, ngtVolume;
    
    if (rirType === 'ovp') {
        ppsVolume = 30;
        ngtVolume = 40;
    } else {
        ppsVolume = 20;
        ngtVolume = 50;
    }
    
    const totalVolume = ppsVolume + ngtVolume;
    const ppsRatio = ppsVolume / totalVolume;
    const ngtRatio = ngtVolume / totalVolume;
    
    const actualPpsVolume = ppsToPrep * ppsRatio;
    const actualNgtVolume = ppsToPrep * ngtRatio;
    const factor = actualPpsVolume / 50;
    
    const naNO2 = 6500 * factor;
    const paa = 800 * factor;
    const water1 = 47.5 * factor;
    
    const nh4NO3 = 5000 * factor;
    const acetate = 210 * factor;
    const uk = 40 * factor;
    const water2 = 46.5 * factor;
    
    const naNO2Bags = Math.ceil(naNO2 / 25);
    const paaBags = Math.ceil(paa / 25);
    const nh4NO3Bags = Math.ceil(nh4NO3 / 25);
    const acetateCans = Math.ceil(acetate / 36.8);
    
    let rirName = (rirType === 'ovp') ? 'ОВП' : 'ОГП';
    
    let html = '<div class="result-block">';
    html += '<h3>Расчет ППС</h3>';
    html += `<p><strong>Тип РИР:</strong> ${rirName}</p>`;
    html += `<p><strong>Исходное соотношение:</strong> ППС ${ppsVolume} м³ : NGT ${ngtVolume} м³</p>`;
    html += `<p><strong>Для приготовления ${ppsToPrep} м³ ППС потребуется:</strong></p>`;
    html += `<ul>`;
    html += `<li>ППС: ${actualPpsVolume.toFixed(2)} м³</li>`;
    html += `<li>NGT: ${actualNgtVolume.toFixed(2)} м³</li>`;
    html += `</ul>`;
    
    html += '<h4>Раствор №1 (на основе ППС):</h4>';
    html += `<ul>`;
    html += `<li>Нитрит натрия (NaNO2): ${naNO2.toFixed(2)} кг (${naNO2Bags} меш. по 25 кг)</li>`;
    html += `<li>ПАА (EOR-2517): ${paa.toFixed(2)} кг (${paaBags} меш. по 25 кг)</li>`;
    html += `<li>Вода: ${water1.toFixed(2)} м³ (${(water1 * 1000).toFixed(0)} литров)</li>`;
    html += `</ul>`;
    
    html += '<h4>Раствор №2 (на основе NGT):</h4>';
    html += `<ul>`;
    html += `<li>Нитрат аммония (NH4NO3): ${nh4NO3.toFixed(2)} кг (${nh4NO3Bags} меш. по 25 кг)</li>`;
    html += `<li>Ацетат хрома (50%): ${acetate.toFixed(2)} л (${acetateCans} канистр по 36.8 л)</li>`;
    html += `<li>УК (70%): ${uk.toFixed(2)} л</li>`;
    html += `<li>Вода: ${water2.toFixed(2)} м³ (${(water2 * 1000).toFixed(0)} литров)</li>`;
    html += `</ul>`;
    html += '</div>';
    
    return html;
}

function calculateNGT() {
    const ngtToPrep = getNumberValue('ngtToPrepare');
    
    if (ngtToPrep <= 0) {
        return '<p>Введите объем NGT для приготовления</p>';
    }
    
    const factor = ngtToPrep / 20;
    
    const ngtChem = 399.91 * factor;
    const chrysotile = 299.831 * factor;
    const fiber = 30.45 * factor;
    const water = 19.60026 * factor;
    
    const ngtChemBags = Math.ceil(ngtChem / 25);
    const chrysotileBags = Math.ceil(chrysotile / 25);
    
    let html = '<div class="result-block">';
    html += '<h3>🔧 Расчет NGT-3</h3>';
    html += `<p><strong>Для приготовления ${ngtToPrep} м³ NGT-3 потребуется:</strong></p>`;
    html += `<ul>`;
    html += `<li>NGT Chem-3: ${ngtChem.toFixed(2)} кг (${ngtChemBags} меш. по 25 кг)</li>`;
    html += `<li>Хризотил: ${chrysotile.toFixed(2)} кг (${chrysotileBags} меш. по 25 кг)</li>`;
    html += `<li>Фибра: ${fiber.toFixed(2)} кг</li>`;
    html += `<li>Вода: ${water.toFixed(2)} м³ (${(water * 1000).toFixed(0)} литров)</li>`;
    html += `</ul>`;
    html += '</div>';
    
    return html;
}
