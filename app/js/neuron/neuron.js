define(['underscore'], function(_) {
    //Класс Нейрона
    function Neuron() {
        this.numberOfInputs = 4; //Количество входов
        this.threshold = 0.5; //порог активации от 0 до 1

        this.inputs = new Array(this.numberOfInputs); // Сюда подаем входы
        this.weights = new Array(this.numberOfInputs); // Здесь храним веса
    }

    Neuron.prototype.setInputs = function(inputs) {
        this.inputs = inputs;
    };

    //Единичный сигнал с одного входа
    Neuron.prototype.sumOne = function(i) {
        return this.inputs[i] * this.weights[i];
    };

    //Ссумарный сигнал со всех входов
    Neuron.prototype.sumAll = function() {
        var _self = this;
        return _.reduce(this.inputs, function(a,b,i) { return a + b * _self.weights[i] }, 0);
    };

    //Функция сигмоид (как пороговая, для активации)
    Neuron.prototype.sigmoid = function(x) {
        return 1 / (1 + Math.exp(-(x)));
    };

    //Функия активатор
    Neuron.prototype.activate = function() {
        return this.sigmoid(this.sumAll()) > this.threshold;
    };

    //Инициализация с присваиванием параметров и весов
    Neuron.prototype.init = function(inputs, weights) {
        this.inputs = inputs;
        this.weights = weights;
    };

    return Neuron;
});
