function showLoader(selector)
{
    if(selector)
    {
        $(selector).LoadingOverlay("show", {
            image       : `/assets/img/loading.svg`,
        });
        return;
    }

    $.LoadingOverlay("show", {
        image       : `/assets/img/loading.svg`,
    });
}

function hideLoader(selector)
{
    if(selector)
    {
        $(selector).LoadingOverlay("hide");
        return;
    }
    
    $.LoadingOverlay("hide");
}

function serializeObject(obj) 
{
    var o = {};
    var a = obj.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
