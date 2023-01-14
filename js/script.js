let qtdcartas=0;
let tempImgFrente='';
let jogadas=0;
let idInterval;
let timer=0;
const imgFrente=['<img src="img/bobrossparrot.gif" alt="1">',
'<img src="img/explodyparrot.gif" alt="2">',
'<img src="img/fiestaparrot.gif" alt="3">',
'<img src="img/metalparrot.gif" alt="4">',
'<img src="img/revertitparrot.gif" alt="5">',
'<img src="img/tripletsparrot.gif" alt="6">',
'<img src="img/unicornparrot.gif" alt="7">'];
tempImgFrente=randomizer(imgFrente);
const contCartas=document.querySelector('.container');
function criarJogo(){
    jogadas=0;
    if(arguments[0]!==undefined)    qtdcartas=arguments[0];
    else{
        qtdcartas=0;
        while(qtdcartas<4 || qtdcartas>14 || qtdcartas%2!=0){
            qtdcartas = prompt("Com quantas cartas você deseja jogar? (de 4 a 14 e par)");
        }
    }
    contCartas.innerHTML='';
    let tempContCartas=[];

    for(let i=qtdcartas/2;i>0;i--){
        tempContCartas.push(`
        <div class="card" onclick="clickCarta(this)">
            <div class="front-face face virada">
                ${tempImgFrente[i]}
            </div>
            <div class="back-face face">
                <img src="img/back.png" alt="Verso">
            </div>
        </div>
    `);
        tempContCartas.push(`
        <div class="card" onclick="clickCarta(this)">
            <div class="front-face face virada">
                ${tempImgFrente[i]}
            </div>
            <div class="back-face face">
                <img src="img/back.png" alt="Verso">
            </div>
        </div>
    `);
    }
    tempContCartas=randomizer(tempContCartas);
    contCartas.innerHTML=tempContCartas.join('');
    timer=0;
    idInterval = setInterval(() => {
        timer++;
        document.querySelector('.contador').innerText=timer;
    }, 1000);
}

//Fisher–Yates Shuffle
function randomizer(array){
    let tam=array.length;
    while(tam>0){
        const i=Math.floor(Math.random()*tam);
        tam--;
        const x=array[tam];
        array[tam]=array[i];
        array[i]=x
    }
    return array;
}

function checar(){
    console.log(contCartas.querySelectorAll('.acertou').length);
    if(contCartas.querySelectorAll('.acertou').length>=qtdcartas){
        clearInterval(idInterval);
        setTimeout(() => {
            alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${timer} segundos!`);
            setTimeout(() => {
                let resp=0;
                while(resp!=='não' && resp!=='sim'){
                    resp=prompt('Reiniciar a partida?(sim ou não)');
                    if(resp==='sim') criarJogo();
                    else if(resp==='não') return;
                }
            }, 1000);
        }, 200);
    }
}

let primeiraCarta=undefined;
function clickCarta(elemento){
    jogadas++;
    elemento.children[0].classList.toggle('virada');
    elemento.children[1].classList.toggle('virada');
    if(primeiraCarta===undefined) primeiraCarta=elemento;
    else if(elemento===primeiraCarta) primeiraCarta=undefined;
    if(elemento!==primeiraCarta && primeiraCarta!==undefined){
        if(elemento.children[0].children[0].getAttribute('src')!==primeiraCarta.children[0].children[0].getAttribute('src')){
            const temp=primeiraCarta;
            setTimeout(() => {
                elemento.children[0].classList.toggle('virada');
                elemento.children[1].classList.toggle('virada');
                temp.children[0].classList.toggle('virada');
                temp.children[1].classList.toggle('virada');
            }, 1000);
            primeiraCarta=undefined;
        } else{
            elemento.classList.add('acertou');
            primeiraCarta.classList.add('acertou');
            primeiraCarta=undefined;
            checar();
        }
    }
}
criarJogo();