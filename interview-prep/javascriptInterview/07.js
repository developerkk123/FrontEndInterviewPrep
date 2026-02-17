var fullname = "Kundan Kumar"

var obj = {
    fullname: "Mr Kundan Kumar",
    prop:{
        fullname: "Inside Prop",
        getFullname: function(){
            return this.fullname;
        }
    },
    getFullname: function(){
        return this.fullname
    },
    getFullNamev2: ()=> console.log(this), // this refer to window in browser
    getFullNameV3: (function(){
        return this.fullname
    })() // this fn return computed value
}
console.log(obj.prop.getFullname());
console.log(obj.getFullname());
console.log(obj.getFullNamev2());
console.log(obj.prop.getFullNameV3);