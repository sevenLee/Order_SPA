
if ('addEventListener' in document && typeof FastClick !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

var App = function($) {
	
	var init = function() {
                                   
		tracking.init();
		header.init();
		nav.init();
		search.init();
		
		$('body').on('focus', 'input:not(:radio, :checkbox), select, textarea', function(e) {
			$('button.keyboard-fix').hide();
		}).on('blur', 'input:not(:radio, :checkbox), select, textarea', function(e) {
			$('button.keyboard-fix').show();
		});
	};
	
	var tracking = {
		init: function() {
			$('body').on('click', '[data-track^="click:"]', function() {
				var data = $(this).data('track').split(':');
                                                                    var value = typeof distributorID == "undefined" ? null :  {'dimension3': distributorID};
				tracking.trackEvent(data[0], data[1],value);
			}).on('focus', '[data-track^="on_focus:"]', function() {
				var data = $(this).data('track').split(':');
                                                                     var value = typeof distributorID == "undefined" ? null :  {'dimension3': distributorID};
				tracking.trackEvent(data[0], data[1],value);
			});
		},
		trackView: function(name) {
			try {
				tracking.screenName = name;
                                                                      //ga('set', 'title',name);
				//ga('send', 'pageview');
                                                                    var value = typeof distributorID == "undefined" ? null :  {'dimension3': distributorID};
                                                                     ga('send', 'event', tracking.screenName, "view",  "view",value);
                                                      
			} catch (e) {}
		},
		trackEvent: function(action, label, value) {
			try {
				if (!tracking.screenName) return;
				ga('send', 'event', tracking.screenName, action, label, value);
			} catch (e) {}
		}
	};
	
	var header = {
		init: function() {
			if ($('#header-cart').size() == 0) return;
			$('body').on('touchmove', function() {
				if ($('body').scrollTop() < $('#header-cart').offset().top) {
					$('.header-container').removeClass('sticky');
				} else {
					$('.header-container').addClass('sticky');
				}
			});
			$('#header-cart').waypoint({
				handler: function(direction) {
					if (direction == 'up') {
						$('.header-container').removeClass('sticky');
					} else {
						$('.header-container').addClass('sticky');
					}
				}
			});
		}
	};
	
	var nav = {
		init: function() {
			$('.nav-responsive').on('click', function() {
				if (nav.isActive()) {
					nav.hide();
				} else {
					nav.show();
				}
			});
			$('#header-mask').on('click', function() {
				if (nav.isActive()) {
					nav.hide();
				}
			});
		},
		show: function() {
			$('.responsive_menu').addClass('active').slideDown();
			helper.lock();
		},
		hide: function() {
			$('.responsive_menu').removeClass('active').slideUp();
			helper.unlock();
		},
		isActive: function() {
			return($('.responsive_menu').hasClass('active'));
		}
	};
	
	var search = {
		init: function() {
			var $form = $('.header #search_mini_form');
			$form.on('submit', function(e) {
				if (!$('.form-search').hasClass('active')) return(false);
			});
			$form.on('click', '.form-search:not(.active) :submit', function(e) {
				nav.hide();
				search.show();
			});
			$('#header-mask').on('click', function() {
				if ($('.form-search').hasClass('active')) {
					search.hide();
				}
			});
		},
		show: function() {
			$('.nav-container').animate({
				left: '-100%',
				marginLeft: -40
			});
			$('#search_mini_form').animate({
				width: '100%',
				left: 0,
				marginLeft: 0
			}, 400, function() {
				$('.form-search').addClass('active');
			});
			helper.lock();
		},
		hide: function() {
			$('.nav-container').animate({
				left: 0,
				marginLeft: 0
			});
			$('#search_mini_form').animate({
				width: 40,
				left: '100%',
				marginLeft: -40
			});
			$('.form-search').removeClass('active');
			helper.unlock();
		}
	};
	
	var helper = {
		lock: function() {
			$('#header-mask').stop().clearQueue().fadeTo(400, 1);
		},
		unlock: function() {
			$('#header-mask').stop().clearQueue().fadeTo(400, 0, function() {
				$(this).hide();
			});
		},
    trimInputs: function(inputs) {
        inputs.each(function(elem) {
            var inputType = elem.readAttribute('type');
            var value = elem.getValue();
            if (value !== null && inputType == 'text') {
                elem.setValue(value.trim());
            }
        });
    }
	};
	
	return({
		init: init,
		tracking: {
			trackView: tracking.trackView,
			trackEvent: tracking.trackEvent
		},
		helper: {
			lock: helper.lock,
      unlock: helper.unlock,
			trimInputs: helper.trimInputs,
		}
	});
	
}(jQuery);

jQuery(document).ready(App.init);

Varien.referralValidator = Class.create();
Varien.referralValidator.prototype = {

    initialize : function(validateUrl, field, validateFlagField, hintElem, hintText, checkingText, emptyText, validateErrorMsgElem){
 
        this.prevValue = '';
        this.validateUrl = validateUrl;
        this.referralValidationRequestSent = false;
        this.field  = $(field);
        this.validateFlagField  = $(validateFlagField);
        this.validateErrorMsgElem  = validateErrorMsgElem;
        this.hintElem  = $(hintElem);
        this.hintText = hintText;
        this.checkingText = checkingText;
        this.emptyText = emptyText;
        this.formatCorrectOnce = false;

        Event.observe(this.field, 'keydown', this.keydown.bind(this));
        Event.observe(this.field, 'keyup', this.keyup.bind(this));
        Event.observe(this.field, 'change', this.change.bind(this));
        Event.observe(this.field, 'blur', this.change.bind(this));

        this._validateReferralNumber();
    },

    keydown : function(event){
        this.prevValue = this.field.value;
    },

    keyup : function(event){
        if(this.field.value !== this.prevValue){
          this._validateReferralNumber();
        }
    },

    change : function(event){
        if(this.field.value !== this.prevValue){
          this._validateReferralNumber();
        }
    },

    _validateReferralNumber: function() {

      var _this = this;
      var referralNumber = this.field.value;

      if (referralNumber.length === 9) {

          this.formatCorrectOnce = true;
          if (this.referralValidationRequestSent === false) {
              var req = new Ajax.Request(this.validateUrl, {
                  parameters: { referral_number: referralNumber },
                  onCreate: function() {
                      _this.validateFlagField.setValue('0');
                      _this._hideValidationError();
                      _this.field.removeClassName('validation-failed');
                      _this.hintElem.removeClassName('validation-advice').addClassName('input-hint');
                      _this.prevValue = referralNumber;
                      _this.referralValidationRequestSent = true;
                      _this.hintElem.show();
                      _this.hintElem.update(_this.checkingText);
                  },
                  onSuccess: function(response) {
                      _this.referralValidationRequestSent = false;
                      var res = JSON.parse(response.responseText);

                      _this.hintElem.show();
                      if (typeof res.error !== 'undefined' && res.error) {
                        _this.field.addClassName('validation-failed');
                        _this.hintElem.addClassName('validation-advice').removeClassName('input-hint');
                        _this.validateFlagField.setValue('0');
                      } else {
                        _this.validateFlagField.setValue('1');
                      }

                      _this.hintElem.update(res.message);
                  },
                  onFailure: function(response) {
                      _this.hintElem.show();
                      _this.referralValidationRequestSent = false;
                      _this.hintElem.update(_this.emptyText);
                      _this.validateFlagField.setValue('0');
                  }
              });
          }
      } else {
          this.validateFlagField.setValue('0');
          this.hintElem.update(this.hintText);
          if (this.formatCorrectOnce) {
            this.field.addClassName('validation-failed');
            this.hintElem.addClassName('validation-advice').removeClassName('input-hint');
          }
          this._hideValidationError();
      }
    },

    _hideValidationError: function() {
          var validateErrorElem = $(this.validateErrorMsgElem);
          if (typeof $(this.validateErrorMsgElem) !== 'undefined' && validateErrorElem != null) {
            $(this.validateErrorMsgElem).hide();
          }
    }

};


Varien.referral = Class.create();
Varien.referral.prototype = {
    initialize : function( field, emptyText){
 
        this.field  = $(field);
        this.emptyText = emptyText;
        Event.observe(this.field, 'focus', this.focus.bind(this));
        Event.observe(this.field, 'blur', this.blur.bind(this));
        this.blur();
    },

    focus : function(event){
        if(this.field.value==this.emptyText){
            this.field.value='';
        }

    },

    blur : function(event){
        if(this.field.value==''){
            this.field.value=this.emptyText;
        }
    },

    initAutocomplete : function(url, destinationElement){
        new Ajax.Autocompleter(
            this.field,
            destinationElement,
            url,
            {
                paramName: this.field.name,
                method: 'get',
                minChars: 9,
                updateElement: this._selectAutocompleteItem.bind(this),
                onShow : function(element, update) {
                    if(!update.style.position || update.style.position=='absolute') {
                        update.style.position = 'absolute';
                        console.log(element);
                        Position.clone(element, update, {
                            setHeight: false,
                            offsetTop: element.offsetHeight
                        });
                    }
                    Effect.Appear(update,{duration:0});
                }

            }
        );
    },

    _selectAutocompleteItem : function(element){
        console.log(element);
        if(element.name){
            this.field.value = element.name;
        }
    }
}