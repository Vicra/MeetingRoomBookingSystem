$(function()
{

});

function submitform()
{
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    showLoader(".form-signin");

    $.post('/auth',{email: email, password:password},
    function(data)
    {
        if(data.success === true)
        {
            window.location = '/';
            return;
        }
        
        hideLoader(".form-signin");
        alert(data.message);
    },'JSON').fail(function()
    {
        hideLoader(".form-signin");
        alert('An error occurred on server, please try again later.')
    });
}