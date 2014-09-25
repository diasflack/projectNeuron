(function(){"use strict";
	
	console.log("!IAMNEURON!");
	
	//Класс Нейрона
	var Neuron = function() {
		
		var _self = this;
		
		_self.numberOfInputs = 4; //Количество входов
		_self.threshold = 0.5; //порог активации от 0 до 1
		
		_self.inputs = new Array(_self.numberOfInputs); // Сюда подаем входы
		_self.weights = new Array(_self.numberOfInputs); // Здесь храним веса
		
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
	
	var inputs = [-1,2,3,4];
	var weights = [1,2,3,-4];
	
	var neuron = new Neuron();
	
	neuron.init(inputs,weights);
	
	console.log("Сумма входного сигнала - " + neuron.sumAll());
	console.log("Значение сигмоидальной функции - " + neuron.sigmoid(neuron.sumAll()));
	console.log("Значение активатора нейрона (true - есть спайк) - " + neuron.activate());
	
})();