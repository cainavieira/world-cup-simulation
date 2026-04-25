import CardPartida from "./CardPartida";
import styles from "./FaseEliminatoria.module.css";

export default function FaseEliminatoria({ eliminatoria }) {
  const { oitavas, quartas, semi, final, campeao, vice } = eliminatoria;

  return (
    <section className={styles.chavesFlex}>
      <h2 className={styles.titulo}>Fase Eliminatória</h2>

      <Rodada titulo="Oitavas de Final" partidas={oitavas} colunas={4} />

      <Rodada titulo="Quartas de Final" partidas={quartas} colunas={4} />

      <Rodada titulo="Semifinal" partidas={semi} colunas={2} />

      <div>
        <h3 className={styles.tituloFinal}>Final</h3>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <CardPartida {...final} simulado />
        </div>
      </div>

      <div className={styles.podio}>
        <div className={styles.campeao}>
          <span style={{ fontSize: "2.5rem" }}>🏆</span>
          <p className={styles.campeaoLabel}>Campeão</p>
          <p className={styles.campeaoNome}>{campeao.pais}</p>
        </div>
        <div className={styles.vice}>
          <span style={{ fontSize: "2rem" }}>🥈</span>
          <p className={styles.viceLabel}>Vice-campeão</p>
          <p className={styles.viceNome}>{vice.pais}</p>
        </div>
      </div>
    </section>
  );
}

function Rodada({ titulo, partidas, colunas }) {
  return (
    <div>
      <h3 className={styles.tituloRodada}>{titulo}</h3>
      <div
        className={styles.partidas}
        style={{ gridTemplateColumns: `repeat(${colunas}, 1fr)` }}
      >
        {partidas.map((partida) => (
          <CardPartida key={partida.id} {...partida} simulado />
        ))}
      </div>
    </div>
  );
}
