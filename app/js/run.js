require(['underscore', 'neuron/neuron', 'neuron/network', 'neuron/teaching'], function(_, Neuron, Network, Teaching) {
    (function() {
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

        console.log("Посмотрим на веса после правила Хебба - " + teaching.teachingMethodHebb());
        console.log("Посмотрим на веса после правила Дельта - " + teaching.teachingMethodDelta(1));
        console.log("Посмотрим на веса после правила Ойа - " + teaching.teachingMethodOja());
    })();

    //Поитерируем
    (function() {
        var new_input;
        /*
         for (var i=0;i<teaching.numberOfIterations;i++) {

         new_input = _.map(inputs, function(input){return Math.round(Math.random())});

         console.log("Поитерируем - " + teaching.iterate(new_input, 'Oja'));

         }*/

        var inputs = [0,0,0,0];
        var weights = [0,0,0,0];

        var net = new Network(inputs, weights);

        //Поучим сеть умножать на два - ну или типа того

        for (var layer = 0; layer < net.numberOfLayers; layer++) {
            for (var neuron = 0; neuron < net.numberOfNeurons; neuron++) {
                var teachingNeuron = new Teaching(net.network[layer][neuron]);

                for (var i=0;i<teachingNeuron.numberOfIterations;i++) {
                    var expectation = 0;
                    new_input = _.map(inputs, function(input){return Math.round(Math.random())});

                    neuron === 0 && _.isEqual(new_input, [0,0,0,1]) ? expectation = 1 : ''; //Случай когда подается два
                    neuron === 1 && _.isEqual(new_input, [0,1,0,0]) ? expectation = 1 : ''; //Случай когда подается четыре
                    neuron === 2 && _.isEqual(new_input, [0,1,1,0]) ? expectation = 1 : ''; //Случай когда подается шесть
                    neuron === 3 && _.isEqual(new_input, [1,0,0,0]) ? expectation = 1 : ''; //Случай когда подается восемь
                    neuron === 4 && _.isEqual(new_input, [1,0,1,0]) ? expectation = 1 : ''; //Случай когда подается десять

                    console.log("Посмотрим на веса после правила Дельта - " + teachingNeuron.teachingMethodDelta(expectation));
                }
            }
        }
    })();
});
