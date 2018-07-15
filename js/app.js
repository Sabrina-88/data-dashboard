var dropMenu = document.getElementById("generation-select");
dropMenu.addEventListener("change", selecionaTurma);

window.onload = carregaMenu();

var frstSprtTechAQP1 = {
    "grades": 0
};
var frstSprtTechAQP2 = {
    "grades": 0
};

function selecionaTurma(){
  var generationYear = dropMenu.value;
  var showGeneration = document.getElementById("generation-display");
  showGeneration.innerHTML = "";
  frstSprtTechAQP1.grades = 0;
  frstSprtTechAQP2.grades = 0;

  for (generations in data.AQP){
    for (j in data.AQP[generations].students){
        var grades = data.AQP[generations].students[j].sprints[0].score.tech;
        if (grades >= 1260 && generations == "2016-2"){
          frstSprtTechAQP1.grades += 1;
        } else if (grades >= 1260 && generations == "2017-1") {
          frstSprtTechAQP2.grades += 1;
        }
      }
  }

  var createH2 = document.createElement("h2");
  var createP = document.createElement("p");
  createH2.innerHTML = "SPRINT 1";
  
  if (dropMenu.value == "2016-2"){
      createP.innerHTML = frstSprtTechAQP1.grades;
  } else if (dropMenu.value == "2017-1"){
      createP.innerHTML = frstSprtTechAQP2.grades;
  }
      showGeneration.appendChild(createH2);
      showGeneration.appendChild(createP);
};


function carregaMenu(){
  var createGen = document.createElement("option");
  createGen.innerHTML = "Selecione a geração";
  createGen.value = "none";
  dropMenu.appendChild(createGen);
  for (generation in data.AQP){
    var itemMenu = document.createElement("option");
    itemMenu.value = generation;
    itemMenu.innerHTML = generation;
    dropMenu.appendChild(itemMenu);
  }
};