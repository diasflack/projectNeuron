"use strict";
	
console.log("!IAMNETWORK!");

//Класс Нейрона
var Network = function() {
	
	var _self = this;
	
	_self.network = []; //Массив нейронов
	_self.numberOfNeurons = 5; //Количество нейронов в слое
	_self.numberOfLayers = 1; //Количество слоев
	
	//Прочитать сеть
	_self.readNetwork = function() {
		return _self.network
	}
	
	//Заполнение сети нейронами
	_self.createNetwork = function(inputs, weights) {
	    for (var layer = 0; layer < _self.numberOfLayers; layer++) {
		    _self.network[layer] = [];
		    for (var neuron = 0; neuron < _self.numberOfNeurons; neuron++) {
			     _self.network[layer][neuron] = new Neuron(inputs, weights);
		    }
	    }
	}
	
	_self.createNetwork(inputs, weights);
	
}