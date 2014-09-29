require(['jquery', 'underscore', 'neuron/neuron'], function($, _, Neuron) {
    var one = _.flatten(
        [ // 1
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ]
    );

    function getRandomMap(rounded)
    {
        do {
            var res = [];
            for (var i = 0 ; i < 15 ; i++) {
                res[i] = rounded ? Math.round(Math.random()) : Math.random();
            }
        } while (_.isEqual(res, one));
        return res;
    }

    var neuron = new Neuron([], _.flatten(getRandomMap(false)));
    neuron.learningRate = 0.01;
    var map;
    // учим нейрон отличать 1 от всего остального.
    for (var i = 0 ; i < 20000 ; i++) {
        map = getRandomMap(true);
        neuron.setInputs(map);
        if (neuron.activate()) {
            // Если выход неправильный и равен единице, то вычесть каждый вход из соответствующего ему веса.
            _.each(neuron.weights, function(value, index) {
                this.weights[index] = value - this.learningRate * this.inputs[index];
            }, neuron);
        }

        neuron.setInputs(one);
        if (!neuron.activate()) {
            // Если выход неправильный и равен нулю, то добавить все входы к соответствующим им весам
            _.each(neuron.weights, function(value, index) {
                this.weights[index] = value + this.learningRate * this.inputs[index];
            }, neuron);
        }
    }

    console.log(neuron.weights);

    test('test 1', function() {
        var map;
        // test 10 not '1' figures
        for (var i = 0 ; i < 10 ; i++) {
            map = getRandomMap(true);
            neuron.setInputs(map);
            ok(!neuron.activate());
        }

        // test neuron recognize image '1'
        neuron.setInputs(one);
        ok(neuron.activate());
    });
});
