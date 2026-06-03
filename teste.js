const arr = [1, 2, 3, 2, 4, 3];
const contagem = {}

arr.forEach((arr) => {
if(contagem[arr]){
    contagem[arr] = contagem[arr] + 1;
} else {
    contagem[arr] = 1
}
});
console.log(contagem);
