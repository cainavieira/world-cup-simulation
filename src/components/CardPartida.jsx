import styles from "./CardPartida.module.css";

export default function CardPartida({
  timeA,
  timeB,
  golsA,
  golsB,
  penaltiA,
  penaltiB,
  vencedor,
  simulado,
}) {
  const temPenaltis = penaltiA > 0 || penaltiB > 0;
  const vencedorA = vencedor?.id === timeA?.id;
  const vencedorB = vencedor?.id === timeB?.id;

  return (
    <div className={styles.card}>
      <div className={`${styles.time} ${vencedorA ? styles.vencedor : ""}`}>
        <span className={styles.nome}>{timeA?.pais}</span>
        {simulado && <span className={styles.gols}>{golsA}</span>}
      </div>

      <div className={styles.centro}>
        {simulado ? (
          temPenaltis ? (
            <span className={styles.penaltiTexto}>PEN</span>
          ) : (
            <span className={styles.styleSpan}>×</span>
          )
        ) : (
          <span className={styles.styleSpan}>vs</span>
        )}
      </div>

      <div className={`${styles.time} ${vencedorB ? styles.vencedor : ""}`}>
        {simulado && <span className={styles.gols}>{golsB}</span>}
        <span className={styles.nome}>{timeB?.pais}</span>
      </div>

      {temPenaltis && simulado && (
        <div className={styles.penaltiSpan}>
          <span>{penaltiA}</span>
          <span className={styles.styleSpan}>pênalti</span>
          <span>{penaltiB}</span>
        </div>
      )}
    </div>
  );
}
