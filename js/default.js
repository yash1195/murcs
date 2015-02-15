var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
addUser('Yash');
addUser('Manish');
function addUser(name) {
	$('.user-box').append('<paper-button class="user-slot" data-user="'+name+'">'+
						     name+
						  '</paper-button>');
}
function addToColumn(column, color, sticky) {
	$(column).append('<paper-button class="sticky '+color+'" data-color="'+color+'">'+
						sticky+
					'</paper-button>');
}

var selectedUserSlot;
function startChangeName(userSlot) {
	$('#user-slot-name-changer-input').val("");
	selectedUserSlot=userSlot;
	$('.modal').animate({width:"100%",height:"100%"},10);
	$('#user-slot-name-changer-box').animate({width:"40%",height:"20%"},10);
}
function fixChangeName() {
	$('.modal').animate({width:"0",height:"0"},10);
	$('#user-slot-name-changer-box').animate({width:"0",height:"0"},10);
	var name=selectedUserSlot.attr('data-user');
	if($('#user-slot-name-changer-input').val().length>0)
		name=$('#user-slot-name-changer-input').val();
	selectedUserSlot.children('.button-content').html(name);
	selectedUserSlot.attr('data-user',name);
	if(is_chrome)
		selectedUserSlot.html(name);

}
function promptStickyAllot(sticky) {
	sticky.css('z-index',10);
	$('.user-box').css({'z-index':10,"backgroundColor":"#fff"});
	$('.modal').animate({width:"100%",height:"100%"},10);
	$('#side-bar-2').append("<i class='fa fa-times'></i>");
}
function allotToUser(user) {
	addStickyFlag=false;
	var attr = $(user).attr('data-color');
	if(typeof attr !== typeof undefined && attr !== false)
		unAllot(user);
	user.attr("data-color", $(selectedSticky).attr('data-color'));
	user.attr("data-sticky", $(selectedSticky).html());
	user.removeClass();
    user.addClass('user-slot');
	user.addClass($(selectedSticky).attr('data-color'));
	$(selectedSticky).css('z-index',10);
	$('.user-box').css({'z-index':10,"backgroundColor":"#1C2E40"});
	$('.modal').animate({width:"0",height:"0"},10);
	user.children('.button-content').html($(selectedSticky).html());
	if(is_chrome)
		user.html($(selectedSticky).html());
	selectedSticky.remove();
	$('.fa-times').remove();
	notFirstMouseover=false;
}
function cancelAllot() {
	addStickyFlag=false;
	$('.user-box').css({'z-index':10,"backgroundColor":"#1C2E40"});
	$('.modal').animate({width:"0",height:"0"},10);
	$('.fa-times').remove();
	notFirstMouseover=false;
}
function unAllot(user) {
	$(user).removeClass();
	var color=$(user).attr('data-color');
	var sticky=$(user).attr('data-sticky');
	$(user).addClass('user-slot');
	$(user).removeAttr('data-color');
	$(user).removeAttr('data-sticky');
	$(user).children('.button-content').html($(user).attr('data-user'));
	if(is_chrome)
		$(user).html($(user).attr('data-user'));
	$(selectedSticky).css('z-index',"auto");
	$('.user-box').css('z-index',"auto");
	addToColumn($('#complete'), color, sticky);
}

var addStickyFlag=false;
$(document).on('click', '.user-slot', function(event) {
	var attr = $(this).attr('data-color');
	if(addStickyFlag)
		allotToUser($(this));
	else if (typeof attr !== typeof undefined && attr !== false)
    	unAllot($(this));
	else
		startChangeName($(this));
});
$(document).on('click', '.user-slot-name-changer-done', function(event) {
	fixChangeName();
});

var selectedSticky;
$(document).on('click', '.sticky', function(event) {
	if(!addLabelFlag) {
		addStickyFlag=true;
		selectedSticky=this;
		promptStickyAllot($(this));
	}
});

$(document).on('click', '.fa-times', function(event) {
	cancelAllot();
});

$(document).on('click','#icon-right', function(event) {
	if($(this).hasClass('opened'))	{
		$("#side-container").animate({left: "-205px"},300);
		$(this).removeClass('opened');
	}
	else 	{
		$("#side-container").animate({left: "0px"},300);
		$(this).addClass('opened');
	}
});
$(document).on('click','#add-person-butt', function(event)	{
	addUser('Click to Rename');
});

$(document).on('click','#add-label-butt', function(event) {
	var color=$('.core-selected').attr('data-color');
	var text=$('#add-label-text').val();
	addLabel(color, text);
});

$(document).on('click','.main-board-column',function(event) {
	if(addLabelFlag && addStickySticky && addStickyColor) {
		addToColumn($(this),addStickyColor,addStickySticky);
		addStickySticky=undefined;
		addStickyColo=undefined;
	}
	if(addLabelFlag) {
		$('.main-board').css({'z-index':"auto"});
		$('.main-board-column').removeClass("column-prompt");
		$('.modal').animate({width:"0",height:"0"},10);
		addLabelFlag=false;
	}
});

var addLabelFlag=false;
var addStickyColor;
var addStickySticky;
function addLabel(color, text) {
	addLabelFlag=true;
	$("#side-container").animate({left: "-205px"},300);
	$('#icon-right').removeClass('opened');
	$('.main-board').css({'z-index':10});
	$('.main-board-column').addClass("column-prompt");
	$('.modal').animate({width:"100%",height:"100%"},10);
	addStickyColor=color;
	addStickySticky=text;
}

var notFirstMouseover=false;;
$(document).on('mouseover', '.user-slot', function(event) {
	if(notFirstMouseover) {
		$(this).children('.button-content').html($(this).attr('data-user'));
		if(is_chrome)
			$(this).html($(this).attr('data-user'));
	}
});
$(document).on('mouseout', '.user-slot', function(event) {
	if(!notFirstMouseover) {
		notFirstMouseover=true;
	}
	$(this).children('.button-content').html($(this).attr('data-sticky'));
	if(is_chrome)
		$(this).html($(this).attr('data-sticky'));
});