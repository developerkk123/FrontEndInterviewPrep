// poly fills of forEach method

let arr = [1,2,3,4];
// write poly fill
Array.prototype.myForeach = function(callback){
    if(!callback){
        throw new Error("your myForeach: undefined is not a function");
    }
    console.log(this);// return the array on which foreach will operate
    const arr = this;
    for(let i=0; i < arr.length; i++){
        callback(arr[i], i, arr);
    }
}
arr.myForeach((item, index)=>{
    console.log(item, index);
})