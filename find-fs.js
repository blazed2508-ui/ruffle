(function(){
  var t=setInterval(function(){
    for(var k in window){
      try{
        var v=window[k];
        if(v&&typeof v==="object"&&v.FS&&typeof v.FS.readdir==="function"){
          window.__unityFS=v.FS;
          clearInterval(t);
          break;
        }
        if(v&&typeof v==="object"&&typeof v.readdir==="function"&&typeof v.mkdir==="function"){
          window.__unityFS=v;
          clearInterval(t);
          break;
        }
      }catch(e){}
    }
  },200);
})();
