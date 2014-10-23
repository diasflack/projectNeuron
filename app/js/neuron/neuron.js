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
    Neuron.prototype.teach = function(inputs, expected, normalize, learningRate)
    {
        learningRate = learningRate || 0.01;
        expected === undefined ? expected = 1 : expected = expected;
        normalize = normalize || false;
        var actual = this.activate(inputs);
		
		function delta(weight, i) {
            return weight + learningRate * (expected - actual) * inputs[i];
        }
        
        this.weights = _.map(this.weights, delta);
        
        function normalizeAll(weights) {
	        
	        var weight_sum = _.reduce(weights, function(memo,num){return memo+num*num}, 0);
	        var normalizator = Math.sqrt(weight_sum);
	        
	        return _.map(weights, function(weight) { return weight/normalizator })
	        
        }
		
		if (normalize === true) {
        	this.weights = normalizeAll(this.weights);	
        } 
       
    };

    return Neuron;
});