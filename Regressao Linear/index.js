
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

//CALCULO DO SOMATORIO
function somatorio(x=[]){
    let soma = 0;
    for(let i=0; i<x.length; i++){
        soma = soma + parseFloat(x[i]);        
    }
    return parseFloat(soma);
}

//CALCULO DA MÉDIA
function media(x=[]){
    return somatorio(x) / x.length;
}

//RESULTADOS PARA REGRESSÃO LINEAR
function resultados(x=[], y=[], p){
    const resultado1 = (somatorio(x) * somatorio(y)) / x.length;
    const resultado2 = (somatorio(x) * somatorio(x)) / x.length;
    const resultado3 = somatorio(produto(x,y)) - resultado1;
    const resultado4 = resultado3 / (somatorio(quadrados(x)) - resultado2);
    const resultado5 = media(y) - (resultado4 * media(x));

    return ((resultado4 * p) + resultado5).toFixed(0);
}

//REGRESSÃO LINEAR
function regressao_linear(eixoX=[],eixoY=[]){
    const tamX = eixoX.length;
    const tamY = eixoY.length;

    const tempX = eixoX.slice(0, tamY);
    const tempY = eixoY;

    const dif = tamX - tamY;
    if(dif > 0){
        let regressoes = [];
        for(let i=0; i<dif; i++){
            const temp = resultados(tempX, tempY, eixoX[tamY+i]);
            regressoes.push(temp);
        }
        const novoY = tempY.concat(regressoes);
        console.log(` eixo X: ${eixoX}`);
        console.log(` eixo Y: ${eixoY}`);
    }
}

var x1 = [2,4,6];
var y1 = [1,3,5];

console.log("X1: "+x1+", Y1: "+y1);
console.log("Produto de X1 e Y1: "+produto(x1,y1));
console.log("Quadrados de X1: "+quadrados(x1));
console.log("Somatório de X1: "+somatorio(x1));
console.log("Média de X1: "+media(x1));
//console.log("RESULTADO");

//regressao_linear([1,2,3,4,5],[10,20,30,40]);