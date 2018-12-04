var old_value = '';
$('.edit-cell').on('click', function () {
    if ($(this).hasClass('text-view')) {
        var text = $(this).text();
        var inputId = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
        var inputIdStr = "'" + inputId + "'";
        old_value = $.trim($(this).html());
        var optionHtml = ''
        for (var i = 1; i < 11; i++) {
            optionHtml += '<option value = "' + i + '">' + i + '</option>'
        }
        $(this).html('<select style="width:60px;" id="' + inputId + '" onchange="onBlurHandler(' + inputIdStr + ')">' +
            optionHtml +
            '</select>');
        //$(this).html('<input type="text" value="'+text+'" style="width:60px;" id="'+inputId+'" onblur="onBlurHandler('+inputIdStr+')" />');
        $(this).removeClass('text-view').addClass('input-view');
        //默认10
        $('#' + inputId).val(10)
    }
});

function onBlurHandler(id) {
    var $cell = $('#' + id).parent('.edit-cell');
    var rawId = $cell.attr('data-id');
    var value = $('#' + id).val();
    console.log(rawId)
    console.log(value)
}
