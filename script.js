function getNumberValue(id) {
    const element = document.getElementById(id);
    if (!element) return 0;
    const value = parseFloat(element.value);
    return isNaN(value) ? 0 : value;
}

function toggleSections() {
    const calcType = document.getElementById('calcType')?.value || 'pps';
    const ppsSection = document.getElementById('ppsSection');
    const ngtSection = document.getElementById('ngtSection');
    
    if (!ppsSection || !ngtSection) return;
    
    if (calcType === 'pps') {
        ppsSection.style.display = 'block';
        ngtSection.style.display = 'none';
    } else if (calcType === 'ngt') {
        ppsSection.style.display = 'none';
        ngtSection.style.display = 'block';
    } else {
        ppsSection.style.display = 'block';
        ngtSection.style.display = 'block';
    }
}

function calculate() {
    console.log("Calculate started"); 
    
    const calcType = document.getElementById('calcType')?.value || 'pps';
    let results = '';
    
    if (calcType === 'pps' || calcType === 'both') {
        results += calculatePPS();
    }
    
    if (calcType === 'ngt' || calcType === 'both') {
        results += calculateNGT();
    }
    
    const resultsDiv = document.getElementById('results');
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
    const ppsVolume = getNumberValue('ppsVolume');
    const ngtVolume = getNumberValue('ngtVolume');
    
    if (ppsToPrep <= 0) return '<p>Введите объем ППС для приготовления</p>';
    
    const totalVolume = ppsVolume + ngtVolume;
    if (totalVolume <= 0) return '<p>Введите объемы ППС и NGT</p>';
    
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
    
    let html = '<div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">';
    html += '<h3 style="margin-top: 0;">📦 Расчет ППС</h3>';
    html += `<p><strong>Исходное соотношение:</strong> ППС ${ppsVolume} м³ : NGT ${ngtVolume} м³</p>`;
    html += `<p><strong>Для приготовления ${ppsToPrep} м³ ППС потребуется:</strong></p>`;
    html += `<ul style="margin: 10px 0;">`;
    html += `<li>ППС: ${actualPpsVolume.toFixed(2)} м³</li>`;
    html += `<li>NGT: ${actualNgtVolume.toFixed(2)} м³</li>`;
    html += `</ul>`;
    
    html += '<h4>🧪 Раствор №1 (на основе ППС):</h4>';
    html += `<ul>`;
    html += `<li>Нитрит натрия (NaNO2): ${naNO2.toFixed(2)} кг (${naNO2Bags} меш. по 25 кг)</li>`;
    html += `<li>ПАА (EOR-2517): ${paa.toFixed(2)} кг (${paaBags} меш. по 25 кг)</li>`;
    html += `<li>Вода: ${water1.toFixed(2)} м³ (${(water1 * 1000).toFixed(0)} литров)</li>`;
    html += `</ul>`;
    
    html += '<h4>🧪 Раствор №2 (на основе NGT):</h4>';
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
    
    if (ngtToPrep <= 0) return '<p>Введите объем NGT для приготовления</p>';
    
    // Коэффициент пересчета с базы 20 м3
    const factor = ngtToPrep / 20;
    
    // Расчет компонентов из Excel таблицы (на 20 м3)
    const ngtChem = 399.91 * factor;           // NGT Chem-3
    const chrysotile = 299.831 * factor;       // Хризотил
    const fiber = 30.45 * factor;              // Фибра
    const water = 19.60026 * factor;           // Вода
    
    // Расчет мешков (мешок 25 кг)
    const ngtChemBags = Math.ceil(ngtChem / 25);
    const chrysotileBags = Math.ceil(chrysotile / 25);
    
    let html = '<div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">';
    html += '<h3 style="margin-top: 0;">🔧 Расчет NGT-3</h3>';
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

document.addEventListener('DOMContentLoaded', function() {
    const calcType = document.getElementById('calcType');
    if (calcType) {
        calcType.addEventListener('change', toggleSections);
    }
    
    toggleSections();
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
    
    console.log("Скрипт загружен, калькулятор готов");
});