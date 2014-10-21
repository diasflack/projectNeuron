define(['underscore'], function(_) {
	
	"strict"
    function sigmoid(x)
    {
        return 1 / (1 + Math.exp(-(x)));
    }

    function Neuron(inputCount, threshold)
    {
        this.threshold = threshold || 0.5;
        this.weights = [];
        for (var i = 0 ; i < inputCount ; i++) {
            this.weights[i] = Math.random();
        }
    }

    Neuron.prototype.evaluate = function(inputs)
    {
        var res = 0;
        for (var i = 0 ; i < this.weights.length ; i++) {
            res += this.weights[i] * inputs[i];
        }
        return sigmoid(res);
    }

    Neuron.prototype.activate = function(inputs)
    {
        return this.evaluate(inputs) > this.threshold ? 1 : 0;
    };

    /**
     * Перераспределение весов по правилу Дельта
     */
    Neuron.prototype.teach = function(inputs, expected, learningRate)
    {
        learningRate = learningRate || 0.01;
        expected = expected || 1;
        var actual = this.activate(inputs);

        function delta(weight) {
            return weight + learningRate * (expected - actual) * weight;
        }
        this.weights = _.map(this.weights, delta);
       
    };

    return Neuron;
});