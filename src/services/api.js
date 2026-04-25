const git_user = "cainavieira";
const url_base =
  "https://development-internship-api.geopostenergy.com/WorldCup";

export async function getTimes() {
  try {
    const res = await fetch(`${url_base}/GetAllTeams`, {
      method: "GET",
      headers: { "git-user": git_user },
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar os times. Status: ${res.status}`);
    }

    const data = await res.json();
    return data.map((times) => ({
      id: times.token,
      pais: times.nome,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postFinalResult(dadosFinal) {
  const infoFinalResult = {
    equipeA: dadosFinal.vencedorId,
    equipeB: dadosFinal.viceId,
    golsEquipeA: dadosFinal.placarVencedor,
    golsEquipeB: dadosFinal.placarVice,
    golsPenaltyTimeA: dadosFinal.penaltisVencedor,
    golsPenaltyTimeB: dadosFinal.penaltisVice,
  };

  try {
    const res = await fetch(`${url_base}/FinalResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "git-user": git_user,
      },
      body: JSON.stringify(infoFinalResult),
    });

    if (!res.ok) {
      throw new Error(
        `Erro ao enviar resultado. Status: ${res.status}.`,
      );
    }

    return await res.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
