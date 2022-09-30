const linearRegression = require('./linearRegression');

const regression = new linearRegression();
regression.loadModel('./modelo/modelo-regression.json');

const result = regression.predict([5,6,7,8]);

console.log(result);