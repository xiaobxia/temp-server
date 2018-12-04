//标记值是否修改过
var old_value = '';
$('.edit-cell').on('click', function () {
  if ($(this).hasClass('text-view')) {
    var text = $(this).text();
    var inputId = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    var inputIdStr = "'" + inputId + "'";
    old_value = $.trim($(this).html());
    var optionHtml = '<option value = "-">-</option>'
    for (var i = 1; i < 10; i++) {
      optionHtml += '<option value = "' + i + '">' + i + '0%</option>'
    }
    $(this).html('<select style="width:60px;" id="' + inputId + '" onblur="onChangeHandler(' + inputIdStr + ')">' +
      optionHtml +
      '</select>');
    //$(this).html('<input type="text" value="'+text+'" style="width:60px;" id="'+inputId+'" onblur="onBlurHandler('+inputIdStr+')" />');
    $(this).removeClass('text-view').addClass('input-view');
    //默认-
    //$('#' + inputId).val('-')
  }
});

function onChangeHandler(id) {
  var $cell = $('#' + id).parent('.edit-cell');
  var rawId = $cell.attr('data-id');
  var value = $('#' + id).val();
  if (value.toString() === '-') {
    //不修改请求ajax进行修改值
    onChangeSuccess();
    return;
  }
  if (old_value.toString() == (value.toString() + '0%')){
    //不修改请求ajax进行修改值
    onChangeSuccess();
    return;
  }
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(value.toString()) === -1) {
    //不修改请求ajax进行修改值
    onChangeSuccess();
    return;
  }
  console.log('send')
  console.log(value.toString())
  onChangeSuccess();
  //TODO 请求接口修改
  //成功回调
  function onChangeSuccess() {
    if (value === '-') {
      $cell.html(value)
    } else {
      $cell.html(value + '0%')
    }
    $cell.removeClass('input-view').addClass('text-view');
    // $cell.prev().html(value)
  }
}

var old_value_input = '';
$('.edit-cell-input').on('click', function () {
  if ($(this).hasClass('text-view')) {
    var text = $(this).text();
    var inputId = (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    var inputIdStr = "'" + inputId + "'";
    old_value_input = $.trim($(this).html());
    $(this).html('<input type="text" value="' + text + '" style="width:60px;" id="' + inputId + '" onblur="onBlurHandler(' + inputIdStr + ')" />');
    $(this).removeClass('text-view').addClass('input-view');
  }
});

function onBlurHandler(id) {
  var $cell = $('#' + id).parent('.edit-cell-input');
  var rawId = $cell.attr('data-id');
  var value = $('#' + id).val();
  if (old_value_input.toString() == value.toString()) {
    //不修改请求ajax进行修改值
    onChangeSuccess();
    return;
  }
  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  var url = '<?php echo Url::toRoute(['
  channel / channel - statistic - edit
  ']); ?>';
  $.post(url, {id: rawId.toString(), pv: value.toString(), _csrf: csrfToken, rnd: Math.random()}, function (data) {
    if (data != null) {
      if (data.result) {
        onChangeSuccess();
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  }, 'json');
  //TODO 请求接口修改
  //成功回调
  function onChangeSuccess() {
    $cell.html(value)
    $cell.removeClass('input-view').addClass('text-view');
    // $cell.next().html(value)
  }
}
