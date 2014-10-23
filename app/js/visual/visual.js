require(['jquery', 'underscore', 'neuron/neuron', 'neuron/network'], function($, _, Neuron, Network) {
    
    "strict"
    
    var canvas = document.getElementById("visualizer");
    var ctx = canvas.getContext("2d");
    var cHeight = canvas.offsetHeight;
    var cWidth = canvas.offsetWidth;
    
    var color_on = "#00FF00"
    var color_off = "#FF0000"
    
    var inputs = [0,0,0,0,0];
    var pattern = [0,0,1,0,0];
    
    //Входики
    var inputsR = 20;
    var patternR = 10;
    
    var inputsPosX = 100;
    var inputsPosY;
    
    var patternPosX = 500;
    var patternPosY = 300;
    
    var inputsPos = [];
    var patternPos = [];
    
    //Нейрончик
    var neuronWidth = 30;
    var neuronHeight = 30;
    
    var neuronPosX = (cWidth-neuronWidth)/2;
    var neuronPosY = (cHeight-neuronHeight)/2;
    
    var iterate_number = 0;
    
    var iteration_speed = $("#iteration_speed").val();
    var learning_rate = $("#learning_rate").val();
    var threshold = $("#threshold").val();
    var normalize = $("#normalize").val();
    
    var neuron = new Neuron(inputs.length, threshold);
    
	var timer = animate();

	var inputLineWidth;
    //Начинаем занимательное рисование =)
    
    function drawNeuron() {
    
    	inputsPosY = cWidth/inputs.length-50;
    	patternPosY = 300;
	    
	    var active = neuron.activate(inputs);
	    
	    ctx.clearRect(0, 0, cWidth, cHeight);
	    //сперва отрисовываем инпуты
	    _.each(inputs, function(el, i){
	    
	       //создаем массив позиций нейронов
	       inputsPos[i] = { x:inputsPosX, y:inputsPosY }
		   
		   //рисуем вход
		   ctx.beginPath();
		   ctx.arc(inputsPos[i].x,inputsPos[i].y,inputsR,0,2*Math.PI);
		   ctx.lineWidth = 1;
		   ctx.stroke();
		   
		   el === 1 ? ctx.fillStyle = color_on : ctx.fillStyle = color_off; //определяем включен ли инпут
		   ctx.fill();
		   ctx.stroke();
		   
		   //отрисовываем связь
		   ctx.moveTo(inputsPos[i].x+inputsR,inputsPos[i].y);
		   ctx.lineTo(inputsPos[i].x+100,inputsPos[i].y);
		   ctx.lineTo(neuronPosX,neuronPosY+neuronHeight/2);
		   
		   neuron.weights[i] > 0 ? inputLineWidth = neuron.weights[i]/learning_rate : inputLineWidth = 0.000000000001;
		   
		   ctx.lineWidth = inputLineWidth;
		   ctx.stroke();
		   
		   inputsPosY += cWidth/inputs.length;//меняем позицию
	    });
	    
	    _.each(pattern, function(el, i){
	    
	       //создаем массив позиций нейронов
	       patternPos[i] = { x:patternPosX, y:patternPosY }
		   
		   //рисуем вход
		   ctx.beginPath();
		   ctx.arc(patternPos[i].x,patternPos[i].y,patternR,0,2*Math.PI);
		   ctx.lineWidth = 1;
		   ctx.stroke();
		   
		   el === 1 ? ctx.fillStyle = color_on : ctx.fillStyle = color_off; //определяем включен ли инпут
		   ctx.fill();
		   
		   
		   patternPosY += cWidth/2/pattern.length;//меняем позицию
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
	    	ctx.fillText(+i+': '+el.toFixed(6),430,60+20*i);
	    });
	    
	    ctx.fillText('Сигмоид:'+neuron.evaluate(inputs),380,180);
	    
	    ctx.fillText('Шаблон:',430,260);
    
    }
    
    function learn() {
	   for (var x = 0, il = 5; x < il; x++) {
            inputs[x] = Math.round(Math.random());
        }
	    
	    if (_.isEqual(inputs, pattern)) {
		    neuron.teach(inputs, 1, normalize, learning_rate); 
	    } else {
		    neuron.teach(inputs, 0, normalize, learning_rate); 
	    }
	    
	    iterate_number++;
	    
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
    
    /*
     * Фишечки с мышкой
     */
    function writeMessage(message) {
        ctx.clearRect(0, 0, 290, 30);
        ctx.font = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(message, 10, 25);
      }
      
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      
      function inputClick(evt) {
	     var mPos = getMousePos(canvas, evt);
	     
	     _.each(inputsPos, function(el,i){
		     
		     if ((mPos.x - el.x)*(mPos.x - el.x) + (mPos.y - el.y)*(mPos.y - el.y) <= inputsR*inputsR) {
			  	inputs[i] = +!inputs[i];
			  	drawNeuron();
		     }
		     		     
	     });
	     
	      _.each(patternPos, function(el,i){
		     
		     if ((mPos.x - el.x)*(mPos.x - el.x) + (mPos.y - el.y)*(mPos.y - el.y) <= patternR*patternR) {
			  	pattern[i] = +!pattern[i];
			  	drawNeuron();
		     }
		     		     
	     });
      }
      
      
      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(message);
      }, false);
      
      canvas.addEventListener('click', inputClick, false);
    
    
    /*
     * Коммандный пункт
     */
    
    $("#startLearning").click(function(){
    	timer() ? $(this).text('Закончить обучение') : $(this).text('Начать обучение');
    });
    
    $("#resetWeights").click(function(){
    	neuron = new Neuron(inputs.length, threshold);
    	drawNeuron();
    });
    
    $("#iteration_speed").on("change",function(){
	    iteration_speed = $(this).val();
	    timer();timer();
    });
    
    $("#learning_rate").on("change",function(){
	    learning_rate = $(this).val();
	    timer();timer();
    });
    
    $("#threshold").on("change",function(){
    	threshold = $(this).val();
	    neuron.threshold = $(this).val();
	    timer();timer();
    });
    
    $("#normalize").on("change",function(){
    	$(this).is(':checked') ? normalize = true : normalize = false;
    	timer();timer();
    });
    
    drawNeuron();

    
});