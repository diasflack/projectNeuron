require(['jquery', 'underscore', 'neuron/neuron', 'neuron/network'], function($, _, Neuron, Network) {
    var figures = [
        [ // 0
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        [ // 1
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        [ // 2
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1]
        ],
        [ // 3
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        [ // 4
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        [ // 5
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        [ // 6
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        [ // 7
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        [ // 8
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        [ // 9
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ]
    ];
    figures = _.map(figures, _.flatten);
    var length = figures[0].length;

    function getRandomMap(rounded, excludes)
    {
        excludes = excludes || figures;
        do {
            var res = [];
            for (var i = 0 ; i < length ; i++) {
                res[i] = rounded ? Math.round(Math.random()) : Math.random();
            }

            var isFigure = _.reduce(figures, function(acc, figure) {
                return acc || _.isEqual(res, figure);
            }, false);
        } while (isFigure);
        return res;
    }

    function createNeuron()
    {
        return new Neuron(length);
    }

    function createArray(length, index)
    {
        var res = new Array(length);
        for (var i = 0 ; i < length ; i++) {
            res[i] = 0;
        }

        if (index !== undefined) {
            res[index] = 1;
        }
        return res;
    }

    var network = new Network(1, 10, createNeuron);
    var learningRate = 0.01;

    _.map(figures, function(figure, i) {
        var zeroes = createArray(10);
        var expected = createArray(10, i);
        // учим сеть отличать каждую цифру от всего остального.
        for (var j = 0 ; j < 2000 ; j++) {
            var map = getRandomMap(true);
            if (!_.isEqual(network.activate(map), zeroes)) {
                network.teach(map, zeroes, learningRate);
            }

            if (!_.isEqual(network.activate(figure), expected)) {
                network.teach(map, expected, learningRate);
            }
        }
    });

    test('test neuron recognize figure', function() {
        _.map(figures, function(figure, i) {
            var actual;

            var zeroes = createArray(10);
            var expected = createArray(10, i);

            // test 10 not '1' figures
            for (var j = 0 ; j < 100 ; j++) {
                actual = network.activate(getRandomMap(true));
                ok(_.isEqual(zeroes, actual));
            }

            // test neuron recognize figure
            actual = network.activate(figure);
            ok(_.isEqual(expected, actual));
        });
    });
});
