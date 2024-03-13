const dadosEndereco = ["cep", "logradouro", "complemento", "bairro", "localidade", "uf", "ddd"]

async function pesquisaCepPeloEndereco (){

    const estado = document.getElementById("estado").value
    const cidade = document.getElementById("cidade").value.replace(/\s/g, "%20")
    const rua = document.getElementById("rua").value.replace(/\s/g, "+")

    if (estado == '' || cidade == '' || rua == '') {
        alert("Digite todos os campos por gentileza")
    }
    else {

        try {
            const conteudo = document.getElementById("conteudoRetornado")
            const url = 'https://viacep.com.br/ws/' + estado + '/' + cidade + '/' + rua + '/json/'
            const resposta = await fetch(url)
            conteudo.innerHTML = '';
            const dados = await resposta.json();
            if (dados.length == 0 || dados[0].logradouro == '') {
                throw new Error("Ocorreu um erro");
            }
            else {
                for (const dado of dados) {
                    const div = document.createElement('div')
                    div.id = 'blocoResultados'
                    conteudo.appendChild(div)
                    for (let i = 0; i < dadosEndereco.length; i++ ){
                        const span1 = document.createElement('span')
                        span1.textContent = `${PrimeiraLetraMaiusculaETextoMaiusculo(dadosEndereco[i])}: `
                        span1.id = "spanLeft"
                        const span2 = document.createElement('span')
                        span2.textContent = `${dado[dadosEndereco[i]]}`
                        span2.id = "spanRight"
                        const paragrafos = document.createElement('p')
                        paragrafos.id = "paragrafosResultado"
                        paragrafos.appendChild(span1)
                        paragrafos.appendChild(span2)
                        div.appendChild(paragrafos)
                    }
                }
            }
            } catch (error) {
                alert("Dados inseridos incorretamente" + error);
            }
    }
}

function PrimeiraLetraMaiusculaETextoMaiusculo(texto) {
    if (texto == 'cep' || texto == 'uf' || texto == 'ddd') {
        return texto.toUpperCase()
    }
    else {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }
}

function limpaCampoConteudoRetornado () {
    const divParaLimpar = document.getElementById("conteudoRetornado"); // Substitua "suaDiv" pelo ID da sua div
    while (divParaLimpar.firstChild) {
        divParaLimpar.removeChild(divParaLimpar.firstChild);
    }
    const cidade = document.getElementById("cidade")
    while (cidade.firstChild) {
        cidade.removeChild(cidade.firstChild);
    }
    
}

function limpaCampoConteudoRetornadoSecundario () {
    const divParaLimpar = document.getElementById("conteudoRetornadoSecundario"); // Substitua "suaDiv" pelo ID da sua div
    while (divParaLimpar.firstChild) {
        divParaLimpar.removeChild(divParaLimpar.firstChild);
    }

}

async function pesquisaEnderecoPeloCep() {
    const cep = document.getElementById("cep").value.split("-").join("")

    if (cep.length !== 8 || isNaN(cep)){
        alert("CEP digitado incorretamente")
    }
    else {
        try {
            const conteudo = document.getElementById("conteudoRetornadoSecundario")
            const url = 'https://viacep.com.br/ws/' + cep + '/json/'
            const resposta = await fetch(url)
            conteudo.innerHTML = '';
            const dados = await resposta.json();
            if (dados.erro == 'true'){
                throw new Error("Ocorreu um erro");
            }
            else {
                const div = document.createElement('div')
                div.id = 'blocoResultados'
                conteudo.appendChild(div)
                for (let i = 0; i < dadosEndereco.length; i++ ){
                    if (dadosEndereco[i] !== "cep"){
                        const span1 = document.createElement('span')
                        span1.textContent = `${PrimeiraLetraMaiusculaETextoMaiusculo(dadosEndereco[i])}: `
                        span1.id = "spanLeft"
                        const span2 = document.createElement('span')
                        span2.textContent = `${dados[dadosEndereco[i]]}`
                        span2.id = "spanRight"
                        const paragrafos = document.createElement('p')
                        paragrafos.id = "paragrafosResultado"
                        paragrafos.appendChild(span1)
                        paragrafos.appendChild(span2)
                        div.appendChild(paragrafos)
                    }
                }
            }
            } catch (error) {
                alert("Dados inseridos incorretamente");
            }
    }
}

document.getElementById("estado").addEventListener("change", async function geraMunicipios (){
    const select = document.getElementById("cidade")
    const estado = document.getElementById("estado").value
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estado + '/municipios'
    const resposta = await fetch(url)
    const dados = await resposta.json();

    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    for (const dado of dados) {
            const option = document.createElement('option')
            option.id = "municipio"
            option.value = dado['nome']
            option.textContent = dado['nome']
            select.appendChild(option)
        }
})

document.getElementById('cep').addEventListener('input', function(event) {
    const cep = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const formattedCep = formatarCep(cep);
    event.target.value = formattedCep;
  });

  function formatarCep(cep) {
    if (cep.length > 5) {
      // Se o CEP tem mais de 5 caracteres, adicionamos o traço na posição correta
      return cep.slice(0, 5) + '-' + cep.slice(5);
    } else {
      return cep;
    }
  }
  