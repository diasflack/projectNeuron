"use strict";

console.log("!IAMTEACHING!");

//Класс Программы обучения
var Teaching = function() {
	
	var _self = this;
	
	_self.numberOfIterations = 200;//Количество итераций обучения
	_self.teachingMethod = {}; //Объект методов обучения
	_self.learningRate = 0.3; //Константа скорости обучения - от 0 до 1
	
	//Инициализация обучения. Передаем программе нейрон
	_self.init = function(neuron) {
		_self.neuron = neuron;
	}
	
	/*
	 * Всякие методы обучения
	 */
	  
	//Перераспределение весов по правилу Хебба 
	_self.teachingMethod.Hebb = function() {
		return _.map(_self.neuron.weights, function(weight, i){
			return weight + (_self.learningRate)*(+_self.neuron.activate())*(_self.neuron.inputs[i])
		});
	}
	
	//Перераспределение весов по правилу Дельта (подается ожидаемое значение)
	_self.teachingMethod.Delta = function(expected) {
		return _.map(_self.neuron.weights, function(weight, i){
			return weight + (_self.learningRate)*(expected-_self.neuron.activate())*(_self.neuron.inputs[i])
		});
	}
	
	//Перераспределение весов по правилу Ойя
	_self.teachingMethod.Oja = function() {
		return _.map(_self.neuron.weights, function(weight, i){
			return weight + ((_self.learningRate)*(+_self.neuron.activate())) * ((_self.neuron.inputs[i])-(+_self.neuron.activate())*weight);
		});
	}
	
	/*
	 * Всякие Итерации
	 */
	
	//Программа одиночной итерации. Подаем инпут - получаем новые веса. Вводим импут и метод
	_self.iterate = function(newInputs,teachMethod) {
		_self.neuron.setInputs(newInputs);
		_self.neuron.weights = _self.teachingMethod[teachMethod]();
		return _self.neuron.weights;
	}
	
	_self.init(neuron);
	
}