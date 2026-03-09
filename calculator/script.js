function calculate() {
    const calcType = document.getElementById('calcType').value;
    let results = '';
    
    if (calcType === 'pps' || calcType === 'both') {
        results += calculatePPS();
    }
    
    if (calcType === 'ngt' || calcType === 'both') {
        results += calculateNGT();
    }
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results;
    resultsDiv.style.display = 'block';
}

function calculatePPS() {
    const ppsToPrep = parseFloat(document.getElementById('ppsToPrepare').value) || 0;
    
    if (ppsToPrep <= 0) return '';
    
    const factor = ppsToPrep / 50;
    
    const naNO2 = 6500 * factor;
    const paa = 800 * factor;
    const water = 47.5 * factor;
    
    const nh4NO3 = 5000 * factor;
    const acetate = 210 * factor;
    const uk = 40 * factor;
    const water2 = 46.5 * factor;
    
    return `
        <h3>ППС Раствор №1</h3>
        <div class="result-item">NaNO2: ${naNO2.toFixed(2)} кг (${Math.ceil(naNO2/25)} меш.)</div>
        <div class="result-item">ПАА: ${paa.toFixed(2)} кг (${Math.ceil(paa/25)} меш.)</div>
        <div class="result-item">Вода: ${water.toFixed(2)} м³</div>
        
        <h3>ППС Раствор №2</h3>
        <div class="result-item">NH4NO3: ${nh4NO3.toFixed(2)} кг (${Math.ceil(nh4NO3/25)} меш.)</div>
        <div class="result-item">Ацетат хрома: ${acetate.toFixed(2)} л (${(acetate/36.8).toFixed(1)} канистр)</div>
        <div class="result-item">УК (70%): ${uk.toFixed(2)} л</div>
        <div class="result-item">Вода: ${water2.toFixed(2)} м³</div>
    `;
}

function calculateNGT() {
    const ngtToPrep = parseFloat(document.getElementById('ngtToPrepare').value) || 0;
    
    if (ngtToPrep <= 0) return '';
    
    const factor = ngtToPrep / 20;
    
    const ngtChem = 399.91 * factor;
    const chrysotile = 299.831 * factor;
    const fiber = 30.45 * factor;
    const water = 19.60026 * factor;
    
    return `
        <h3>NGT-Chem-3</h3>
        <div class="result-item">NGT Chem-3: ${ngtChem.toFixed(2)} кг (${Math.ceil(ngtChem/25)} меш.)</div>
        <div class="result-item">Хризотил: ${chrysotile.toFixed(2)} кг (${Math.ceil(chrysotile/25)} меш.)</div>
        <div class="result-item">Фибра: ${fiber.toFixed(2)} кг</div>
        <div class="result-item">Вода: ${water.toFixed(2)} м³</div>
    `;
}