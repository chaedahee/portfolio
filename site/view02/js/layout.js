$(function(){

	



	
	
	//nav
	/*
	$(".nav_btn").click(function(e){
		e.preventDefault();
		
		$(this).toggleClass("active");
		$(".overlay").toggleClass("visible");
		*/
		$(".nav_btn").on('click', function(e){
		e.preventDefault();
		
		$(this).toggleClass("active");
		$(".overlay").toggleClass("visible");
		console.log("menu");
	});





	/*tab*/
	 var tabBtn = $('.tab_btn > ul > li');
	 var tabCont = $('.tab_cont > div > ul > li');
	 
	 tabCont.hide().eq(0).show();


	
	
	 tabBtn.click(function(){
	 var target = $(this);
	 var index = target.index();
	 
	 tabBtn.removeClass("active");
	 target.addClass("active");
	 
	 tabCont.css("display","none");
	 tabCont.eq(index).css("display","block");
		 });
	

	 
	});
	
	
	
	
	
	
	

(function(){
	//스크롤애니메이션

	let yOffset = 0; // javascript의 스크롤탑 window.pageYoffset대신 쓸 값
	let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 스크롤 높이
	let currentScene = 0; // 현재 씬
	let enterNewScene = false; // 새로운 씬이 시작되면  true
	
	//  여기서부터는 나중에 표기 
	let acc = 0.2; 
	let delayedYOffset = 0;
	let rafId;
	let rafState;	
	
	
	const sceneInfo = [
		{ 
			type : 'sticky',
			heightNum : 1,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-0"),
				messageA : document.querySelector('#scroll-section-0 .main-message.a'),
				messageB : document.querySelector('#scroll-section-1 .main-message.b'),
				messageC : document.querySelector('#scroll-section-2 .main-message.c'),
				messageD : document.querySelector('#scroll-section-3 .main-message.d')
			},
			values : { 
				//messageA_opacity_in: [0,1, {start: 0.1, end: 0.2}],
				messageB_opacity_in: [0,1, {start: 0.3, end: 0.4}],
				messageA_opacity_out: [1,0, {start: 0.3, end: 0.7}],
				messageA_translate_out: [0,-200, {start: 0.3, end: 0.7}],
			}
		},
		{ 
			type : 'sticky',
			heightNum : 3,
			scrollHeight : 0,
			objs : { 
				container : document.querySelector("#scroll-section-1"),
				imgAOrigin : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(1)'),
				imgBOrigin : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(2)'),
				imgCOrigin : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(3)'),
				imgDOrigin : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(1)'),
				imgEOrigin : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(2)'),
				imgFOrigin : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(3)'),
				imgA : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(1) img'),
				imgB : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(2) img'),
				//수정
				imgC : document.querySelector('#scroll-section-1 .scbox.left .simg:nth-child(3) img'),
				//right
				imgD : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(1) img'),
				imgE : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(2) img'),
				imgF : document.querySelector('#scroll-section-1 .scbox.right .simg:nth-child(3) img')
			},
			values : { 
				imgA_scale : [1.5,1, {start: 0.15, end: 0.3}],
				imgB_scale : [1.5,1, {start: 0.35, end: 0.5}],
				//수정
				imgC_scale : [1.5,1, {start: 0.5, end: 0.8}],
				//right
				imgD_scale : [2,1, {start: 0.15, end: 0.35}],
				imgE_scale : [2,1, {start: 0.5, end: 0.7}],
				imgF_scale : [2,1, {start: 0.6, end: 0.8}],
				
				imgA_transY : [0,100, {start: 0.2, end: 0.3}],
				imgB_transY : [0,300, {start: 0.17, end: 0.5}],
				//수정
				imgC_transY : [0,400, {start: 0.12, end: 0.75}],
				//right
				imgD_transY : [0,100, {start: 0.2, end: 0.4}],
				imgE_transY : [0,300, {start: 0.32, end: 0.5}],
				imgF_transY : [0,400, {start: 0.27, end: 0.75}]
			}
		},
		{
			// 1
			type: 'normal',
			// heightNum: 5, // type normal에서는 필요 없음
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},

	];
	

	// 레이아웃 설정
	function setLayout() { 		
		for(let i = 0; i < sceneInfo.length; i++) { 
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
				console.log(sceneInfo[i].objs.container);
				//console.log(`${sceneInfo[i].scrollHeight}px`);
				} else if (sceneInfo[i].type === 'normal')  {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
				
			}
				sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;

		}
		
		
		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for(let i = 0; i < sceneInfo.length; i++) { 
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if(totalScrollHeight > yOffset) { 
			   currentScene = i;			   	
			   break;							   
			}			
		}
		
		document.body.setAttribute('id', `show-scene-${currentScene}`);
		
		
	}
	
	function calcValues(values, currentYOffset) { 
		let rv;
		//현재씬에서 스크롤된 비율 구하기
		//console.log(values);	
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;		
		
		if(values.length == 3) { 
		   //start ~ end 사이 애니메이션 실행
		   	const partScrollStart = values[2].start * scrollHeight;
		   	const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;
			//console.log(partScrollStart);
			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) { 
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if(currentYOffset < partScrollStart) { 
				rv = values[0];
			} else if(currentYOffset > partScrollEnd) { 
				rv = values[1];
			}
			
		} else { 
			rv = scrollRatio * (values[1] - values[0]) + values[0];	   
		}
		
		
		return rv;
	}
	
	function totalCalcValue(values, yOffset) { 
		let rv;
		
		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight;
		const totalScrollRatio = yOffset / totalScrollHeight;

		const partScrollStart = values[2].start * totalScrollHeight;
		const partScrollEnd = values[2].end * totalScrollHeight;
		const partScrollHeight = partScrollEnd - partScrollStart;		
		
		//rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
		
		//console.log("yOffset ==", yOffset);
		//console.log("partScrollStart ==", partScrollStart);
		//console.log("토탈스크롤 ", totalScrollRatio);
		//console.log("partScrollStart ", partScrollStart);
		//console.log("partScrollEnd ", partScrollEnd);
		
		if(yOffset >= partScrollStart && yOffset <= partScrollEnd) { 
			
			rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			//console.log(rv)			
		} else if(yOffset < partScrollStart) { 
			rv = values[0];
			//console.log("시작전", rv);
		} else if(yOffset > partScrollEnd) { 
			rv = values[1];
			//console.log("시작후", rv);
		}
		//console.log("rv ", rv);
		
		return rv;
	}
	
	
	function playAnimation() { 
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; //yOffset / 현재 씬의 scrollHeight;	
		
		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight;
		const totalScrollRatio = yOffset / totalScrollHeight;
		
		const scene01_values = sceneInfo[1].values;
		
		console.log("totalScrollRatio", totalScrollRatio);
		//console.log("prevScrollHeight", prevScrollHeight);
		//console.log("yOffset - prevScrollHeight", currentYOffset);
		
		let imgA_scale_in = totalCalcValue(scene01_values.imgA_scale, yOffset);
		let imgB_scale_in = totalCalcValue(scene01_values.imgB_scale, yOffset);
		let imgC_scale_in = totalCalcValue(scene01_values.imgC_scale, yOffset);
		//right
		let imgD_scale_in = totalCalcValue(scene01_values.imgD_scale, yOffset);
		let imgE_scale_in = totalCalcValue(scene01_values.imgE_scale, yOffset);
		let imgF_scale_in = totalCalcValue(scene01_values.imgF_scale, yOffset);
		
		let imgA_transY_in = totalCalcValue(scene01_values.imgA_transY, yOffset);
		let imgB_transY_in = totalCalcValue(scene01_values.imgB_transY, yOffset);
		let imgC_transY_in = totalCalcValue(scene01_values.imgC_transY, yOffset);
		//right
		let imgD_transY_in = totalCalcValue(scene01_values.imgD_transY, yOffset);
		let imgE_transY_in = totalCalcValue(scene01_values.imgE_transY, yOffset);
		let imgF_transY_in = totalCalcValue(scene01_values.imgF_transY, yOffset);
		


			
		sceneInfo[1].objs.imgA.style.transform = (`scale(${imgA_scale_in})`);
		sceneInfo[1].objs.imgB.style.transform = (`scale(${imgB_scale_in})`);
		sceneInfo[1].objs.imgC.style.transform = (`scale(${imgC_scale_in})`);
		//rigjt
		sceneInfo[1].objs.imgD.style.transform = (`scale(${imgD_scale_in})`);
		sceneInfo[1].objs.imgE.style.transform = (`scale(${imgE_scale_in})`);
		sceneInfo[1].objs.imgF.style.transform = (`scale(${imgF_scale_in})`);
		
		sceneInfo[1].objs.imgAOrigin.style.transform = (`translateY(${imgA_transY_in}px)`);

		sceneInfo[1].objs.imgBOrigin.style.transform = (`translateY(${imgB_transY_in}px)`);
		sceneInfo[1].objs.imgCOrigin.style.transform = (`translateY(${imgC_transY_in}px)`);
		//right
		sceneInfo[1].objs.imgDOrigin.style.transform = (`translateY(${imgD_transY_in}px)`);
		sceneInfo[1].objs.imgEOrigin.style.transform = (`translateY(${imgE_transY_in}px)`);
		sceneInfo[1].objs.imgFOrigin.style.transform = (`translateY(${imgF_transY_in}px)`);
	
		

		
		
		//console.log(imgA_scale_in);
		//console.log("currentScene ==", currentScene);
		//console.log(yOffset);
		switch(currentScene) { 
			case 0 : 
				console.log(scrollRatio);
				//let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
				let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
				let messageA_translate_out = calcValues(values.messageA_translate_out, currentYOffset);
				//console.log("messageA_opacity_in ==", messageA_opacity_in);
				if(scrollRatio <= 0.01) { 
					//objs.messageA.style.opacity = messageA_opacity_in;
				} else { 
					//objs.messageA.style.opacity = messageA_opacity_out;
					
					objs.messageA.setAttribute("style", 'opacity : ' + messageA_opacity_out + '; transform:translateY(' + messageA_translate_out + 'px)')
					
				}
				
				
				
				//console.log(messageA_opacity_in);
				break;
			case 1 : 

				break;
				
			case 2 : 

				break;
				
		}
		
		// 2번째 화면이 윈도우상에서 보이기 시작한 시점부터 애니메이션이 동작해야함 
		var zz = document.getElementById("scroll-section-1").offsetHeight;
		//console.log(zz);
		//console.log(totalScrollRatio);
	}
	
	function scrollLoop() { 
		prevScrollHeight = 0;
		enterNewScene = false
		for(let i = 0; i < currentScene; i++) { 
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}

		//console.log("prevScrollHeight ==", prevScrollHeight);
		//console.log("현재신의 스크롤하이트 ==", sceneInfo[currentScene].scrollHeight);
		//console.log("yOffset ==", yOffset);
		
		
		if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { 
			enterNewScene = true;
			currentScene++;		
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}

		if(yOffset < prevScrollHeight) { 
			enterNewScene = true;
			if(currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		//console.log(yOffset);
		if(enterNewScene) return;
		playAnimation();
	}
	
	
	window.addEventListener('scroll', () => { 
		yOffset = window.pageYOffset;
		scrollLoop();
	});
	
	window.addEventListener('load', setLayout);
	window.addEventListener('resize', setLayout);	
	
	
	


	
	
	
	
	
	
})()
	
