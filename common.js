var imgSize = 20;
var zoomSize = document.getElementById('size');  
var btnZoomPlus = document.getElementById('zoom_plus');
var btnZoomMinus = document.getElementById('zoom_minus');
var btnCreate = document.getElementById("create_mosaic");
var flag_ = false;
var COF_PLUS = 1.25;
var COF_MINUS = 0.8;
var N_MAX = 200;
var N_MIN = 1;

function CreateImg(i,j) {
	var img = document.createElement('img');
	if ((i%2 != 0)&&(j%2 != 0)) img.className = 'oddAll';
	else if (i%2 != 0) img.className = 'oddRow';
	else if (j%2 != 0) img.className = 'oddColumn';
	var url = document.getElementById("url");
	img.src = url.value; 
	return img;
}

function resize(size) {
	for (var i = 0; i < this.length; i++) {
		this[i].style.width = Math.round(size)+'px';
		this[i].style.height = Math.round(size)+'px';
	}
}

function zoom(cof) {
	if ( imgSize*cof > 200 ) {
		btnZoomPlus.setAttribute('disabled', "disabled");
	    resize.call(this, 200);
	    zoomSize.childNodes[0].textContent = '1000%';
	    flag_ = true;
	    return;
	}
	else if (imgSize*cof < 2) { 
			btnZoomMinus.setAttribute('disabled', "disabled");
			resize.call(this, 2);
	    	zoomSize.childNodes[0].textContent = '10%';
	    	flag_ = true;
			return;
		}
		else { 
			btnZoomPlus.removeAttribute('disabled');
			btnZoomMinus.removeAttribute('disabled');
			if (flag_) {
				resize.call(this, imgSize);
				flag_ = false;
			}
			else {
				imgSize = imgSize*cof; 
				resize.call(this, imgSize);
			}
			zoomSize.childNodes[0].textContent = Math.round(imgSize/0.2)+ '%';
		}
}


function validN(n) { 
	return (isFinite(n) && (n>=N_MIN) && (n<=N_MAX)); 
}

btnCreate.addEventListener("click", function() {
	var n = document.getElementById("n");
	if (!validN(n.value)) { alert('Empty field or not a number from 1 to 200.'); return;}
	if (url.value == '') alert('Empty field');
	var mosaic = document.getElementById("mosaic");
	mosaic.innerHTML = '';
	for (var i = 0; i < n.value; i++) {
		var div = document.createElement('div');
		mosaic.appendChild(div);
		for (var j = 0; j < n.value; j++) {
			var img = new CreateImg(i, j);
			mosaic.childNodes[mosaic.childNodes.length-1].appendChild(img);
		}	
	}	
	imgSize = 20;
	var img = document.getElementsByTagName('img');
	zoom.call(img, 1);
})

btnZoomPlus.addEventListener("click", function() {
	var img = document.getElementsByTagName('img');
	if (!img.length) return;
	else {
		zoom.call(img, COF_PLUS);
	}	
})

btnZoomMinus.addEventListener("click", function() {
	var img = document.getElementsByTagName('img');
	if (!img.length) return;
	else {
		zoom.call(img, COF_MINUS);
	}	
})
