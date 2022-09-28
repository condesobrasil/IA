
//CALCULO DOS PRODUTOS DE X, Y
function produto(x,y){
    let temp = [];
    for(let i=0; i<x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(y[i]));
    return temp;
}

//CALCULO DOS QUADRADOS DE X
function quadrados(x){
    let temp = [];
    for(let i=0; i<x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(x[i]));
    return temp;
}
console.log("Produto de X e Y");
console.log(produto([2,4,6],[1,3,5]));
console.log("Quadrados");
console.log(quadrados([2,4,6]));