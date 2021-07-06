
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();

// main login form //

	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			// append 'remember-me' option to formData to write local cookie //
				formData.push({name:'remember-me', value:$('#btn_remember').find('span').hasClass('fa-check-square')});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
			lv.showLoginError('Login Failure', 'Please check your username and/or password');
		}
	});

	$("input:text:visible:first").focus();
	$('#btn_remember').click(function(){
		var span = $(this).find('span');
		if (span.hasClass('fa-minus-square')){
			span.removeClass('fa-minus-square');
			span.addClass('fa-check-square');
		}	else{
			span.addClass('fa-minus-square');
			span.removeClass('fa-check-square');
		}
	});

// login retrieval form via phoneNo //

	var ev = new phoneNoValidator();

	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validatephoneNo($('#phoneNo-tf').val())){
				ev.hidephoneNoAlert();
				return true;
			}	else{
				ev.showphoneNoAlert("Please enter a valid phoneNo address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#cancel').html('OK');
			$('#retrieve-password-submit').hide();
			ev.showphoneNoSuccess("A link to reset your password was phoneNoed to you.");
		},
		error : function(e){
			if (e.responseText == 'account not found'){
				ev.showphoneNoAlert("phoneNo not found. Are you sure you entered it correctly?");
			}	else{
				$('#cancel').html('OK');
				$('#retrieve-password-submit').hide();
				ev.showphoneNoAlert("Sorry. There was a problem, please try again later.");
			}
		}
	});

});
