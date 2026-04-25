import CardPartida from "./CardPartida";
import styles from "./FaseDeGrupo.module.css";

export default function FaseDeGrupo({ grupos, resultadosGrupos }) {
  const letras = Object.keys(grupos);

  return (
    <section style={{marginBottom:"3rem"}}>
      <h2 className={styles.titulo}>Fase de Grupos</h2>
      <div className={styles.grid}>
        {letras.map((letra) => (
          <GrupoCard
            key={letra}
            letra={letra}
            times={grupos[letra]}
            resultado={resultadosGrupos?.[letra]}
          />
        ))}
      </div>
    </section>
  );
}

function GrupoCard({ letra, times, resultado }) {
  return (
    <div className={styles.grupo}>
      <div className={styles.grupoHeader}>Grupo {letra}</div>

      {resultado ? (
        <>
          <ClassificacaoTabela classificacao={resultado.classificacao} />
          <div style={{padding:"0 0.75rem 0.75rem"}}>
            {resultado.rodadas.map((rodada, i) => (
              <div key={i} className={styles.rodadaBloco}>
                <span className={styles.rodadaLabel}>Rodada {i + 1}</span>
                {rodada.map((partida, j) => (
                  <CardPartida key={j} {...partida} simulado={true} />
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <ul className={styles.lista}>
          {times.map((time) => (
            <li key={time.id} className={styles.timeItem}>
              {time.pais}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ClassificacaoTabela({ classificacao }) {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>#</th>
          <th className={styles.thSelecao}>Seleção</th>
          <th title="Pontos">Pts</th>
          <th title="Vitórias">V</th>
          <th title="Empates">E</th>
          <th title="Derrotas">D</th>
          <th title="Gols pró">GP</th>
          <th title="Gols contra">GC</th>
          <th title="Saldo de gols">SG</th>
        </tr>
      </thead>
      <tbody>
        {classificacao.map((row, i) => (
          <tr
            key={row.time.id}
            className={i < 2 ? styles.classificado : styles.eliminado}
          >
            <td>{i + 1}</td>
            <td className={styles.tdSelecoes}>
              {row.time.pais}
            </td>
            <td style={{fontWeight:"700"}}>{row.pts}</td>
            <td>{row.vitorias}</td>
            <td>{row.empates}</td>
            <td>{row.derrotas}</td>
            <td>{row.gp}</td>
            <td>{row.gc}</td>
            <td>{row.sg > 0 ? `+${row.sg}` : row.sg}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
