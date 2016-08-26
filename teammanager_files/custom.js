var widthClassOptions = [];
var widthClassOptions = ({
		bestseller       : 'bestseller_default_width',
		newproduct       : 'newproduct_default_width',
		featured         : 'featured_default_width',
		special          : 'special_default_width',
		additional       : 'additional_default_width',
		related          : 'related_default_width',
		upsell	         : 'upsell_default_width',
		crosssell        : 'crosssell_default_width',
		brand			 : 'brand_default_width'
});

var $k =jQuery.noConflict();
$k(document).ready(function(){
	
	//$k('input[type="checkbox"]').tmMark(); 
	$k('input[type="radio"]').tmMark();
	
	$k(".limiter select").selectbox();
	$k(".sort-by select").selectbox(); 
	$k(".block-brand-nav select").selectbox();
	
});
 
window.old_alert = window.alert;

window.alert = function(message, fallback){
       var $OK = Translator.translate('OK');
    if(fallback)
    {
        old_alert(message);
        return;
    }
    var myButtons = {};
    myButtons[$OK] = function() {  $k(this).dialog('close');};
    $k(document.createElement('div'))
        .attr({title: Translator.translate('System Message'), 'class': 'alert'})
        .html(message)
        .dialog({
            buttons: myButtons,
            close: function(){$k(this).remove();},
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};

window.old_confirm = window.confirm;
window.confirm = function(message,  callback){
    var $OK = Translator.translate('OK');
    var $Cancel = Translator.translate('Cancel');
    var myButtons = {};
    myButtons[$OK] = function() { callback(true); $k(this).dialog('close');};
    myButtons[$Cancel] = function() { callback(false); $k(this).dialog('close');};
    $k(document.createElement('div'))
        .attr({title:Translator.translate('System Message'), 'class': 'alert'})
        .html(message)
        .dialog({
            buttons:myButtons,
            close: function(){
                callback(false);
                $k(this).remove();
            },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
        return false;
};
