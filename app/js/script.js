(function(){"use strict";
	
	console.log("!IAMNEURON!");
	
	//Класс Нейрона
	var Neuron = function() {
		
		var _self = this;
		
		_self.numberOfInputs = 4; //Количество входов
		_self.threshold = 0.5; //порог активации от 0 до 1
		
		_self.inputs = new Array(_self.numberOfInputs); // Сюда подаем входы
		_self.weights = new Array(_self.numberOfInputs); // Здесь храним веса
		
		_self.setInputs = function(inputs) {
			_self.inputs = inputs;
		}
		
		//Единичный сигнал с одного входа
		_self.sumOne = function(i) {
			return _self.inputs[i]*_self.weights[i];
		}
		
		//Ссумарный сигнал со всех входов
		_self.sumAll = function() {
			return _.reduce(_self.inputs, function(a,b,i) { return a + b * _self.weights[i] }, 0)
		}
		
		//Функция сигмоид (как пороговая, для активации)
		_self.sigmoid = function(x) {
			return 1 / (1 + Math.exp(-(x)))
		}
		
		//Функия активатор
		_self.activate = function() {
			return _self.sigmoid(_self.sumAll()) > _self.threshold
		}
		
		//Инициализация с присваиванием параметров и весов
		_self.init = function(inputs, weights) {
		    _self.inputs = inputs;
			_self.weights = weights;
		}
	}
	
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
	}
	
	/*
	 * Создадим нейрончик
	 */
	
	var inputs = [1,1,0,1];
	var weights = [10,12,12,12];
	
	var neuron = new Neuron();
	
	neuron.init(inputs,weights);
	
	console.log("Сумма входного сигнала - " + neuron.sumAll());
	console.log("Значение сигмоидальной функции - " + neuron.sigmoid(neuron.sumAll()));
	console.log("Значение активатора нейрона (true - есть спайк) - " + neuron.activate());
	
	/*
	 * Попробуем пообучаться 
	 */
	
	var teaching = new Teaching();
	
	teaching.init(neuron);
	
	console.log("Посмотрим на веса после правила Хебба - " + teaching.teachingMethod.Hebb());
	console.log("Посмотрим на веса после правила Дельта - " + teaching.teachingMethod.Delta(1));
	console.log("Посмотрим на веса после правила Ойа - " + teaching.teachingMethod.Oja());
	
	//Поитерируем
	
	var new_input;
	
	for (var i=0;i<teaching.numberOfIterations;i++) {
		
		new_input = _.map(inputs, function(input){return Math.round(Math.random())});
		
		console.log("Поитерируем - " + teaching.iterate(new_input, 'Oja'));
		
	}
	
})();