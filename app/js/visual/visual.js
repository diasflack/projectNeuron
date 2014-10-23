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
    
    //Входики
    var inputsR = 20;
    
    var inputsPosX = 100;
    var inputsPosY;
    
    //Нейрончик
    var neuronWidth = 20;
    var neuronHeight = 20;
    
    var neuronPosX = (cWidth-neuronWidth)/2;
    var neuronPosY = (cHeight-neuronHeight)/2;
    
    var iterate_number = 0;
    
    var iteration_speed = $("#iteration_speed").val();
    var learning_rate = $("#learning_rate").val();
    
	var timer = animate();

    //Начинаем занимательное рисование =)
    
    function drawNeuron() {
    
    	inputsPosY = cWidth/inputs.length-50;
	    
	    var active = neuron.activate(inputs);
	    
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
	    
	    //всякая текстовая информация
	    ctx.font = "20px Arial";
	    ctx.fillStyle = '#222'
	    ctx.fillText('Номер итерации - '+iterate_number,380,20);
	    ctx.fillText('Веса:',380,40);
	    
	    _.each(neuron.weights, function(el, i) {
	    	//console.log(el);
	    	ctx.fillText(+i+' - '+el.toFixed(6),430,60+20*i);
	    });
	    
	    iterate_number++;
    
    }
    
    function learn() {
	   for (var x = 0, il = 5; x < il; x++) {
            inputs[x] = Math.round(Math.random());
        }
	    
	    if (_.isEqual(inputs, [0,0,1,0,0])) {
		    neuron.teach(inputs, 1, true, learning_rate); 
	    } else {
		    neuron.teach(inputs, 0, true, learning_rate); 
	    }
	    
    }
    
    
    //Анимашечки!!!
    function animate() {
    
    	var started = false;
    	var timer;
    	
    	function startTimer() {
    		started = true;
	    	timer = setInterval(function(){
		    
		    learn();
		    drawNeuron();
	        
			}, iteration_speed);
    	} 
	    
	    function stopTimer() {
	    	started = false;
		    clearInterval(timer);
	    }
	    
	    function init() {
		    started ? stopTimer() : startTimer();
		    return started;
	    }
	    
	    return init;
	    
    }
    
    $("#startLearning").click(function(){
    	timer() ? $(this).text('Закончить обучение') : $(this).text('Начать обучение');
    });
    
    $("#iteration_speed").on("change",function(){
	    iteration_speed = $(this).val();
    });
    
    drawNeuron();

    
});