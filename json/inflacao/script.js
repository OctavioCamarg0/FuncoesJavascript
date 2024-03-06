document.addEventListener("DOMContentLoaded", async function(){  
    const conteudo = document.getElementById("conteudo");

    const resposta = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1705/variaveis?view=OLAP&localidades=BR');

    const dados = await resposta.json();    

    dados.forEach( function(inflacao) {       
        const blocoInflacao = document.createElement('div') //Criando div
        blocoInflacao.classList.add("bloco-inflacao") //Atribuindo o nome de uma classe
        const subTitulo = document.createElement("ul")
        subTitulo.id = "subtitulo"
        const liSubTitulo = document.createElement("li")
        liSubTitulo.textContent = `${inflacao.medida} - (${inflacao.unidade})`
        
        subTitulo.appendChild(liSubTitulo)
        blocoInflacao.appendChild(subTitulo)
        conteudo.appendChild(blocoInflacao)

        const resultado = inflacao.resultados

        resultado.forEach (function(resultado){
            const ol = document.createElement("ol")
            const series = resultado.series
            series.forEach(function(seriesGeral){
                
                const serieData = seriesGeral.serie

                for (const anoMes in serieData) {
                    const liSerie = document.createElement("li")
                    liSerie.textContent = `${anoMes} - ${serieData[anoMes]}`
                    ol.appendChild(liSerie)
                    subTitulo.appendChild(ol)
                }

            })
        })

    })
}
)  
  