function gerarCalendario() {
    const ano = document.getElementById('anoInput').value;
  
    if (!ano || isNaN(ano)) {
      alert('Por favor, insira um ano válido.');
      return;
    }
  
    const calendarioDiv = document.getElementById('calendario');
    calendarioDiv.innerHTML = '';
  
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
    for (let i = 0; i < meses.length; i++) {
      const nomeMes = meses[i];
      const diasNoMes = new Date(ano, i + 1, 0).getDate();
  
      const tabela = document.createElement('table');
      const linhaCabecalho = document.createElement('tr');
      const celulaCabecalho = document.createElement('th');
      celulaCabecalho.colSpan = 7;
      celulaCabecalho.textContent = nomeMes + ' ' + ano;
      linhaCabecalho.appendChild(celulaCabecalho);
      tabela.appendChild(linhaCabecalho);
  
      const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const linhaDias = document.createElement('tr');
  
      for (let j = 0; j < diasDaSemana.length; j++) {
        const celulaDia = document.createElement('td');
        celulaDia.textContent = diasDaSemana[j];
        linhaDias.appendChild(celulaDia);
      }
  
      tabela.appendChild(linhaDias);
  
      let diaAtual = 1;
      for (let j = 0; j < 6; j++) {
        const linha = document.createElement('tr');
        for (let k = 0; k < 7; k++) {
          const celula = document.createElement('td');
          if (j === 0 && k < new Date(ano, i, 1).getDay()) {
            celula.textContent = '';
          } else if (diaAtual > diasNoMes) {
            break;
          } else {
            celula.textContent = diaAtual;
            const dataAtual = new Date(ano, i, diaAtual);
            if (k === 0 || (dataAtual.getDay() === 0) || eFeriado(dataAtual)) {
              celula.style.backgroundColor = 'red';
              celula.style.color = 'white';
              celula.style.fontWeight = 'bold';
            }
            diaAtual++;
          }
          linha.appendChild(celula);
        }
        tabela.appendChild(linha);
      }
  
      calendarioDiv.appendChild(tabela);
    }
  }
  
  function eFeriado(data) {
    const feriados = [
      '01/01', // Ano Novo
      '01/05', // Dia do Trabalho
      '25/07', // Dia Estadual da Consciencia Negra
      '07/09', // Independência do Brasil
      '12/10', // Dia de Nossa Senhora Aparecida
      '15/10', // Dia da proclamação da república
      '02/11', // Finados
      '25/12'  // Natal
    ];
  
    const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}`;
    return feriados.includes(dataFormatada);
  }  