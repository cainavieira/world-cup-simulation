# World Cup Simulation

Simulador da Copa do Mundo desenvolvido em React + Vite.

O app sorteia os grupos, simula a fase de grupos, gera o mata-mata (oitavas até final), define campeão e vice, e envia o resultado final para a API.

## Objetivo

Este projeto foi construído para demonstrar:
- organização de frontend com componentes reutilizáveis
- separação de responsabilidades (UI, regra de negócio e integração com API)
- simulação de regras de campeonato de forma clara e testável

## Stack

- React
- Vite
- JavaScript (ES6+)
- CSS Modules

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm 9+

### Passos

```bash
npm install
npm run dev
```

Abra a URL mostrada no terminal (normalmente `http://localhost:5173`).

## Scripts disponíveis

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # preview da build local
```

## Estrutura do projeto

```text
src/
	components/   # componentes de interface (cards, fases)
	services/     # integração HTTP com API externa
	utils/        # lógica de simulação (grupos e eliminatórias)
	App.jsx       # orquestração principal da aplicação
```

## Fluxo da simulação

1. Busca as 32 seleções na API
2. Sorteia os grupos (A-H)
3. Simula 3 rodadas de cada grupo
4. Classifica por pontos, saldo e gols pró
5. Gera oitavas, quartas, semifinal e final
6. Envia resultado final (campeão e vice) para API

## Integração com API

- Base URL: `https://development-internship-api.geopostenergy.com/WorldCup`
- Header obrigatório: `git-user`
- Endpoints usados:
	- `GET /GetAllTeams`
	- `POST /FinalResult`

## Pontos técnicos aplicados

- Layered architecture (components, services, utils)
- CSS Modules para encapsulamento de estilos
- Componentização com reuso de `CardPartida`
- Funções puras de simulação separadas da camada de UI


