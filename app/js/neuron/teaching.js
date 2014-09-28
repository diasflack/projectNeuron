define(['underscore'], function(_) {"use strict";
    //Класс Программы обучения
    function Teaching(neuron) {
        this.numberOfIterations = 200;//Количество итераций обучения
        this.learningRate = 0.3; //Константа скорости обучения - от 0 до 1
        
        this.init(neuron);
    }

    //Инициализация обучения. Передаем программе нейрон
    Teaching.prototype.init = function(neuron) {
        this.neuron = neuron;
    };
    
    //Окончание обучения. Возвращаем обученный нейрон
    Teaching.prototype.returnNeuron = function() {
        return this.neuron;
    };

    /*
     * Всякие методы обучения
     */

    //Перераспределение весов по правилу Хебба
    Teaching.prototype.teachingMethodHebb = function() {
        var _self = this;
        return _.map(_self.neuron.weights, function(weight, i){
            return weight + (_self.learningRate)*(+_self.neuron.activate())*(_self.neuron.inputs[i]);
        });
    };

    //Перераспределение весов по правилу Дельта (подается ожидаемое значение)
    Teaching.prototype.teachingMethodDelta = function(expected) {
        var _self = this;
        return _.map(_self.neuron.weights, function(weight, i){
            return weight + (_self.learningRate)*(expected-_self.neuron.activate())*(_self.neuron.inputs[i]);
            debugger;
        });
    };

    //Перераспределение весов по правилу Ойя
    Teaching.prototype.teachingMethodOja = function() {
        var _self = this;
        return _.map(_self.neuron.weights, function(weight, i){
            return weight + ((_self.learningRate)*(+_self.neuron.activate())) * ((_self.neuron.inputs[i])-(+_self.neuron.activate())*weight);
        });
    };

    /*
     * Всякие Итерации
     */

    //Программа одиночной итерации. Подаем инпут - получаем новые веса. Вводим импут и метод
    Teaching.prototype.iterate = function(newInputs,teachMethod) {
        this.neuron.setInputs(newInputs);
        this.neuron.weights = this['teachingMethod' + teachMethod]();
        return this.neuron.weights;
    };

    return Teaching;
});