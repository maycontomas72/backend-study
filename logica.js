const nums = [9, 9, 8]; //encontrar o segundo maior número

let Maior = 0;
let segundoMaior = 0;

for(const num of nums){
    if(num > Maior){
        segundoMaior = Maior
        Maior = num;
    }

    if(num > segundoMaior && num !== Maior){
        segundoMaior = num
    }

}

console.log(segundoMaior);