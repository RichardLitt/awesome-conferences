$("th").on('click',function() {
	var caret = $(this).find('.glyphicon');
	if(caret.hasClass('glyphicon-chevron-down')) {
		caret.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	} else {
		caret.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	}
});