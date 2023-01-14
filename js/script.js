let qtdpares=0;
let tempImgFrente='';
let jogadas=0;
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
    if(arguments[0]!==undefined)    qtdpares=arguments[0];
    else{
        qtdpares=0;
        while(qtdpares<2||qtdpares>6){
            qtdpares = prompt("Com quantos pares você deseja jogar? (de 2 a 6 pares) -1 para sair");
            if(qtdpares<0)  return;
        }
    }
    contCartas.innerHTML='';
    let tempContCartas=[];

    for(let i=qtdpares;i>0;i--){
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
    if(contCartas.querySelectorAll('.acertou').length>=qtdpares*2){
        setTimeout(() => {
            alert(`Você ganhou em ${jogadas} jogadas!`);
            setTimeout(criarJogo,1000);
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