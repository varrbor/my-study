var Singleton = (function() {
    var instance;
    function createInstance(){
        return new Object("I'm am an instance");
    }
    return {
        getInstance: function(){
            if(!instance){
                instance= createInstance()
            }
            return instance
        }}
})();

console.log(Singleton.getInstance())
console.log(Singleton.getInstance())