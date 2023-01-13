let qtdpares=0;
let tempImgFrente='';
const imgFrente=['<img src="img/bobrossparrot.gif" alt="Verso">',
'<img src="img/explodyparrot.gif" alt="Verso">',
'<img src="img/fiestaparrot.gif" alt="Verso">',
'<img src="img/metalparrot.gif" alt="Verso">',
'<img src="img/revertitparrot.gif" alt="Verso">',
'<img src="img/tripletsparrot.gif" alt="Verso">',
'<img src="img/unicornparrot.gif" alt="Verso">'];
tempImgFrente=randomizer(imgFrente);
function criarJogo(){
    if(arguments[0]!==undefined)    qtdpares=arguments[0];
    else{

        qtdpares=0;
        while(qtdpares<2||qtdpares>6){
            qtdpares = prompt("Com quantos pares você deseja jogar? (de 2 a 6 pares)");
            console.log(qtdpares)
        }
    }

    const contCartas=document.querySelector('.container');
    contCartas.innerHTML='';
    let tempContCartas=[];

    for(let i=qtdpares;i>0;i--){
        tempContCartas.push(`
        <div class="card">
            <div class="front-face face">
                ${tempImgFrente[i]}
            </div>
            <div class="back-face face">
                <img src="img/back.png" alt="Verso">
            </div>
        </div>
    `);
        tempContCartas.push(`
        <div class="card">
            <div class="front-face face">
                ${tempImgFrente[i]}
            </div>
            <div class="back-face face">
                <img src="img/back.png" alt="Verso">
            </div>
        </div>
    `);
    }
    tempContCartas=randomizer(tempContCartas);
    contCartas.innerHTML=tempContCartas;
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
criarJogo();