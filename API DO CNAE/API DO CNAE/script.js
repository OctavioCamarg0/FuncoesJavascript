document.addEventListener("DOMContentLoaded", async function() {
    const listaCNAE = document.getElementById("cnae-list");
    const resposta = await fetch('https://servicodados.ibge.gov.br/api/v2/cnae/classes');
    const dados = await resposta.json();

    dados.forEach(function(cnae) {
        const li = document.createElement('li');
        const titulo = document.createElement('h3'); 
        titulo.textContent = `Cnae: ${cnae.id} - ${cnae.descricao}`;
        li.appendChild(titulo);

        
        const observacoesUl = document.createElement('ul'); 
        const observacoes = cnae.observacoes;
        
        observacoes.forEach(function(obs) {
            const observacaoLi = document.createElement('li');
            observacaoLi.textContent = obs;
            observacoesUl.appendChild(observacaoLi);
        });
        li.appendChild(observacoesUl);
        listaCNAE.appendChild(li);
    });
});
