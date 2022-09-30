const linearRegression = require('./linearRegression');

const config = {
    input: [1,2,3,4],
    output: [10,20,30,40]
};

const regression = new linearRegression();
regression.train(config);
regression.saveModel('./modelo/modelo-regression.json');
