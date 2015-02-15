$(document).on('click','#icon-user-plus', function(event) {
	if($(this).hasClass('opened'))	{
		$("#side-container").animate({left: "-205px"},300);
		$(this).removeClass('opened');
	}
	else 	{
		$("#side-container").animate({left: "0px"},300);
		$(this).addClass('opened');
	}
});

$(document).on('click','#icon-paint-brush', function(event) {
	if($(this).hasClass('opened'))	{
		$("#side-container").animate({left: "-205px"},300);
		$(this).removeClass('opened');
	}
	else 	{
		$("#side-container").animate({left: "0px"},300);
		$(this).addClass('opened');
	}
});