
module.exports = class NaiveBayes {
    
    //Elimina os elementos duplicados
    eliminaDuplicados(arr=[]){
        arr = [...new Set(arr)];
        return arr;
    }

    //Retorna as classes existentes
    retornaClasses(){
        let arr = this.classes;
        arr = this.eliminaDuplicados(arr);
        return arr;
    }

    //Conta a quantidade de palavras repetidas em um texto
    contaTexto(texto='', procura=''){
        return texto.split(procura).length - 1;
    }
    /* Cria um json com as classes como chave e as entradas
    de cada classe como valor */
    organizar() {
        let params = {};

        for(let i=0; i<this.entradas.length; i++){
            //Separa as palavras com '-'
            let carac = '';
            if(i<(this.entradas.length-1)) carac = '-';
            /* Concatena as entradas de cada classe no valor da classe correspondente */
            if(params[this.classes[i]]){
                params[this.classes[i]] += this.entradas[i] + carac;
            }else {
                params[this.classes[i]] = this.entradas[i] + carac;
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
    frequencia(){
        let categorias = [];
        let params = {};
        const objeto = this.organizar();
        const labels = this.retornaClasses();

        for(let i=0; i<this.entradas.length; i++){
            params['Entrada'] = this.entradas[i];

            for(let j=0; j < labels.length; j++){
                //conta o número de entradas em cada classe
                params[labels[j]] = this.contaTexto(objeto[labels[j]],this.entradas[i]);
            }
            categorias[i] = JSON.stringify(params);
        }

        categorias = this.eliminaDuplicados(categorias);
        for(let i=0; i<categorias.length; i++){
            categorias[i] = JSON.parse(categorias[i]);
        }
        return categorias;
    }

    //retorna a quantidade de classes
    quantidadeClasses(){
        const categorias = this.frequencia();
        return parseInt(Object.keys(categorias[0]).length-1);
    }
    //Soma os valores das classes da entrada passada
    somaClasses(arr=[]){
        let soma = 0;
        for(let i=1; i<arr.length; i++){
            soma += parseInt(arr[i]);
        }
        return soma;
    }
    //retorna a soma total de cada classe
    totalPorClasse(){
        let totalClasse = [];
        const nomeClasses = this.retornaClasses();
        const str_classes = JSON.stringify(this.classes);

        for(let i=0; i<nomeClasses.length; i++){
            totalClasse[nomeClasses[i]] = this.contaTexto(str_classes, nomeClasses[i]);
        }
        return totalClasse;
    }
    //soma dos totais de todas as classes
    somaTotaisClasses(){
        const vetTemp = Object.values(this.totalPorClasse());
        let soma = 0;
        for(let i=0; i<vetTemp.length; i++){
            soma += parseFloat(vetTemp[i]);
        }
        return soma;
    }
    //retorna a ocorrência de uma Classe para uma Entrada
    ocorrenciaClasseParaEntrada(_entrada='', _classe=''){
        const categorias = this.frequencia();
        let retorno = 0;

        categorias.forEach((item) => {
            if(item['Entrada'] == _entrada){
                retorno = parseFloat(item[_classe]);
            }
        });
        return retorno;
    }
    //Calula a probabilidade da entrada pertencer a uma determinada classe
    _NaiveBayes(_entrada=''){
        const nomeClasses = this.retornaClasses();
        const totalClasse = this.totalPorClasse();

        const categorias = this.frequencia();
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
            probabilidade[nomeClasses[i]] = (this.ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]) / totalClasse[nomeClasses[i]]) * (totalClasse[nomeClasses[i]] / this.somaTotaisClasses()) / (soma/this.somaTotaisClasses());
        }
        return probabilidade;
    }

    train(config={}){
        if(config.input) this.entradas = config.input; else this.entradas = [''];
        if(config.output) this.classes = config.output; else this.classes = [''];
    }

    predict(selEntrada=''){
        const nomeClasses = this.retornaClasses();
        let nome = '';
        if(selEntrada.toString().trim().length > 0){
            const Naive = this._NaiveBayes(selEntrada);
    
            let probabilidade = 0;
            for(let i=0; i<nomeClasses.length; i++){
                const percentual = Number(parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2));
                if(percentual >= probabilidade){
                    probabilidade = percentual;
                    nome = nomeClasses[i];
                }
            }
        }else{
            nome = '';
        }
        return nome;
    }
    

}