const sedes = {
	AQP: "AREQUIPA",
	CDMX: "CIDADE DO MÉXICO",
	LIM: "LIMA",
	SCL: "SANTIAGO",
};
var sede = window.location.hash.substr(1);
document.getElementById("nameSede").textContent = sedes[sede];

var dropMenu = document.getElementById("generation-select");
dropMenu.addEventListener("change", selecionaTurma);
window.onload = carregaMenu();

var armazenaTechAQP = [{
  "firstSprint": 1,
  "notaTech": 0,
}, {
  "secondSprint": 2,
  "notaTech": 0,
}, {
  "thirdSprint": 3,
  "notaTech": 0,
}, {
  "fourthSprint": 4,
  "notaTech": 0,
}]

var armazenaHSEAQP = [{
  "firstSprint": 1,
  "notaHSE": 0,
}, {
  "secondSprint": 2,
  "notaHSE": 0,
}, {
  "thirdSprint": 3,
  "notaHSE": 0,
}, {
  "fourthSprint": 4,
  "notaHSE": 0,
}]

function carregaMenu(){
  var createGen = document.createElement("option");
  createGen.innerHTML = "Selecione a geração";
  createGen.value = "none";
  dropMenu.appendChild(createGen);
  for (generation in data[sede]){
    var itemMenu = document.createElement("option");
    itemMenu.value = generation;
    itemMenu.innerHTML = generation;
    dropMenu.appendChild(itemMenu);
  }
};

function selecionaTurma(){
  //Zerar o valor das notas dos sprints e limpar a telas
  var generationYear = dropMenu.value;
  var showGeneration = document.getElementById("generation-display");
  
  showGeneration.innerHTML = "";
  armazenaTechAQP[0].notaTech = 0;
  armazenaTechAQP[1].notaTech = 0;
  armazenaTechAQP[2].notaTech = 0;
  armazenaTechAQP[3].notaTech = 0;

  armazenaHSEAQP[0].notaHSE = 0;
  armazenaHSEAQP[1].notaHSE = 0;
  armazenaHSEAQP[2].notaHSE = 0;
  armazenaHSEAQP[3].notaHSE = 0;

  var active = 0;
  var countTrue = 0;
  var countFalse = 0;

  //Percorrer as nota tech dos sprints de 2016-2 e 2017-1
for (generations in data[sede]){
  for (j in data[sede][generations].students){
    for(sprints in data[sede][generations].students[j].sprints){
      var gradesTech = data[sede][generations].students[j].sprints[sprints].score.tech;
      if (generations == generationYear && gradesTech >= 1260){
        if (sprints == 0){
		    armazenaTechAQP[0].notaTech += 1;
	      } else if (sprints == 1){
          armazenaTechAQP[1].notaTech += 1;
  		  } else if (sprints == 2){
          armazenaTechAQP[2].notaTech += 1;
        } else if (sprints == 3){
          armazenaTechAQP[3].notaTech += 1;
        }
      }
    }
  }
}

//Percorrer as notas HSE dos sprints de 2016-2 e 2017-1
for (generations in data[sede]){
  for (j in data[sede][generations].students){
    for(sprints in data[sede][generations].students[j].sprints){
     var gradesHSE = data[sede][generations].students[j].sprints[sprints].score.hse;
     if (generations == generationYear && gradesHSE >= 840){
       if (sprints == 0){
         armazenaHSEAQP[0].notaHSE += 1;
       } else if (sprints == 1){
         armazenaHSEAQP[1].notaHSE += 1;
       } else if (sprints == 2){
         armazenaHSEAQP[2].notaHSE += 1;
       } else if (sprints == 3){
         armazenaHSEAQP[3].notaHSE += 1;
       }
     }
    }
  }
}
//Cálculo do NPS AQP
var somaNpsAQP = 0;
  for (generations in data.AQP){
    for (sprints in data.AQP[generations].ratings){
      if (generationYear == generations){
        var sprintNpsAQP = parseInt(sprints) + 1;
        var calculaNpsAQP = (data.AQP[generations].ratings[sprints].nps.promoters) - (data.AQP[generations].ratings[sprints].nps.detractors);
        somaNpsAQP = somaNpsAQP + calculaNpsAQP;
      }
    }
  }
var mediaNpsAQP = somaNpsAQP / sprintNpsAQP;

//Cálculo do NPS LIM
var somaNpsLIM = 0;
  for (generations in data.LIM){
    for (sprints in data.LIM[generations].ratings){
      if (generationYear == generations){
        var sprintNpsLIM = parseInt(sprints) + 1;
        var calculaNpsLIM = (data.LIM[generations].ratings[sprints].nps.promoters) - (data.LIM[generations].ratings[sprints].nps.detractors);
        somaNpsLIM = somaNpsLIM + calculaNpsLIM;
      }
    }
  }
var mediaNpsLIM = somaNpsLIM / sprintNpsLIM;

//Cálculo do NPS CDMX
var somaNpsCDMX = 0;
  for (generations in data.CDMX){
    for (sprints in data.CDMX[generations].ratings){
      if (generationYear == generations){
        var sprintNpsCDMX = parseInt(sprints) + 1;
        var calculaNpsCDMX = (data.CDMX[generations].ratings[sprints].nps.promoters) - (data.CDMX[generations].ratings[sprints].nps.detractors);
        somaNpsCDMX = somaNpsCDMX + calculaNpsCDMX;
      }
    }
  }
var mediaNpsCDMX = somaNpsCDMX / sprintNpsCDMX;

//Cálculo do NPS SCL
var somaNpsSCL = 0;
  for (generations in data.SCL){
    for (sprints in data.SCL[generations].ratings){
      if (generationYear == generations){
        var sprintNpsSCL = parseInt(sprints) + 1;
        var calculaNpsSCL = (data.SCL[generations].ratings[sprints].nps.promoters) - (data.SCL[generations].ratings[sprints].nps.detractors);
        somaNpsSCL = somaNpsSCL + calculaNpsSCL;
        
      }
    }
  }
var mediaNpsSCL = somaNpsSCL / sprintNpsSCL;

//grafico NPS
var NPSctx = document.getElementsByClassName("mediaNPS");
var chartNPS = new Chart(NPSctx,{
	type:'bar',
	data:{
		labels:["Cidades",],
		datasets:[
		{
			label:"Média AQP",
			data:[mediaNpsAQP],
			borderWidth: 2,
			borderColor: "#deffa6",
			backgroundColor:"#deffa6",
			},
			{
				label:"Média LIM",
			data:[mediaNpsLIM],
			borderWidth: 2,
			borderColor: "#f4a6ff",
			backgroundColor:"#f4a6ff",
			},
			{
				label:"Média CDMX",
			data:[mediaNpsCDMX],
			borderWidth: 2,
			borderColor: "#FFF4A6",
			backgroundColor:"#FFF4A6",
			},
			{
				label:"Média SCL",
			data:[mediaNpsSCL],
			borderWidth: 2,
			borderColor: "##a6b1ff",
			backgroundColor:"#a6b1ff",
			}
			]
	}
});
  //Joga a nota em cada um dos sprints
  var i = 0;
  var j = 0;
  for (sprints in  data[sede][generationYear].ratings){
    var createH2 = document.createElement("h2");
    var createP1 = document.createElement("p");
    var createP2 = document.createElement("p");
    createH2.innerHTML = "SPRINT " + (parseInt(sprints) + 1);
    createP1.innerHTML = armazenaTechAQP[i].notaTech + " alunas atingiram mais de 70% da nota Tech";
	  createP2.innerHTML = armazenaHSEAQP[j].notaHSE + " alunas atingiram mais de 70% da nota HSE";
    i++;
    j++;
    showGeneration.appendChild(createH2);
    showGeneration.appendChild(createP1);
    showGeneration.appendChild(createP2); 
    
  //Grafico de alunas atingiram mais de 70% da nota Tech e HSE
  var techNotesctx = document.getElementsByClassName("techNotes");
  var techNotes = new Chart(techNotesctx, {
	  type:'pie',
	  data: {
		  labels: ["Sprint 1","Sprint 2","Sprint 3","Sprint 4",],
		  datasets:[{
			  label: "atingiram mais de 70% da nota Tech no Sprint",
			  data: [armazenaTechAQP[0].notaTech,armazenaTechAQP[1].notaTech,armazenaTechAQP[2].notaTech,armazenaTechAQP[3].notaTech],
			  backgroundColor: ["#deffa6", "#f4a6ff", "#FFF4A6", "#a6b1ff"],
		  }]
	  }      
  });
  var hseNotesctx = document.getElementsByClassName("hseNotes");
  var hseNotes = new Chart(hseNotesctx, {
	  type:'pie',
	  data: {
		  labels: ["Sprint 1","Sprint 2","Sprint 3","Sprint 4",],
		  datasets:[{
			  label: "atingiram mais de 70% da nota HSE no Sprint",
			  data: [armazenaHSEAQP[0].notaHSE,armazenaHSEAQP[1].notaHSE,armazenaHSEAQP[2].notaHSE,armazenaHSEAQP[3].notaHSE],
			  backgroundColor: ["#deffa6", "#f4a6ff", "#FFF4A6", "#a6b1ff"],
		  }]
	  }      
  });
  
}
// Numero de alunas que concluiram ou que desistiram do curso por geracao
for (generations in data[sede]){
  for (j in data[sede][generations].students){
		active = data[sede][generations].students[j].active;
      if (active === true && generations == generationYear){
		    countTrue += 1;
		  }else if (active === false  && generations == generationYear){
			  countFalse += 1; // contador
			  }
	};
};
 
	  
	  
//GRAFICO Alunas que concluiram e que nao concluiram
var totalStudents = countTrue + countFalse
var createActive = document.createElement("p");
var anotherInfos = document.getElementById("line-chart"); //imprimir no local de Infos gerais
createActive.innerHTML = "Total de "  + totalStudents + " alunas na geração "+ generationYear + " sede " + sede;
showGeneration.appendChild(createActive);
  var ctx = document.getElementsByClassName("line-chart");
  var alunas = [countTrue, countFalse];
  //type, data e options
  var chartGraph = new Chart(ctx, {
	  type:'pie',
	  data: {
		  labels: ["Não concluiram", "Concluiram"],
		  datasets:[{
			  data: alunas,
		  label: "Numero de alunas que concluiram ou que desistiram do curso por geracao",
		  backgroundColor: ["#00ff61", "#ff009e"],
		  }]
	  }
	  });      

// media dos professores e jedis
var mediaT = 0;
var mediaJ = 0;
for(i in data[sede][generationYear].ratings){
	var teacherNote = data[sede][generationYear].ratings[i].teacher;
	mediaT  = mediaT +  teacherNote / (parseInt(sprints) + 1);
	var jedisNote = data[sede][generationYear].ratings[i].jedi;
	mediaJ = mediaJ + jedisNote / (parseInt(sprints) + 1);

	};

//Grafico media dos teacher e dos jedis
var teacherctx = document.getElementsByClassName("teacherNotes");
var techNotes = new Chart(teacherctx,{
		type:'bar',
		data:{
			labels:["media dos teacher e dos jedis"],
			datasets: [{
				
					label: "TEACHER",
					data: [mediaT.toFixed(2)],
					borderWidth: 2,
					borderColor: '#00ff61',
					backgroundColor: "#9eff00",
				},
				{
					label: "JEDI",
					data: [mediaJ.toFixed(2)],
					borderWidth: 2,
					borderColor: '#ff009e',
					backgroundColor: '#FF009E',
			}]
		}, options: {
               scales: {
                   yAxes: [{
                      ticks: {
                         max: 5,
                          min: 0,
                           stepSize: 1,
                            beginAtZero: true
                            }
                          }]
		}
  }
});
}// final da funcao
