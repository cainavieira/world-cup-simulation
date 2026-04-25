import { useState, useEffect } from "react";
import { getTimes, postFinalResult } from "./services/api";
import {
  sortearGrupos,
  simularTodosGrupos,
  simularFaseEliminatoria,
} from "./utils/simulacao.jsx";
import FaseDeGrupo from "./components/FaseDeGrupo";
import FaseEliminatoria from "./components/FaseEliminatoria";
import styles from "./App.module.css";

export default function App() {
  const [grupos, setGrupos] = useState(null);
  const [resultadosGrupos, setResultadosGrupos] = useState(null);
  const [eliminatoria, setEliminatoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    getTimes()
      .then((times) => {
        setGrupos(sortearGrupos(times));
        setLoading(false);
      })
      .catch((erro) => {
        setError(erro.message);
        setLoading(false);
      });
  }, []);

  function handleSimularGrupos() {
    setResultadosGrupos(simularTodosGrupos(grupos));
  }

  function handleSimularEliminatoria() {
    setEliminatoria(simularFaseEliminatoria(resultadosGrupos));
  }

  async function handleEnviarResultado() {
    const { campeao, vice, final } = eliminatoria;
    const campeaoEhA = campeao.id === final.timeA.id;

    const dadosFinal = {
      vencedorId: campeao.id,
      vencedor: campeao.pais,
      viceId: vice.id,
      vice: vice.pais,
      placarVencedor: campeaoEhA ? final.golsA : final.golsB,
      placarVice: campeaoEhA ? final.golsB : final.golsA,
      penaltisVencedor: campeaoEhA ? final.penaltiA : final.penaltiB,
      penaltisVice: campeaoEhA ? final.penaltiB : final.penaltiA,
    };
  

    try {
      await postFinalResult(dadosFinal);
      setEnviado(true);
    } catch (erro) {
      setError(`Erro ao enviar resultado: ${erro.message}`);
    }
  }

  if (loading) {
    return (
      <div className={styles.centralizado}>
        <p>Carregando seleções...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centralizado}>
        <p className={styles.erro}> {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Simulador da Copa do Mundo</h1>
        <p className={styles.subtitulo}>
          32 seleções · 8 grupos · Simulador de Partidas Completa.
        </p>
      </header>

      <main>
        <FaseDeGrupo grupos={grupos} resultadosGrupos={resultadosGrupos} />

        {!resultadosGrupos && (
          <div className={styles.acoes}>
            <button className={styles.btn} onClick={handleSimularGrupos}>
              Simular Fase de Grupos
            </button>
          </div>
        )}

        {resultadosGrupos && !eliminatoria && (
          <div className={styles.acoes}>
            <button
              className={`${styles.btn} ${styles.btnGreen}`}
              onClick={handleSimularEliminatoria}
            >
              Simular Fase Eliminatória
            </button>
          </div>
        )}

        {eliminatoria && (
          <>
            <FaseEliminatoria eliminatoria={eliminatoria} />

            <div className={styles.acoes}>
              {!enviado ? (
                <button
                  className={`${styles.btn} ${styles.btnGreen}`}
                  onClick={handleEnviarResultado}
                >
                  Registrar Campeão
                </button>
              ) : (
                <p className={styles.sucesso}>
                  Resultado registrado com sucesso!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
