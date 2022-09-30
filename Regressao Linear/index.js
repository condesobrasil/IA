
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
function resultados(x=[], y=[], p=0){
    const resultado1 = (somatorio(x) * somatorio(y)) / x.length;
    console.log("Resultado1: "+resultado1);
    const resultado2 = (somatorio(x) * somatorio(x)) / x.length;
    console.log("Resultado2: "+resultado2);
    const resultado3 = somatorio(produto(x, y)) - resultado1;
    console.log("Resultado3: "+resultado3);
    const resultado4 = resultado3 / (somatorio(quadrados(x)) - resultado2);
    console.log("Resultado4: "+resultado4);
    const resultado5 = media(y) - (resultado4 * media(x));
    console.log("Resultado5: "+resultado5);
    console.log("Retorno: "+((resultado4 * p) + resultado5).toFixed(0));

    return ((resultado4 * p) + resultado5).toFixed(0);
}

//REGRESSÃO LINEAR
function regressao_linear(eixoX=[],eixoY=[]){
    const tamX = eixoX.length;
    console.log("TAMX: "+tamX);
    const tamY = eixoY.length;
    console.log("TAMY: "+tamY);

    const tempX = eixoX.slice(0, tamY);
    console.log("TempX: "+tempX);
    const tempY = eixoY;
    console.log("TempY: "+tempY);

    const dif = tamX - tamY;
    console.log("Dif: "+dif);

    if(dif > 0){
        console.log("DIF > 0");
        let regressoes = [];
        console.log("Regressoes: "+regressoes);
        for(let i=0; i<dif; i++){
            console.log("I: "+i);
            const temp = resultados(tempX, tempY, eixoX[tamY+i]);
            console.log("Temp: "+temp);
            regressoes.push(temp);
        }
        console.log("Regressoes: "+regressoes);
        const novoY = tempY.concat(regressoes);
        console.log(` eixo X: ${eixoX}`);
        console.log(` eixo Y: ${novoY}`);
    }else{
        console.log("DIF <= 0");
    }
}

console.log("RESULTADO -----------");
regressao_linear([1,2,3,4,5],[10,20,30,40]);