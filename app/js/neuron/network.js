define(['neuron/neuron'], function(Neuron) {"use strict";
    function Network(width, height, neuronFactory) {
        this.neurons = []; // Матрица нейронов
        neuronFactory = neuronFactory || function() {
            return new Neuron(height);
        };
        this.createNetwork(width, height, neuronFactory);
    }

    //Заполнение сети нейронами
    Network.prototype.createNetwork = function(width, height, neuronFactory) {
        this.neurons = [];
        for (var x = 0; x < width; x++) {
            this.neurons[x] = [];
            for (var y = 0; y < height; y++) {
                this.neurons[x][y] = neuronFactory(x, y);
            }
        }
    };

    Network.prototype._evaluateLayer = function(layer, inputs)
    {
        var outputs = [];
        for (var y in layer) {
            outputs[y] = layer[y].evaluate(inputs);
        }
        return outputs;
    };

    Network.prototype.evaluate = function(sinapses)
    {
        for (var x in this.neurons) {
            sinapses = this._evaluateLayer(this.neurons[x], sinapses);
        }
        return sinapses;
    };

    Network.prototype.activate = function(sinapses)
    {
        var threshold = 0.5;
        var res = this.evaluate(sinapses);
        return _.map(res, function(x) {
            return x > threshold ? 1 : 0;
        });
    };

    Network.prototype._evaluateMap = function(sinapses)
    {
        var res = [sinapses];
        for (var x in this.neurons) {
            sinapses = this._evaluateLayer(this.neurons[x], sinapses);
            res.push(sinapses);
        }
        return res;
    };

    /**
     * Teach only first layer for now.
     */
    Network.prototype.teach = function(inputs, expected, learningRate)
    {
        learningRate = learningRate || 0.1;
        if (this.neurons.length == 1) {
            // обучаем слой по правилу дельты
            for (var y in expected) {
                this.neurons[0][y].teach(inputs, expected[y], learningRate);
            }
        } else {
            var actual = this._evaluateMap(inputs);
            // процедура обратного распространения
            this._teachLastLayer(this.neurons.length - 1, actual, expected, learningRate);
            for (var i = this.neurons.length - 2 ; i >= 0 ; i--) {
                this._teachInternalLayer(
                    i,
                    actual,
                    expected, // TODO this should be array of q for next layer
                    learningRate
                );
            }
        }
    };

    Network.prototype._teachLastLayer = function(layerIndex, actual, expected, learningRate)
    {
        var k = layerIndex;
        var j = k - 1;
        // last layer index.
        for (var p in this.neurons[k]) {
            var neuron = this.neurons[k][p];
            var out = actual[k + 1][p]; // + 1 since actual contain input values in zero index
            // clause 3.4 from the book
            var q = out * (1 - out) * (expected[p] - out);
            // hacky, but need to teach previous layer
            neuron._q = q;
            // iterate next to last layer
            for (var x in neuron.weights) {
                neuron.weights[x] += learningRate * q * actual[j + 1][x]; // + 1 since actual contain input values in zero index
            }
        }
    };

    Network.prototype._teachInternalLayer = function(layerIndex, actual, expected, learningRate)
    {
        var j = layerIndex;
        var i = j - 1;
        var k = j + 1;
        for (var p in this.neurons[j]) {
            var neuron = this.neurons[j][p];
            var out = actual[j + 1][p]; // + 1 since actual contain input values in zero index
            // clause 3.7 from the book
            var q = out * (1 - out) * _.reduce(this.neurons[k], function(acc, neuron) {
                return acc + neuron._q * neuron.weights[p];
            }, 0);
            // hacky, but need to teach previous layer
            neuron._q = q;
            for (var x in neuron.weights) {
                // i + 1 since actual contain input values in zero index
                // for first layer actual[i + 1] will be original input for network
                neuron.weights[x] += learningRate * q * actual[i + 1][x];
            }
        }
    };

    return Network;
});
