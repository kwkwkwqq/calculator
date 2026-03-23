function val(id){
  return parseFloat(document.getElementById(id).value) || 0;
}

function calculate(){
  let type = document.getElementById("calcType").value;
  let res = "";

  if(type == 0 || type == 2){
    res += calcPPS();
  }

  if(type == 1 || type == 2){
    res += calcNGT();
  }

  document.getElementById("results").innerHTML = res;
}

function calcPPS(){
  let pps = val("ppsToPrepare");
  if(pps <= 0) return "";

  let f = pps / 50;
  let typePPS = document.getElementById("ogpOvp").value;

  let naNO2 = 6500 * f;
  let paa = 800 * f;
  let water = 47.5 * f;

  let nh4 = 5000 * f;
  let acetate = 210 * f;
  let uk = 40 * f;
  let water2 = 46.5 * f;

  if(typePPS == "ovp"){
    naNO2 *= 1.1; 
    paa *= 0.9;   
  }

  return `
  <h3>ППС Раствор №1</h3>
  NaNO2: ${naNO2.toFixed(2)} кг (${Math.ceil(naNO2/25)} меш.)<br>
  ПАА: ${paa.toFixed(2)} кг (${Math.ceil(paa/25)} меш.)<br>
  Вода: ${water.toFixed(2)} м³<br>

  <h3>ППС Раствор №2</h3>
  NH4NO3: ${nh4.toFixed(2)} кг (${Math.ceil(nh4/25)} меш.)<br>
  Ацетат: ${acetate.toFixed(2)} л (${(acetate/36.8).toFixed(1)} канистр)<br>
  УК: ${uk.toFixed(2)} л<br>
  Вода: ${water2.toFixed(2)} м³<br>
  `;
}

function calcNGT(){
  let ngt = val("ngtToPrepare");
  if(ngt <= 0) return "";

  let f = ngt / 20;

  let chem = 399.91 * f;
  let chrys = 299.831 * f;
  let fiber = 30.45 * f;
  let water = 19.60026 * f;

  return `
  <h3>NGT-Chem-3</h3>
  Chem: ${chem.toFixed(2)} кг (${Math.ceil(chem/25)} меш.)<br>
  Хризотил: ${chrys.toFixed(2)} кг (${Math.ceil(chrys/25)} меш.)<br>
  Фибра: ${fiber.toFixed(2)} кг<br>
  Вода: ${water.toFixed(2)} м³<br>
  `;
}

document.getElementById("calcType").addEventListener("change", function(){
  const t = this.value;
  document.getElementById("ppsToPrepare").style.display =
    (t==0||t==2) ? "block" : "none";
  document.getElementById("ogpOvp").style.display =
    (t==0||t==2) ? "block" : "none";
  document.getElementById("ngtToPrepare").style.display =
    (t==1||t==2) ? "block" : "none";
});