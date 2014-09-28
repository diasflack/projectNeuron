require(['underscore', 'neuron/neuron', 'neuron/network', 'neuron/teaching'], function(_, Neuron, Network, Teaching) {

    //Поитерируем
    (function() {
    	"use strict"
        var new_inputs;

        var inputs = [0,0,0,0];
        var weights = [20,20,20,20];

        var net = new Network(inputs, weights);

        //Поучим сеть умножать на два - ну или типа того

        for (var layer = 0; layer < net.numberOfLayers; layer++) {
            for (var neuron = 0; neuron < net.numberOfNeurons; neuron++) {
                var teachingNeuron = new Teaching(net.network[layer][neuron]);

                for (var i=0;i<teachingNeuron.numberOfIterations;i++) {
                    var expectation = 0;
                    new_inputs = _.map(inputs, function(input){return Math.round(Math.random())});
                    
                    teachingNeuron.neuron.setInputs(new_inputs);

                    neuron === 0 && _.isEqual(new_inputs, [0,0,0,1]) ? expectation = 1 : ''; //Случай когда подается два
                    neuron === 1 && _.isEqual(new_inputs, [0,1,0,0]) ? expectation = 1 : ''; //Случай когда подается четыре
                    neuron === 2 && _.isEqual(new_inputs, [0,1,1,0]) ? expectation = 1 : ''; //Случай когда подается шесть
                    neuron === 3 && _.isEqual(new_inputs, [1,0,0,0]) ? expectation = 1 : ''; //Случай когда подается восемь
                    neuron === 4 && _.isEqual(new_inputs, [1,0,1,0]) ? expectation = 1 : ''; //Случай когда подается десять
					
					teachingNeuron.neuron.weights = teachingNeuron.teachingMethodDelta(expectation);

                } 
                
                net.network[layer][neuron] = teachingNeuron.returnNeuron();
                
                console.log("Окончательные веса Нейрона " + neuron + " - " + net.network[layer][neuron].weights);
                
            }
        }
        
        //Потестируем сеть
        var error = 0;
        var numberOfOptions = 5;
        
        for (var i=0; i < numberOfOptions; i++) { 
        	
        var activate = false;
        
        
        
        var inputs = [];
        
        switch (i) {
	        case 0:
	        	inputs = [0,0,0,1];
	        	break;
	        case 1:
	        	inputs = [0,1,0,0];
	        	break;
	        case 2:
	        	inputs = [0,1,1,0];
	        	break;
	        case 3:
	        	inputs = [1,0,0,0];
	        	break;
	        case 4:
	        	inputs = [1,0,1,0];
	        	break;		
        }
        	
        	
		console.log("Случай - %d, на вход подается - %s",i, inputs.join());        	
        
        for (var layer = 0; layer < net.numberOfLayers; layer++) {
            for (var neuron = 0; neuron < net.numberOfNeurons; neuron++) {
				
				var info = '';
					           
	            net.network[layer][neuron].setInputs(inputs);
	            
	            activate = net.network[layer][neuron].activate();
	            
	            if (neuron === i && activate === true) {
					info = '- верно';
				} else if (neuron !== i && activate === true || neuron === i && activate !== true) {
	            	info = '- ОШИБКА!';
	            	error ++;
	            }
				
				console.log('Слой %d Нейрон %d ответил - %s %s',layer,neuron,activate,info);
				
            }
     		}       
        }
        
        var error_percent = error/(net.numberOfLayers*net.numberOfNeurons*numberOfOptions)*100;
        
        console.error("Сеть ошиблась - %i раз",error);
        console.error("Процент ошибок в сети - %s %",error_percent);
        
    })();
});
