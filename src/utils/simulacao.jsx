
export function sortearGrupos(teams) {
  const timesEmbaralhados = [...teams].sort(() => Math.random() - 0.5);
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const grupos = {};
  for (let i = 0; i < letras.length; i++) {
    grupos[letras[i]] = timesEmbaralhados.slice(i * 4, i * 4 + 4);
  }
  return grupos;
}


function gerarRodadas(times) {
  const time1 = times[0];
  const time2 = times[1];
  const time3 = times[2];
  const time4 = times[3];

  const rodada1 = [
    { timeA: time1, timeB: time2 },
    { timeA: time3, timeB: time4 },
  ];

  const rodada2 = [
    { timeA: time1, timeB: time3 },
    { timeA: time2, timeB: time4 },
  ];

  const rodada3 = [
    { timeA: time1, timeB: time4 },
    { timeA: time2, timeB: time3 },
  ];

  return [rodada1, rodada2, rodada3];
}



function placarAleatorio() {
  return Math.floor(Math.random() * 6);
}

export function simularGrupo(letra, times) {
  const rodadas = gerarRodadas(times).map((rodada) =>
    rodada.map(({ timeA, timeB }) => ({
      timeA,
      timeB,
      golsA: placarAleatorio(),
      golsB: placarAleatorio(),
    })),
  );

  const estatisticas = {};
  times.forEach((time) => {
    estatisticas[time.id] = {
      time: time,
      pts: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      gp: 0,
      gc: 0,
      sg: 0,
    };
  });

  rodadas.flat().forEach(({ timeA, timeB, golsA, golsB }) => {
    estatisticas[timeA.id].gp += golsA;
    estatisticas[timeA.id].gc += golsB;
    estatisticas[timeA.id].sg += golsA - golsB;
    estatisticas[timeB.id].gp += golsB;
    estatisticas[timeB.id].gc += golsA;
    estatisticas[timeB.id].sg += golsB - golsA;

    if (golsA > golsB) {
      estatisticas[timeA.id].pts += 3;
      estatisticas[timeA.id].vitorias += 1;
      estatisticas[timeB.id].derrotas += 1;
    } else if (golsB > golsA) {
      estatisticas[timeB.id].pts += 3;
      estatisticas[timeB.id].vitorias += 1;
      estatisticas[timeA.id].derrotas += 1;
    } else {
      estatisticas[timeA.id].pts += 1;
      estatisticas[timeA.id].empates += 1;
      estatisticas[timeB.id].pts += 1;
      estatisticas[timeB.id].empates += 1;
    }
  });

  const classificacao = Object.values(estatisticas).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.sg !== a.sg) return b.sg - a.sg;
    if (b.gp !== a.gp) return b.gp - a.gp;
  });

  return { rodadas, classificacao };
} 

export function simularTodosGrupos(grupos) {
  const resultado = {};

  for (const letra in grupos) {
    resultado[letra] = simularGrupo(letra, grupos[letra]);
  }
  return resultado;
}



function simularPenaltis() {
  let a, b;
  do {
    a = 2 + Math.floor(Math.random() * 4);
    b = 2 + Math.floor(Math.random() * 4);
  } while (a === b);
  return { penaltiA: a, penaltiB: b };
}

function simularPartidaEliminatoria(timeA, timeB, id) {
  const golsA = placarAleatorio();
  const golsB = placarAleatorio();
  let penaltiA = 0;
  let penaltiB = 0;
  let vencedor;

  if (golsA > golsB) {
    vencedor = timeA;
  } else if (golsB > golsA) {
    vencedor = timeB;
  } else {
    const penalti = simularPenaltis();
    penaltiA = penalti.penaltiA;
    penaltiB = penalti.penaltiB;
    vencedor = penaltiA > penaltiB ? timeA : timeB;
  }

  return { id, timeA, timeB, golsA, golsB, penaltiA, penaltiB, vencedor };
}

function simularFase(partidas, prefixo = "") {
  const resultados = partidas.map(({ timeA, timeB, id }) =>
    simularPartidaEliminatoria(timeA, timeB, id),
  );

  const proxFase = [];
  for (let i = 0; i + 1 < resultados.length; i += 2) {
    proxFase.push({
      timeA: resultados[i].vencedor,
      timeB: resultados[i + 1].vencedor,
      id: `${prefixo}${proxFase.length + 1}`,
    });
  }
  return { resultados, proxFase };
}


function gerarOitavas(resultadosGrupos) {
  const pegarClassificado = (letra, posicao) =>
    resultadosGrupos[letra].classificacao[posicao].time;
  return [
    { timeA: pegarClassificado("A", 0), timeB: pegarClassificado("B", 1), id: "O1" },
    { timeA: pegarClassificado("C", 0), timeB: pegarClassificado("D", 1), id: "O2" },
    { timeA: pegarClassificado("E", 0), timeB: pegarClassificado("F", 1), id: "O3" },
    { timeA: pegarClassificado("G", 0), timeB: pegarClassificado("H", 1), id: "O4" },
    { timeA: pegarClassificado("B", 0), timeB: pegarClassificado("A", 1), id: "O5" },
    { timeA: pegarClassificado("D", 0), timeB: pegarClassificado("C", 1), id: "O6" },
    { timeA: pegarClassificado("F", 0), timeB: pegarClassificado("E", 1), id: "O7" },
    { timeA: pegarClassificado("H", 0), timeB: pegarClassificado("G", 1), id: "O8" },
  ];
}


export function simularFaseEliminatoria(resultadosGrupos) {
  const oitavasPartidas = gerarOitavas(resultadosGrupos);
  const { resultados: oitavas, proxFase: quartasPartidas } = simularFase(
    oitavasPartidas,
    "Q",
  );
  const { resultados: quartas, proxFase: semiPartidas } = simularFase(
    quartasPartidas,
    "SF",
  );
  const { resultados: semi, proxFase: finalPartidas } = simularFase(
    semiPartidas,
    "F",
  );
  const { resultados: finalResultados } = simularFase(finalPartidas);

  const final = finalResultados[0];
  const campeao = final.vencedor;
  const vice = final.vencedor.id === final.timeA.id ? final.timeB : final.timeA;

  return { oitavas, quartas, semi, final, campeao, vice };
}
