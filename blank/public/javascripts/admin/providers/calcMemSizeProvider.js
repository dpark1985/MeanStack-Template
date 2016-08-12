
var aitch3AdminFramework = angular.module('aitch3AdminFramework')


.factory('$calcMemSize', function(){
	return function (memSize){
    var count = 0;
    var divSize = 1024;
    var remain = memSize;
    var sign = null;
    var loop = true;
    while(loop){
      remain = remain / divSize;
      count++;
      if(remain < divSize){
        loop = false;
      }
    }
    if(count === 1){ sign = "KB"; }
    else if (count === 2){ sign = "MB"; }
    else if (count === 3){ sign = "GB"; }
    else if (count === 4){ sign = "TB"; }
    return {mem: remain, unit: sign};
  }
});
