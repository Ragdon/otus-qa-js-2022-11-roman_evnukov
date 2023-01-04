
console.log(kolobok())

function kolobok(){
  
let pers = prompt('Введите персонажа');
let answer;  
switch (pers) {
    case "Лиса":
      answer = "Меня съели";
      break;
    
    case "Заяц":
      answer = "С Новым годом!"; 
      break;
    
    case "Дедушка":
      answer = "Я от дедушки ушёл";
      break;
  }
return answer;
}


console.log(newYear())

function newYear(){
	
let pers = prompt('Введите Дед Мороз или Снегурочка');
let answer; 

switch (pers) {
    case "Дед Мороз":
     answer = `"Дед Мороз! ` + `${pers}! ` + pers +`!"`;
      break;
	  
    case "Снегурочка":
      answer = `"Снегурочка! ` + `${pers}! ` + pers +`!"`; 
      break;
  }
 return answer;
}
