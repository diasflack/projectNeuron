define(['neuron/neuron'], function(Neuron) {"use strict";
    function Network(width, height, neuronFactory) {
        neuronFactory = neuronFactory || function() {
            return new Neuron(height);
        };
        this.createNetwork(width, height, neuronFactory);
    }

    //Заполнение сети нейронами
    Network.prototype.createNetwork = function(width, height, neuronFactory) {
        this.network = []; // Матрица нейронов
        for (var x = 0; x < width; x++) {
            this.network[x] = [];
            for (var y = 0; y < height; y++) {
                this.network[x][y] = neuronFactory(x, y);
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
        for (var x in this.network) {
            sinapses = this._evaluateLayer(this.network[x], sinapses);
        }
        return sinapses;
    };

    /**
     * Teach only first layer for now.
     */
    Network.prototype.teach = function(inputs, expected, learningRate)
    {
        for (var y in expected) {
            this.network[0][y].teach(inputs, expected[y], learningRate);
        }
    };

    return Network;
});
