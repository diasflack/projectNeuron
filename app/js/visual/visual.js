require(['jquery', 'underscore', 'neuron/neuron', 'neuron/network'], function($, _, Neuron, Network) {
    
    "strict"
    
    var c = document.getElementById("visualizer");
    var ctx = c.getContext("2d");
    var cHeight = c.offsetHeight;
    var cWidth = c.offsetWidth;
    
    var color_on = "#00FF00"
    var color_off = "#FF0000"
    
    var inputs = [0,0,1,0,0];
    var neuron = new Neuron(inputs.length, 0.9);
    
    
    //Начинаем занимательное рисование =)
    
    function drawNeuron() {
    //Входики
    
    var inputsR = 20;
    
    var inputsPosX = 100;
    var inputsPosY = cWidth/inputs.length-50;
    
    //Нейрончик
    var neuronWidth = 20;
    var neuronHeight = 20;
    
    var neuronPosX = (cWidth-neuronWidth)/2;
    var neuronPosY = (cHeight-neuronHeight)/2;
    
    var active = neuron.activate(inputs);
    console.log(neuron.weights);
    
    ctx.clearRect(0, 0, cWidth, cHeight);
    //сперва отрисовываем инпуты
    _.each(inputs, function(el, i){
	   
	   ctx.beginPath();
	   ctx.arc(inputsPosX,inputsPosY,inputsR,0,2*Math.PI);
	   ctx.lineWidth = 1;
	   ctx.stroke();
	   
	   el === 1 ? ctx.fillStyle = color_on : ctx.fillStyle = color_off; //определяем включен ли инпут
	   ctx.fill();
	   
	   //отрисовываем связь
	   ctx.moveTo(inputsPosX+inputsR,inputsPosY);
	   ctx.lineTo(inputsPosX+100,inputsPosY);
	   ctx.lineTo(neuronPosX,neuronPosY+neuronHeight/2);
	   ctx.lineWidth = neuron.weights[i]*10;
	   ctx.stroke();
	   
	   inputsPosY += cWidth/inputs.length;//меняем позицию
    });
	
	//тута зачаток нейрона
	ctx.beginPath();
    ctx.rect(neuronPosX,neuronPosY,neuronWidth,neuronHeight);
    active === 1 ? ctx.fillStyle = color_on : ctx.fillStyle = color_off; //определяем включен ли инпут
    ctx.fill();
	ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    }
    
    function learn() {
	   for (var x = 0, il = 5; x < il; x++) {
            inputs[x] = Math.round(Math.random());
        }
	    
	    neuron.teach(inputs); 
    }
    
    function animate() {

	    var timer = setInterval(function(){
		    
		    learn();
		    drawNeuron();
	        
		    
	    }, 100);
	    
	    function stopTimer() {
		    clearInterval(timer);
		    clearInterval(timer-1);
	    }
	    
	    
	    return stopTimer;
	    
    }
    
    $("#startLearning").click(function(){
	    animate();
    });
    
    $("#endLearning").click(function(){
    	animate()();
    });

    
});