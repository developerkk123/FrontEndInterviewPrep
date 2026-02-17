myFun();

var myFun = function(){
    console.log("first")
}

myFun();

function myFun(){
    console.log("second");
}
myFun();

/**
 * @Memory Phase: me ek var myFun register hua as undefined & 
 * myFunc function v register hua but usse pahle same name se var hai 
 * now var myFun: fn(){} update kar diya
 * 
 * Code Phase: 
 *  line 1 : myFun now pinting a function line 9 not line 3; so print
 * Second 
 * 
 * Now next line 3 reinitializing myFun with new fn;
 * 
 * line 7 will print first
 * 
 * then line 12 also fist
 * 
 */