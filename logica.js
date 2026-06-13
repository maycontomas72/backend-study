const nums = [7, 11, 8, 4, 2];

let primeiroPar = null

for(const num of nums){
    if(num % 2 === 0){
        primeiroPar = num;
        break
    }
}

console.log(primeiroPar);