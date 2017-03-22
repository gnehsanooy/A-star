var oUl = document.getElementById("ul1");
var aLi =oUl.getElementsByTagName("li");
var btn =  document.getElementById("input1");
var beginLi = document.getElementsByClassName("sty1");
var endLi = document.getElementsByClassName("sty2");
var map = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
var cols = Math.sqrt(map.length);
var size = 20;
var openArr=[];
var closeArr=[];



init();
function init(){
	createMap();
	btn.onclick = function(){
		openFn();
	}
	
}
function createMap(){
	oUl.style.width = cols *(size+1)+1+"px";
    for(var i=0;i<map.length;i++){
    	var oLi = document.createElement("li");
    	oLi.style.width=size+"px";
    	oLi.style.height=size+"px";
    	oUl.appendChild(oLi);
    	if(map[i] == 1){
    		oLi.className="sty1";
    		openArr.push(oLi);
    	}else if(map[i] == 2){
    		oLi.className="sty2";
    	}else if(map[i] == 3){
    		oLi.className="sty3";
    		closeArr.push(oLi);
    	}
    }
}
function openFn(){
    var nowLi = openArr.shift();
    if(nowLi == endLi[0]){
    	showLine();
    	return;
    }
    closeFn(nowLi);
    findLi(nowLi);
	openArr.sort(function(li1,li2){
        return li1.num-li2.num;
	});
	openFn();
	console.log(openArr);
}

function closeFn(nowLi){
    closeArr.push(nowLi);
}
function findLi(nowLi){
	var result=[];
	for(var i=0;i<aLi.length;i++){
        if(filter(aLi[i])){
           result.push(aLi[i]);
        }
	}
	function filter(li){
       for(var i=0;i<closeArr.length;i++){
       	   if(closeArr[i] == li){
       	   	  return false;
       	   }
       }
       for(var i=0;i<openArr.length;i++){
       	   if(openArr[i] == li){
       		  return false;
       	   }
       }
       return true;
	}
	for(var i=0;i<result.length;i++){
		if((Math.abs(nowLi.offsetLeft-result[i].offsetLeft)<=(size+1))&&(Math.abs(nowLi.offsetTop-result[i].offsetTop)<=(size+1))){
			result[i].num = f(result[i]);
			result[i].parent = nowLi;
			openArr.push(result[i]);
		}
	}
}
function showLine(){
    var result =[];
    var iNow=0;
    var lastLi = closeArr.pop();
    findParent(lastLi);
    function findParent(li){
        result.unshift(li);
        if(li.parent == beginLi[0]){
        	return;
        }
        findParent(li.parent);
    }
    var timer=setInterval(function(){
    	result[iNow].style.background="red";
    	iNow++;
    	if(iNow == result.length){
    		clearInterval(timer);
    	}
    },500);
}
function f(nodeLi){
	return g(nodeLi)+h(nodeLi);
}
function g(nodeLi){
   var a = beginLi[0].offsetLeft-nodeLi.offsetLeft;
   var b = beginLi[0].offsetTop - nodeLi.offsetTop;
   return Math.sqrt(a*a + b*b);
}
function h(nodeLi){
   var a = endLi[0].offsetLeft-nodeLi.offsetLeft;
   var b = endLi[0].offsetTop - nodeLi.offsetTop;
   return Math.sqrt(a*a + b*b);
}