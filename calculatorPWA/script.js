function getVal(id){
  return parseFloat(document.getElementById(id).value) || 0;
}

function calculate(){
  let type = document.getElementById("calcType").value;
  let res = "";

  if(type==="pps"||type==="both"){
    let f = getVal("ppsToPrepare")/50;
    let na = 6500*f;
    res += "ППС NaNO2: "+na.toFixed(2)+" кг<br>";
  }

  if(type==="ngt"||type==="both"){
    let f = getVal("ngtToPrepare")/20;
    let chem = 399.91*f;
    res += "NGT Chem: "+chem.toFixed(2)+" кг";
  }

  document.getElementById("results").innerHTML = res;
}
