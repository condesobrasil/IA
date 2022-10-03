let entradas = [];
let classes = [];

//Elimina os elementos duplicados
function eliminaDuplicados(arr=[]){
    arr = [...new Set(arr)];
    return arr;
}

//Retorna as classes existentes
function retornaClasses(){
    let arr = classes;
    arr = eliminaDuplicados(arr);
    return arr;
}

//Conta a quantidade de palavras repetidas em um texto
function contaTexto(texto='', procura=''){
    return texto.split(procura).length - 1;
}
/* Cria um json com as classes como chave e as entradas
 de cada classe como valor */
function organizar() {
    let params = {};

    for(let i=0; i<entradas.length; i++){
        //Separa as palavras com '-'
        let carac = '';
        if(i<(entradas.length-1)) carac = '-';
        /* Concatena as entradas de cada classe no valor da classe correspondente */
        if(params[classes[i]]){
            params[classes[i]] += entradas[i] + carac;
        }else {
            params[classes[i]] = entradas[i] + carac;
        }
    }
    //Elimina a última vírgula de cada valor
    let str = JSON.stringify(params);
    str = str.replace(/-"/g,'"');
    str = str.replace(/-/g,',');
    params = JSON.parse(str);

    return params;
}

//Tabela de frequência
//monta um json com o número de classes para cada entrada
function frequencia(){
    let categorias = [];
    let params = {};
    const objeto = organizar();
    const labels = retornaClasses();

    for(let i=0; i<entradas.length; i++){
        params['Entrada'] = entradas[i];

        for(let j=0; j < labels.length; j++){
            //conta o número de entradas em cada classe
            params[labels[j]] = contaTexto(objeto[labels[j]],entradas[i]);
        }
        categorias[i] = JSON.stringify(params);
    }

    categorias = eliminaDuplicados(categorias);
    for(let i=0; i<categorias.length; i++){
        categorias[i] = JSON.parse(categorias[i]);
    }
    return categorias;
}

//retorna a quantidade de classes
function quantidadeClasses(){
    const categorias = frequencia();
    return parseInt(Object.keys(categorias[0]).length-1);
}
//Soma os valores das classes da entrada passada
function somaClasses(arr=[]){
    let soma = 0;
    for(let i=1; i<arr.length; i++){
        soma += parseInt(arr[i]);
    }
    return soma;
}
//retorna a soma total de cada classe
function totalPorClasse(){
    let totalClasse = [];
    const nomeClasses = retornaClasses();
    const str_classes = JSON.stringify(classes);

    for(let i=0; i<nomeClasses.length; i++){
        totalClasse[nomeClasses[i]] = contaTexto(str_classes, nomeClasses[i]);
    }
    return totalClasse;
}
//soma dos totais de todas as classes
function somaTotaisClasses(){
    const vetTemp = Object.values(totalPorClasse());
    let soma = 0;
    for(let i=0; i<vetTemp.length; i++){
        soma += parseFloat(vetTemp[i]);
    }
    return soma;
}
//retorna a ocorrência de uma Classe para uma Entrada
function ocorrenciaClasseParaEntrada(_entrada='', _classe=''){
    const categorias = frequencia();
    let retorno = 0;

    categorias.forEach((item) => {
        if(item['Entrada'] == _entrada){
            retorno = parseFloat(item[_classe]);
        }
    });
    return retorno;
}
//Calula a probabilidade da entrada pertencer a uma determinada classe
function NaiveBayes(_entrada=''){
    const nomeClasses = retornaClasses();
    const totalClasse = totalPorClasse();

    const categorias = frequencia();
    let soma = 0;
    categorias.forEach((item) => {
        if(item['Entrada'] == _entrada){
            for(let i=0; i<nomeClasses.length; i++){
                soma+=parseFloat(item[nomeClasses[i]]);
            }
        }
    });
    let probabilidade = [];
    /* 
    (quantidade de classes na entrada / quantidade de classes do tipo procurado)
     *
    (quantidade de classes do tipo procurado / quantidade total de classes)
    /
    (soma de todas as classes da entrada / quantidade total de classes)
    */
    for(let i=0; i<nomeClasses.length; i++){
        probabilidade[nomeClasses[i]] = (ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]) / totalClasse[nomeClasses[i]]) * (totalClasse[nomeClasses[i]] / somaTotaisClasses()) / (soma/somaTotaisClasses());
    }
    return probabilidade;
}

function train(config={}){
    if(config.input) entradas = config.input; else entradas = [''];
    if(config.output) classes = config.output; else classes = [''];
}

function predict(selEntrada=''){
    const nomeClasses = retornaClasses();
    let probabilidades = [];
    if(selEntrada.toString().trim().length > 0){
        const Naive = NaiveBayes(selEntrada);

        for(let i=0; i<nomeClasses.length; i++){
            const percentual = Number(parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2));
            probabilidades.push({class: nomeClasses[i], probability: percentual});
        }
    }else{
        probabilidades.push({class:'', probability:0});
    }
    return probabilidades;
}

/* Testando o Algoritmo  */
train({
    input:['bom','mau','indiferente', 'indiferente'],
    output:['positivo', 'negativo', 'positivo', 'negativo']
});

console.log(predict('bom'));