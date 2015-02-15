$(document).on('click','#icon-right', function(e) {
	var x = $("#side-container").css('left');
	if(x == '-205px')
	{
		$("#side-container").animate({left: "0px"},300);
	}
	else
	{
		$("#side-container").animate({left: "-205px"},300);
	}
});

$(document).on('click','#icon-user-plus', function(e) {
	
	$("#side-container").animate({left: "0px"},300);
	
});

$(document).on('click','#icon-paint-brush', function(e) {
	
	$("#side-container").animate({left: "0px"},300);
	
});