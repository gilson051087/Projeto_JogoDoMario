const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "reta";
            break;
        case random < 0.66:
            result = "curva";
            break;
        default:
            result = "confronto";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if (block === "reta") {
            TotalTestSkill1 = diceResult1 + character1.velocidade;
            TotalTestSkill2 = diceResult2 + character2.velocidade;

            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);

        } else if (block === "curva") {
            TotalTestSkill1 = diceResult1 + character1.manobrabilidade;
            TotalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);

        } else if (block === "confronto") {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;

            console.log(`${character1.nome} confrontou ${character2.nome}!`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

            if (powerResult1 > powerResult2) {
                console.log(`${character1.nome} ganhou o confronto e marcou um ponto!`);
                character1.pontos++;
                if (character2.pontos > 0) {
                    character2.pontos--;
                }
            } else if (powerResult2 > powerResult1) {
                console.log(`${character2.nome} ganhou o confronto e marcou um ponto!`);
                character2.pontos++;
                if (character1.pontos > 0) {
                    character1.pontos--;
                }
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido!");
            }
        }

        // Verificando o vencedor da rodada
        if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        } else if (TotalTestSkill2 > TotalTestSkill1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }

        console.log("----------------------------------------------------");
    }

    // Resultado final
    console.log(`Resultado final: ${character1.nome} ${character1.pontos} x ${character2.nome} ${character2.pontos}`);
    if (character1.pontos > character2.pontos) {
        console.log(`${character1.nome} é o grande vencedor!`);
    } else if (character2.pontos > character1.pontos) {
        console.log(`${character2.nome} é o grande vencedor!`);
    } else {
        console.log("A corrida terminou empatada!");
    }
}

async function declareWinner(character1, character2){
    console.log("Resultado final: ")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

    if(character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} venceu a corrida! Parabéns! `)
    } else if(character2.pontos > character1.pontos){
        console.log(`\n${character2.nome} venceu a corrida! Parabéns! `)
    } else {
        console.log("A corrida terminou em empate! ")
    }
}

(async function main() { // declaração auto-invocável
    console.log(`Corrida entre ${player1.nome} e ${player2.nome} começando...\n`); // Template String ou interpolação de String

    await playRaceEngine(player1, player2); // await a função espera a outra para executar, encadeamento de funções
    await declareWinner(player1, player2);
})();
