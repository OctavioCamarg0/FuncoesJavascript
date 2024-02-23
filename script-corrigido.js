function gerarCalendario() {
    const ano = document.getElementById('anoInput').value;
  
    if (!ano || isNaN(ano)) {
      alert('Por favor, insira um ano válido.');
      return;
    }
  
    const calendarioDiv = document.getElementById('calendario');
    calendarioDiv.innerHTML = '';
  
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const hoje = new Date();

    for (let indiceMes = 0; indiceMes < meses.length; indiceMes++) {
      const nomeMes = meses[indiceMes];
      const diasNoMes = new Date(ano, indiceMes + 1, 0).getDate();
  
      const tabela = document.createElement('table');
      const linhaCabecalho = document.createElement('tr');
      const celulaCabecalho = document.createElement('th');
      celulaCabecalho.colSpan = 7;
      celulaCabecalho.textContent = nomeMes + ' ' + ano;
      linhaCabecalho.appendChild(celulaCabecalho);
      tabela.appendChild(linhaCabecalho);
  
      const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const linhaDias = document.createElement('tr');
  
      for (let diasDaSemana = 0; diasDaSemana < diasDaSemana.length; diasDaSemana++) {
        const celulaDia = document.createElement('td');
        celulaDia.textContent = diasDaSemana[diasDaSemana];
        linhaDias.appendChild(celulaDia);
      }
  
      tabela.appendChild(linhaDias);
  
      let diaAtual = 1;
      for (let diasVertical = 0; diasVertical < 6; diasVertical++) {
        const linha = document.createElement('tr');
        for (let diasHorizontal = 0; diasHorizontal < 7; diasHorizontal++) {
          const celula = document.createElement('td');
          if (diasVertical === 0 && diasHorizontal < new Date(ano, indiceMes, 1).getDay()) {
            celula.textContent = '';
          } else if (diaAtual > diasNoMes) {
            break;
          } else {
            celula.textContent = diaAtual;
            const dataAtual = new Date(ano, indiceMes, diaAtual);
            if (diasHorizontal === 0 || dataAtual.getDay() === 0 || eFeriado(dataAtual) === true) {
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
  
  function dateToDayMonth (data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  }
  
  function eFeriado(data) {
    let carnaval, pascoa, sextaSanta, corpus;

    /*----- calcula feriados moveis */
    let X, Y, a, b, c, d, g, diaDaPascoa, mesDaPascoa, diaDoMesDaPascoa;
    ano = data.getFullYear();
    if (ano <= 1699) {
        X = 22;
        Y = 2;
    } else if (ano <= 1799) {
        X = 23;
        Y = 3;
    } else if (ano <= 1899) {
        X = 24;
        Y = 4;
    } else if (ano <= 2099) {
        X = 24;
        Y = 5;
    } else if (ano <= 2199) {
        X = 24;
        Y = 6;
    } else if (ano <= 2299) {
        X = 24;
        Y = 7;
    } else if (ano === 2024) { // Adicionando lógica para o ano de 2024
        X = 24;
        Y = 1; // Ajuste para o ano bissexto de 2024
    }
  
    a = ano % 19;
    b = ano % 4;
    c = ano % 7;
  
    d = (19 * a + X) % 30;
    g = (2 * b + 4 * c + 6 * d + Y) % 7;
  
    if ((d + g) > 9) {
      diaDaPascoa = (d + g - 9);
      mesDaPascoa = "04";
    } else {
      diaDaPascoa = (d + g + 22);
      mesDaPascoa = "03";
    }
  
    if (diaDaPascoa === 26 && mesDaPascoa === "04") {
      diaDaPascoa = 19;
    } else if (diaDaPascoa === 25 && mesDaPascoa === "04" && d === 28 && a > 10) {
      diaDaPascoa = 18;
    }
  
    diaDoMesDaPascoa = diaDaPascoa.toString();
    if (diaDaPascoa <= 9) {
      diaDoMesDaPascoa = "0" + diaDoMesDaPascoa;
    }
    
    const domingoPascoa = new Date(`${ano}-${mesDaPascoa}-${diaDoMesDaPascoa}T00:00:00`); 
    let dataFeriado;
    let diaExtracao;
    let mesExtracao;

    //pascoa
    dataFeriado = domingoPascoa;
    pascoa = dateToDayMonth (dataFeriado)

    //Carnaval
    dataFeriado = new Date(domingoPascoa.getTime() - 47 * 24 * 60 * 60 * 1000);
    carnaval = dateToDayMonth (dataFeriado)

    // Sexta-feira Santa
    dataFeriado = new Date(domingoPascoa.getTime() - 2 * 24 * 60 * 60 * 1000); 
    sextaSanta = dateToDayMonth (dataFeriado)

    //Corpus Christi
    dataFeriado = new Date(domingoPascoa.getTime() + 60 * 24 * 60 * 60 * 1000); 
    corpus = dateToDayMonth (dataFeriado)

    const feriados = [
      '01/01', // Ano Novo
      '01/05', // Dia do Trabalho
      '25/07', // Dia Estadual da Consciencia Negra
      '07/09', // Independência do Brasil
      '12/10', // Dia de Nossa Senhora Aparecida
      '15/10', // Dia da proclamação da república
      '02/11', // Finados
      '25/12',  // Natal
      carnaval,
      pascoa, 
      sextaSanta,
      corpus
    ];
    
    const dataFormatada = dateToDayMonth(data);
    //const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}`;


    return feriados.includes(dataFormatada);
  }  