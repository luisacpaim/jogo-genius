let order = [];   //ordem aleatória das cores
let clickedOrder = [];  //ordem dos cliques
let score = 0;   //para controlar a pontuação, se foi clicado na ordem correta

//0- verde
//1 - vermelho
//2 - amarelo
//3 - azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');


//CRIA ORDEM ALEATÓRIA DE CORES
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);  //variável que guarda um número aleatório a cada rodada; math.floor :: arredonda o número sorteado; random * 4 :: sorteia número de 0 a 3;
    order[order.length] = colorOrder;   //atribui o número ordem (sorteado), ao próximo número "da ordem que vai vir"
    clickedOrder = [];    //atribui o índice desejado do array com a cor sorteada

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//ACENDE A PRÓXIMA COR
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, 800);
}

//CHECA SE OS BOTÕES CLICADOS SÃO OS MESMOS DA ORDEM GERADA NO JOGO
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//FUNÇÃO PARA O CLIQUE DO USUÁRIO
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);

}

//FUNÇÃO QUE RETORNA A COR
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//FUNÇÃO PARA LEVAR PARA O PRÓXIMO NÍVEL DO JOGO :: aumenta o score e gera nova ordem
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//FUNÇÃO GAME OVER
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jovo!\nClique em OK para jogar novamente.`);
    order = [];
    clickedOrder = [];

    playGame();
}

//FUNÇÃO COMEÇAR JOGO :: zera a pontuação e roda a função de próxima sequência
let playGame = () => {
    alert('Bem vinda(o) ao Genius!\nIniciando novo jogo...');
    score = 0;
    
    nextLevel();
}

//ATIVANDO OS CLIQUES
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//PARA INICIAR O JOGO
playGame();