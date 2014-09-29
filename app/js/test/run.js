require(['jquery', 'underscore', 'neuron/neuron2'], function($, _, Neuron) {
    var one = _.flatten(
        [ // 1
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ]
    );
    var inputs = one.length;

    function getRandomMap(rounded, exclude)
    {
        do {
            var res = [];
            for (var i = 0 ; i < inputs ; i++) {
                res[i] = rounded ? Math.round(Math.random()) : Math.random();
            }
        } while (_.isEqual(res, exclude));
        return res;
    }

    var neuron = new Neuron(inputs);
    var learningRate = 0.01;
    // учим нейрон отличать 1 от всего остального.
    for (var i = 0 ; i < 20000 ; i++) {
        var map = getRandomMap(true, one);
        if (neuron.evaluate(map)) {
            // Если выход неправильный и равен единице, то вычесть каждый вход из соответствующего ему веса.
            _.each(neuron.weights, function(value, index) {
                this.weights[index] = value - learningRate * map[index];
            }, neuron);
        }

        if (!neuron.evaluate(one)) {
            // Если выход неправильный и равен нулю, то добавить все входы к соответствующим им весам
            _.each(neuron.weights, function(value, index) {
                this.weights[index] = value + learningRate * one[index];
            }, neuron);
        }
    }

    console.log(neuron.weights);

    test('test neuron recognize 1', function() {
        // test 10 not '1' figures
        for (var i = 0 ; i < 10 ; i++) {
            ok(!neuron.evaluate(getRandomMap(true, one)));
        }

        // test neuron recognize image '1'
        ok(neuron.evaluate(one));
    });
});
