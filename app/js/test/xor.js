require(['jquery', 'underscore', 'neuron/neuron', 'neuron/network'], function($, _, Neuron, Network) {
    var teachMap = [
        {inputs: [0, 0], outputs: [0, 0]},
        {inputs: [0, 1], outputs: [1, 1]},
        {inputs: [1, 0], outputs: [1, 1]},
        {inputs: [1, 1], outputs: [0, 0]},
    ];

    var network = new Network(2, 2);

    for (var i = 0 ; i < 200000 ; i++) {
        for (var j in teachMap) {
            var inputs = teachMap[j].inputs;
            var outputs = teachMap[j].outputs;

            if (!_.isEqual(network.activate(inputs), outputs)) {
                network.teach(inputs, outputs);
            }
        }
    }

    console.log(network);

    test('Xor neuron network', function() {
        for (var i in teachMap) {
            var inputs = teachMap[i].inputs;
            var outputs = teachMap[i].outputs;

            ok(_.isEqual(network.activate(inputs), outputs));
        }
    });
});
