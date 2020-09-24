// JavaScript Document


$(function() { 


function navliHover() { 
	var _liTargetOffSetLt = $('header .header_in nav .navlist > li:first').find("> a").offset().left;
	var _liTargetOffSetWd = $('header .header_in nav .navlist > li:first').find("> a").width();
	
	console.log(_liTargetOffSetLt);
	
	$('.navbar').hide();
	
	$('.navbar').css({"left": _liTargetOffSetLt  + 30, "width" : _liTargetOffSetWd + 20});
	
	$('nav .navlist > li').hover(
		function() { 
			$('.navbar').show();
			
			var _this = $(this);
			var _target = _this.index();
			var _targetOffset = $('nav .navlist > li').eq(_target).find("> a").offset().left;
			var _targetWd = $('nav .navlist > li').eq(_target).find("> a").width();
			console.log(_targetWd);
			
			$('.navbar').stop().animate({"left" : parseInt(_targetOffset) + 30, "width" : _targetWd + 20}, { 
				duration : 80
			});
		},
		function(){
			
			$('.navbar').hide();
		}
	);
}	

navliHover();	
	
//offset
	function objectFunc() { 
		var object02OffLt = $('.visual .visual_in .object_02').offset().left;
		var object02Wd = $('.visual .visual_in .object_02').width();
		$('.brand .brand_img').width(object02OffLt + object02Wd);
		$('.competi .competi_text').width(object02OffLt + object02Wd);
	}
	
	objectFunc();
	
	$(window).resize(function() { 
		objectFunc();
		navliHover()
	});
	
	
	
	
	
//nav	
var navfstDp2LiHt = $(".navlist > li").find(".dp2 > li:first").outerHeight();
	
	function navHover() { 
		
		var s1 =  $(".navlist > li").eq(0).find(".dp2 > li").length;
		var s2 =  $(".navlist > li").eq(1).find(".dp2 > li").length;
		var s3 =  $(".navlist > li").eq(2).find(".dp2 > li").length;
		var s4 =  $(".navlist > li").eq(3).find(".dp2 > li").length;
		var s5 =  $(".navlist > li").eq(4).find(".dp2 > li").length;
		var maxs = Math.max(s1,s2,s3,s4,s5);
		$(".navbg").stop().animate({"height" : navfstDp2LiHt * maxs});	
		$(".navlist .dp2").css('visibility','visible').stop().animate({"height" : navfstDp2LiHt * maxs});
		
		console.log(maxs);
	}

	
	console.log(navfstDp2LiHt);
	$('.navlist').hover(
		function(){
			navHover();
			
		}
	);
	
	$('header').on("mouseleave", function(){
		$(".navbg").stop().animate({"height" : 0});
		$(".navlist .dp2").stop().animate({"height" :0}, {
			
			complete : function() { 
				$(".navlist .dp2").css('visibility','hidden');
			}
		});
		

			var _targetOffset = $('nav .navlist > li').eq(m1).offset().left;
			var _targetWd = $('nav .navlist > li').eq(m1).find("> a").width();
			
			$('.navbar').stop().animate({"left" : parseInt(_targetOffset) + 30, "width" : _targetWd + 20}, { 
				duration : 80
			});
		
		
	});

});