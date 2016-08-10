/*
$(document).swipe( {
	swipeUp:function(event, direction, distance, duration) {
		move(0,-1);
		console.log("You swiped " + direction)
	},
swipeDown:function(event, direction, distance, duration) {
	move(0,1);
	console.log("You swiped " + direction) 
},
swipeLeft:function(event, direction, distance, duration) {
	move(-1,0);
	console.log("You swiped " + direction) 
},
swipeRight:function(event, direction, distance, duration) {
	move(1,0);
	console.log("You swiped " + direction) 
},

click:function(event, target) { 
},
threshold:100
//      allowPageScroll:"vertical"
});

*/
//var hammertime = new Hammer(myElement, myOptions);

var mc = new Hammer(document);
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });


// listen to events...
mc.on("swipeleft swiperight swipeup swipedown", function(ev) {

console.log(ev.type);
switch(ev.type){
case 'swipeup':
move(0,-1);
break;
case 'swipedown':
move(0,1);
break;
case 'swipeleft':
move(-1,0);
break;
case 'swiperight':
move(1,0);
break;

}


});

sprites = { 
	'1':'rock1',
	'2':'rock2',
	'3':'rock3',
	'4':'rock4',
	'-1':'trou1',
	'-2':'trou2',
	'-3':'trou3',
	'-4':'trou4',
	'0':'vide',
	'9':'mur',
	'99':"win"
};

	level = null;
	conf = { 's_size':'30' }
	perso = {'x':1,'y':1};

Array.prototype.clone = function() {
	return this.slice(0);
};



	function change(obj,i,j){
console.log(i+'/'+j+'='+charge);
		level[i][j]=charge;
	       	//obj.charge=charge;
		obj.className='sprite '+sprites[charge];

		if(charge==-99){
perso.x=j;
perso.y=i;
				x = perso.x * conf.s_size;
				y = perso.y * conf.s_size;
				document.getElementById('grille').innerHTML += '<div id="perso" class="sprite perso" style="top:'+y+'px;left:'+x+'px"></div>';
		}

	}

function drawLevel(n){
	level = levels[n];
	document.getElementById('grille').innerHTML = '';
for(i=0;i<level.length;i++){
	for (j=0;j<level[i].length;j++){
		x=conf.s_size*j;
		y=conf.s_size*i;
		//document.getElementById('grille').innerHTML += '<div class="sprite '+sprites[level[i][j]]+'" style="top:'+y+'px;left:'+x+'px">'+level[i][j]+'</div>';
			document.getElementById('grille').innerHTML += '<div id="X'+j+'Y'+i+'"  onclick="change(this,'+i+','+j+');" charge="'+level[i][j]+'"  class="sprite '+sprites[level[i][j]]+' X'+j+'Y'+i+'" style="top:'+y+'px;left:'+x+'px"></div>';

		if( level[i][j] == -99){
			perso.x=j;
			perso.y=i;
		}
	}
}
}

function fillSelector(n){
console.log("fill"+n);
document.getElementById('level_selector').innerHTML ="";
for(i=0;i<n-1;i++){
document.getElementById('level_selector').innerHTML += "<option>"+(i+1)+"</option>"
}
document.getElementById('level_selector').innerHTML += "<option selected>"+(i+1)+"</option>"
}


function loadLevel(n){
if(localStorage.level<n){
localStorage.level = n;
fillSelector(n);
} 
	console.log('LOAD='+n);
	level = JSON.parse(JSON.stringify(levels[n]));
	document.getElementById('grille').innerHTML = '';
	for(i=0;i<level.length;i++){
		for (j=0;j<level[i].length;j++){
			x=conf.s_size*j;
			y=conf.s_size*i;
			//document.getElementById('grille').innerHTML += '<div class="sprite '+sprites[level[i][j]]+'" style="top:'+y+'px;left:'+x+'px">'+level[i][j]+'</div>';
			if(level[i][j] != 0 && level[i][j] != -99){
				//document.getElementById('grille').innerHTML += '<div id="X'+j+'Y'+i+'" class="sprite '+sprites[level[i][j]]+' X'+j+'Y'+i+'" style="top:'+y+'px;left:'+x+'px">'+j+'.'+i+'</div>';
				if(level[i][j] > -9 && level[i][j] < 9){

//MODE NEGATIF
					//document.getElementById('grille').innerHTML += '<div id="X'+j+'Y'+i+'" class="sprite '+sprites[level[i][j]]+' X'+j+'Y'+i+'" style="top:'+y+'px;left:'+x+'px">'+level[i][j]+'</div>';
//MODE ABS
					document.getElementById('grille').innerHTML += '<div id="X'+j+'Y'+i+'" class="sprite '+sprites[level[i][j]]+' X'+j+'Y'+i+'" style="top:'+y+'px;left:'+x+'px"><span class="val">'+Math.abs(level[i][j])+'</span></div>';
				}else{
					document.getElementById('grille').innerHTML += '<div id="X'+j+'Y'+i+'" class="sprite '+sprites[level[i][j]]+' X'+j+'Y'+i+'" style="top:'+y+'px;left:'+x+'px"></div>';
				}
			}
			if( level[i][j] == -99){
				perso.x=j;
				perso.y=i;
				level[i][j] = 0;
				x = perso.x * conf.s_size;
				y = perso.y * conf.s_size;
				document.getElementById('grille').innerHTML += '<div id="perso" class="sprite perso" style="top:'+y+'px;left:'+x+'px"></div>';
			}
		}
	}
}

document.onkeydown=function(e){
	console.log(e.keyCode);
	switch(e.keyCode){
		case 39:
			move(1,0);
			break;	
		case 37:
			move(-1,0);
			break;	
		case 40:
			move(0,1);
			break;	
		case 38:
			move(0,-1);
			break;	
	}

};
function state(){

	console.log("PX="+perso.x);
	console.log("PY="+perso.y);
}
function gameOver(){
	document.getElementById('grille').innerHTML += '<div class="gameOver"><span> GAME OVER </span></div>'
		console.log('GAME OVER');
	//	document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
	setTimeout(function(){loadLevel(level_n)},2000);
}
function winer(){
	console.log('WIN');
}
function debug(v){
	document.getElementById('debug').innerHTML = v;
	console.log(v);
}
function getCaseDom(x,y){
	return document.getElementById('X'+x+'Y'+y);
}
function removeCaseDom(x,y){
	console.log('X'+x+'Y'+y);
	obj = getCaseDom(x,y);
	obj.parentNode.removeChild(obj);
}
function changeCaseDom(xinit,yinit,x,y){
	obj = getCaseDom(xinit,yinit);
	obj.id='X'+x+'Y'+y;
}


function move(mx,my){
	console.log('MOVE'+mx+' '+my);
	coli = 0;
	sac = {full:0,charge:0,dom:null,xinit:null,yinit:null};

	cx= 0;
	cy= 0;
	/*	if(level[perso.y][perso.x + mx] > 0){
		sac=1;
		cx = mx;
		cy = my;
		ados = 	document.getElementByClassName('X'+(perso.x+cx)+'Y'+(perso.y+cy))[0];
		ados.style.border = "dashed 3px black";
		}*/


	avance = 1;
	while(avance==1){
		//le -99 c pour le desingeur de niveau !
		while(level[perso.y+my+cy][perso.x+mx+cx]==0 || level[perso.y+my+cy][perso.x+mx+cx]==-99){

			perso.x = perso.x + mx;
			perso.y = perso.y + my;
			//si ya un mur dereire on ava,ce pas
			document.getElementById('perso').style.left=(perso.x*conf.s_size)+'px';
			document.getElementById('perso').style.top=(perso.y*conf.s_size)+'px';

			if(sac.full == 1){
				//Si on a un sac on le deplace
				//				sac.dom.style.border = "dashed 3px black";
				sac.dom.style.left=((perso.x+cx)*conf.s_size)+'px';
				sac.dom.style.top=((perso.y+cy)*conf.s_size)+'px';
			}
		}
		//ICI on viens de detecter autre chose que du vide en face, il faut donc faire qqchose et decider si on avance encore ou pas (avance=1)

		next = level[perso.y+my+cy][perso.x+mx+cx]
			switch(true){
				case (next == 99):
					winer();
					loadLevel(++level_n);
					avance=0;
					break;
				case (next == 9):
					//DETECTION MUR 
					avance=0;
					break;
				case (next < 0):
					if(sac.charge != (-1 * next) ){
						if(next!=-99){
						gameOver();
						
					}
					avance=0;
					}else{
						//ANNULER la CASE, vider le sac
						sac.full=0;
						level[perso.y+my+cy][perso.x+mx+cx] = 0;
						removeCaseDom(sac.xinit,sac.yinit);
						removeCaseDom(perso.x+mx+cx,perso.y+my+cy);
						cx=0;
						cy=0;
						avance=1
					}
					break;
					//Sac vide et rock devant
				case (next >0 && next <9 && sac.full ==0):
					//TODO: detecter si besoin de faire la somme
					sac.full = 1;
					cx = mx;
					cy = my;
					sac.charge = level[perso.y+my][perso.x + mx];
					sac.xyClass = 'X'+(perso.x+cx)+'Y'+(perso.y+cy);
					sac.xinit = (perso.x+cx);
					sac.yinit = (perso.y+cy);
					sac.dom = getCaseDom(sac.xinit,sac.yinit);
					//					document.getElementsByClassName('X'+(perso.x+cx)+'Y'+(perso.y+cy))[0];
					//On vide la case
					level[perso.y+my][perso.x + mx] = 0;
					avance=1;
					break;

				case (next >0 && next <9 && sac.full ==1):
					//Si le chiffre est identique
					if(sac.charge == level[perso.y+my +cy][perso.x + mx + cx]){
						level[perso.y+my +cy][perso.x + mx + cx] = 0;
						removeCaseDom(perso.x+mx+cx,perso.y+my+cy);
						//Changement du style
						sac.dom.className = sac.dom.className.replace(sprites[sac.charge],sprites[sac.charge*2])
							sac.charge = sac.charge*2;
						sac.dom.innerHTML = sac.charge;

					}else{
						avance =0;
					}



			}

	}
	if(sac.full == 1){
		level[perso.y+cy][perso.x+cx] = sac.charge;
		changeCaseDom(sac.xinit,sac.yinit,perso.x+cx,perso.y+cy);
		//		sac.dom.className =  sav.dom.className.replace(sac.xyClass,'X'+(perso.x+cx)+'Y'+(perso.y+cy));
	}

	state();
}
//            app.initialize();
