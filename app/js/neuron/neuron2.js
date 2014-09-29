define([], function() {
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
        return sigmoid(res) > this.threshold;
    };

    return Neuron;
});