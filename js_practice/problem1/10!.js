//6. Calculate 10!

function factorial(num){
    if(num==1 || num==0){
        return 1;
    }
    return factorial(num-1)*num;
}

console.log(factorial(10))