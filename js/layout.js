$(function(){
	
	
var pshparell = { }
pshparell.winHT = $(window).height();
pshparell.distance = pshparell.winHT;
pshparell.count = 0;
pshparell.mnoving = false;	
pshparell.length = $(document).find(".page").length;
	
	$(".page").each(function (index, element) { 
		
		$(element).on("mousewheel DOMMouseScroll", function (e) {
			//console.log($(this).html());
			
			console.log("e ====", e);
			console.log("originalEvent ====", e.originalEvent);
			
			e.preventDefault();

			var El = e.originalEvent;			

			var delta = 0;

			if (El.wheelDelta) {
				delta = event.wheelDelta / 120;
				//if (window.opera) delta = -delta;
			} else if (El.detail) delta = -El.detail / 3;		

			//console.log("dd?????? ==", El.detail);
			//console.log("event.wheelDelta ==", event.wheelDelta);

			
			//console.log("next", $(window).scrollTop());
			//console.log("moveTop", moveTop);
			
			
			if(pshparell.mnoving == false) { 				
				pshparell.mnoving = true;
				
				// 마우스휠을 위에서 아래로			
				if (delta  < 0 ) {
					if($(window).scrollTop() == pshparell.distance * (pshparell.length-1)) {
						moveTop = $(this).offset().top;				   
					} else { 
						moveTop = $(this).next().offset().top;					  
						
						pshparell.count++;
					}
				// 마우스휠을 아래에서 위로
				} else {
					if($(window).scrollTop() < pshparell.distance) { 
					   moveTop = $(this).offset().top;
					} else { 
						moveTop = $(this).prev().offset().top;
						pshparell.count--;
						
					}	
				}
				
				console.log(pshparell.count);
				
				$('.navlist > li').removeClass("on");
				$('.navlist > li').eq(pshparell.count).addClass("on");
				
//				switch(pshparell.count) { 
//					case 0 : 
//						
//					break;
//						
//					case 1 : 
//						
//					break;
//						
//				}

				
				
				$("html,body").stop().animate({
					scrollTop: moveTop + 'px'
				}, {
					duration: 800, complete: function () {
						pshparell.mnoving = false;	
					}
				});	
			}
			
		});
	});
	
	
	/*nav_btn*/
	$('.navlist > li').mouseenter(
	 	function(){
	
		}
	 );
	
		$('.navlist > li').mouseleave(
	 	function(){
			//$(this).removeClass("on");
	
		}
	 );
	
	

	/*re_btn*/
	$('.re_btn > li').mouseenter(
	 	function(){
			$(this).addClass("on");
	
		}
	 );
	
		$('.re_btn > li').mouseleave(
	 	function(){
			$(this).removeClass("on");
	
		}
	 );
	
	
	
	/*click scroll*/
	$('.navlist > li > a').on("click" , function(){
		var _this = $(this);
		var _thispt = _this.parent();
		var _index = _thispt.index();
		
		pshparell.count = _index;
		var _thisOffset = $('.page').eq(pshparell.count).offset().top;
		console.log("??===",parseInt(_thisOffset));
		
		$('.navlist > li').removeClass("on");
		_thispt.addClass("on");

		
		
		if(!$('html, body').is(":animated")){
			$('html, body').animate({scrollTop : parseInt(_thisOffset)});
		}
	});
	
	
	
	
	
	
	
	
	
});
//end


var lypop = function(e, _this) { 
   e.preventDefault();
   var _this = $(_this);
   var _thisDataNum = _this.attr("data-num");
   console.log(_thisDataNum);
   var _origin = $(document).find("#lypop");
   
   
   _origin.addClass("on");
   $('body').css('overflow','hidden');
   
   _origin.find(".lypopcont .simg img").attr("src", "img/detailview0" + _thisDataNum +".jpg");
   
   
};

var lypopClose = function(e, _this) { 
   e.preventDefault();
   var _this = $(_this);
   var _origin = $(document).find("#lypop");      
   _origin.removeClass("on");
   $('body').removeAttr('style');      
};


