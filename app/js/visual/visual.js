require(['jquery', 'underscore', 'neuron/neuron', 'neuron/network'], function($, _, Neuron, Network) {
    
    var c = document.getElementById("visualizer");
    var ctx = c.getContext("2d");
    var cHeight = c.offsetHeight;
    var cWidth = c.offsetWidth;
    
    var color_on = "#00FF00"
    var color_off = "#FF0000"
    
    //Входики
    var input = [0,1,0,1,0];
    var inputR = 20;
    
    var inputPosX = 100;
    var inputPosY = cWidth/input.length-50;
    
    //Нейрончик
    var neuronWidth = 20;
    var neuronHeight = 20;
    
    var neuronPosX = (cWidth-neuronWidth)/2;
    var neuronPosY = (cHeight-neuronHeight)/2;
    
    var neuron = new Neuron(input.length);
    
    console.log(neuron);
    
    //Начинаем занимательное рисование =)
    
    //сперва отрисовываем инпуты
    _.each(input, function(el, i){
	   
	   ctx.beginPath();
	   ctx.arc(inputPosX,inputPosY,inputR,0,2*Math.PI);
	   ctx.lineWidth = 1;
	   ctx.stroke();
	   
	   el === 1 ? ctx.fillStyle = color_on : ctx.fillStyle = color_off; //определяем включен ли инпут
	   ctx.fill();
	   
	   //отрисовываем связь
	   ctx.moveTo(inputPosX+inputR,inputPosY);
	   ctx.lineTo(inputPosX+100,inputPosY);
	   ctx.lineTo(neuronPosX,neuronPosY+neuronHeight/2);
	   ctx.lineWidth = neuron.weights[i]*10;
	   ctx.stroke();
	   
	   inputPosY += cWidth/input.length;//меняем позицию
    });
   
	
	//тута зачаток нейрона
	ctx.beginPath();
    ctx.rect(neuronPosX,neuronPosY,neuronWidth,neuronHeight);
    ctx.fillStyle = color_off;
    ctx.fill();
	ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
});