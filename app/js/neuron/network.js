define(['neuron/neuron'], function(Neuron) {
    //Класс Нейрона
    function Network() {
        this.network = []; //Массив нейронов
        this.numberOfNeurons = 5; //Количество нейронов в слое
        this.numberOfLayers = 1; //Количество слоев
    }


    //Прочитать сеть
    Network.prototype.readNetwork = function() {
        return this.network;
    };

    //Заполнение сети нейронами
    Network.prototype.createNetwork = function(inputs, weights) {
        for (var layer = 0; layer < this.numberOfLayers; layer++) {
            this.network[layer] = [];
            for (var neuron = 0; neuron < this.numberOfNeurons; neuron++) {
                this.network[layer][neuron] = new Neuron(inputs, weights);
            }
        }
    };

    return Network;
});