
var ajaxcart = {
    g: new Growler(),
    initialize: function () {
        this.g = new Growler();
        this.bindEvents();
        qtyControl.init();
    },
    bindEvents: function () {
        this.addSubmitEvent();

        jQuery('a[href*="/checkout/cart/delete/"]').prop('onclick', null).off('ciick');

        $$('a[href*="/checkout/cart/delete/"]').each(function (e) {
            $(e).on('click', function (event) {
                if (!confirm(jQuery(e).data('confirm'))) {
                    Event.stop(event);
                    return;
                }
                setLocation($(e).readAttribute('href'));
                Event.stop(event);
            });
        });
    },
    /*spinbox: {
     init: function () {
     var $ = jQuery;
     var $els = $('.fuelux .spinbox');
     var timeout;
     
     $els.spinbox({
     min: 0
     });
     $els.each(function () {
     var $input = $(this).find('.spinbox-input');
     $input.data('value-before', $input.val());
     });
     $els.on('changed.fu.spinbox', function (e, value) {
     clearTimeout(timeout);
     timeout = setTimeout(function () {
     if ($(e.target).spinbox('value') == $(e.target).find('input').data('value-before')) {
     return;
     }
     App.helper.lock();
     var url = $(e.target).data('action');
     if (typeof (productAddToCartForm) != 'undefined') {
     if (url) {
     $('#product_addtocart_form').attr({action: url});
     }
     $('#product_addtocart_form [name=qty]').val(value);
     productAddToCartForm.submit();
     } else if (typeof (productUpdateForm) != 'undefined') {
     jQuery('.btn-update').trigger('click');
     }
     $(e.target).find('input').data('value-before', value);
     }, 800);
     });
     },
     restore: function (value) {
     var $ = jQuery;
     var action = $('#product_addtocart_form').attr('action');
     var $spinbox = $('.fuelux .spinbox[data-action="' + action + '"]');
     $spinbox.spinbox('value', value);
     $spinbox.find('.spinbox-input').data('value-before', value);
     }
     },*/
    ajaxCartSubmit: function (obj) {
        var _this = this;

        if (Modalbox !== 'undefined' && Modalbox.initialized)
            Modalbox.hide();

        try {
            if (typeof obj == 'string') {
                var url = obj;

                new Ajax.Request(url, {
                    onCreate: function () {
                    },
                    onSuccess: function (response) {
                        App.helper.unlock();

                        // Handle the response content...
                        try {
                            var res = response.responseText.evalJSON();
                            if (res) {
                                //check for group product's option
                                if (res.configurable_options_block) {
                                    if (res.r == 'success') {
                                    } else {
                                        if (typeof res.messages != 'undefined') {
                                            _this.showError(res.messages);
                                        } else {
                                            _this.showError("Something bad happened");
                                        }
                                        qtyControl.restore();
                                    }
                                } else {
                                    if (res.r == 'success') {
                                        if (res.message) {
                                        } else {
                                        }

                                        //update all blocks here
                                        _this.updateBlocks(res.update_blocks);

                                    } else {
                                        if (typeof res.messages != 'undefined') {
                                            _this.showError(res.messages);
                                        } else {
                                            _this.showError("Something bad happened");
                                        }
                                        if (typeof (res.default_qty) != 'undefined') {
                                            qtyControl.restore(res.default_qty);
                                        }

                                    }

                                }
                            } else {
                                document.location.reload(true);
                            }
                        } catch (e) {
                            //window.location.href = url;
                            //document.location.reload(true);
                        }
                        App.helper.unlock();
                    },
                    onComplete: function () {
                        App.helper.unlock();
                    }
                });
            } else {
                if (typeof obj.form.down('input[type=file]') != 'undefined') {

                    //use iframe

                    obj.form.insert('<iframe id="upload_target" name="upload_target" src="" style="width:0;height:0;border:0px solid #fff;"></iframe>');

                    var iframe = $('upload_target');
                    iframe.observe('load', function () {
                        // Handle the response content...
                        try {
                            var doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow.document || iframe.document);
                            //console.log(doc);
                            var res = doc.body.innerText ? doc.body.innerText : doc.body.textContent;
                            res = res.evalJSON();

                            if (res) {
                                if (res.r == 'success') {
                                    if (res.message) {
                                    } else {
                                    }

                                    //update all blocks here
                                    _this.updateBlocks(res.update_blocks);

                                } else {
                                    if (typeof res.messages != 'undefined') {
                                        _this.showError(res.messages);
                                    } else {
                                        _this.showError("Something bad happened");
                                    }
                                    if (typeof (res.default_qty) != 'undefined') {
                                        qtyControl.restore(res.default_qty);
                                    }
                                }
                            } else {
                                _this.showError("Something bad happened");
                                if (typeof (res.default_qty) != 'undefined') {
                                    qtyControl.restore(res.default_qty);
                                }
                            }
                        } catch (e) {
                            //console.log(e);
                            _this.showError("Something bad happened");
                            if (typeof (res.default_qty) != 'undefined') {
                                qtyControl.restore(res.default_qty);
                            }
                        }
                    });

                    obj.form.target = 'upload_target';

                    //show loading
                    _this.g.warn("Processing", {
                        life: 5
                    });

                    obj.form.submit();
                    return true;

                } else {
                    //use ajax

                    var url = obj.form.action,
                            data = obj.form.serialize();

                    new Ajax.Request(url, {
                        method: 'post',
                        postBody: data,
                        onCreate: function () {
                        },
                        onSuccess: function (response) {
                            // Handle the response content...
                            try {
                                var res = response.responseText.evalJSON();
                                if (res) {
                                    if (res.r == 'success') {
                                        if (res.message) {
                                        } else {
                                        }
                                        //update all blocks here
                                        _this.updateBlocks(res.update_blocks);

                                    } else {
                                        if (typeof res.messages != 'undefined') {
                                            _this.showError(res.messages);
                                        } else {
                                            _this.showError("Something bad happened");
                                        }
                                        if (typeof (res.default_qty) != 'undefined') {
                                            qtyControl.restore(res.default_qty);
                                        }
                                    }
                                } else {
                                    _this.showError("Something bad happened");
                                    if (typeof (res.default_qty) != 'undefined') {
                                        qtyControl.restore(res.default_qty);
                                    }
                                }
                            } catch (e) {
                                //console.log(e);
                                _this.showError("Something bad happened", function () {
                                    document.location.reload(true);
                                });
                            }
                            App.helper.unlock();
                        }
                    });
                }
            }
        } catch (e) {
            //console.log(e);
            if (typeof obj == 'string') {
                window.location.href = obj;
            } else {
                document.location.reload(true);
            }
            App.helper.unlock();
        }
    },
    getConfigurableOptions: function (url) {
        var _this = this;
        new Ajax.Request(url, {
            onCreate: function () {
                _this.g.warn("Processing", {
                    life: 5
                });
            },
            onSuccess: function (response) {
                // Handle the response content...
                try {
                    var res = response.responseText.evalJSON();
                    if (res) {
                        if (res.r == 'success') {

                            //show configurable options popup
                            _this.showPopup(res.configurable_options_block);

                        } else {
                            if (typeof res.messages != 'undefined') {
                                _this.showError(res.messages);
                            } else {
                                _this.showError("Something bad happened");
                            }
                        }
                    } else {
                        document.location.reload(true);
                    }
                } catch (e) {
                    window.location.href = url;
                    //document.location.reload(true);
                }
            }
        });
    },
    showSuccess: function (message) {
        this.g.info(message, {
            life: 5
        });
    },
    showError: function (error, callback) {
        var _this = this;

        if (typeof error == 'string') {
            _this.g.error(error, {
                life: 5
            });
        } else {
            error.each(function (message) {
                _this.g.error(message, {
                    life: 5
                });
            });
        }
        if (typeof (callback) == 'function')
            callback();
    },
    addSubmitEvent: function () {

        if (typeof productAddToCartForm != 'undefined') {
            var _this = this;
            productAddToCartForm.submit = function (url) {
                if (this.validator && this.validator.validate()) {
                    _this.ajaxCartSubmit(this);
                }
                return false;
            }

            productAddToCartForm.form.onsubmit = function () {
                productAddToCartForm.submit();
                return false;
            };
        }

        var _this = this;
        jQuery('#product_updateqty_form').on('keyup keypress', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) { 
            e.preventDefault();
            e.target.blur();
            return false;
          }
        });
    },
    updateBlocks: function (blocks) {
        var _this = this;

        if (blocks) {
            try {
                blocks.each(function (block) {
                    if (block.key) {
                        var dom_selector = block.key;
                        if ($$(dom_selector)) {
                            $$(dom_selector).each(function (e) {
                                $(e).update(block.value);
                            });
                        }
                    }
                });
                _this.bindEvents();
                _this.bindNewEvents();

                // show details tooltip
                truncateOptions();
            } catch (e) {
                //console.log(e);
            }
        }

    },
    bindNewEvents: function () {
        // =============================================
        // Skip Links (for Magento 1.9)
        // =============================================

        // Avoid PrototypeJS conflicts, assign jQuery to $j instead of $
        if (typeof (jQuery) != undefined) {

            var $j = jQuery.noConflict();
            var skipContents = $j('.skip-content');
            var skipLinks = $j('.skip-link');

            if (typeof (skipContents) != undefined && typeof (skipLinks) != undefined) {

                skipLinks.on('click', function (e) {
                    e.preventDefault();

                    var self = $j(this);
                    var target = self.attr('href');

                    // Get target element
                    var elem = $j(target);

                    // Check if stub is open
                    var isSkipContentOpen = elem.hasClass('skip-active') ? 1 : 0;

                    // Hide all stubs
                    skipLinks.removeClass('skip-active');
                    skipContents.removeClass('skip-active');

                    // Toggle stubs
                    if (isSkipContentOpen) {
                        self.removeClass('skip-active');
                    } else {
                        self.addClass('skip-active');
                        elem.addClass('skip-active');
                    }
                });

                $j('#header-cart').on('click', '.skip-link-close', function (e) {
                    var parent = $j(this).parents('.skip-content');
                    var link = parent.siblings('.skip-link');

                    parent.removeClass('skip-active');
                    link.removeClass('skip-active');

                    e.preventDefault();
                });
            }
        }
    },
    showPopup: function (block) {
        try {
            var _this = this;
            //$$('body')[0].insert({bottom: new Element('div', {id: 'modalboxOptions'}).update(block)});
            var element = new Element('div', {
                id: 'modalboxOptions',
                class: 'product-view'
            }).update(block);

            var viewport = document.viewport.getDimensions();
            Modalbox.show(element,
                    {
                        title: 'Please Select Options',
                        width: 510,
                        height: viewport.height,
                        afterLoad: function () {
                            _this.extractScripts(block);
                            _this.bindEvents();
                        }
                    });
        } catch (e) {
            //console.log(e)
        }
    },
    extractScripts: function (strings) {
        var scripts = strings.extractScripts();
        scripts.each(function (script) {
            try {
                eval(script.replace(/var /gi, ""));
            }
            catch (e) {
                //console.log(e);
            }
        });
    }

};

var qtyControl = {
    qtyBox: null,
    init: function () {
        var $ = jQuery;
        var timeout;
        var _this = this;
        $('.input-qty').each(function () {
            $(this).data('value-before', $(this).val());
        });
        $(".spinbox-down").live('click', function (e) {
            e.preventDefault();
            var valBox = $(this).closest("div").find(".input-text");
            changeQtyVal(valBox, "down");
            triggerAjax(valBox);
        })
        $(".spinbox-up").live('click', function (e) {
            e.preventDefault();
            var valBox = $(this).closest("div").find(".input-text");
            changeQtyVal(valBox, "up");
            triggerAjax(valBox);
        })
        
        $('.input-qty').live('input', function (e) {
            checkQtyVal($(this));
        }).on('keypress keyup', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) { 
            e.preventDefault();
            e.target.blur();
            return false;
          }
        })
        .live('focusout', function(e){
            var _this = $(this);
            if (checkQtyVal(_this))
            {
                var val = _this.val();
                if(val != '')
                {
                    val = parseInt(val);
                    triggerAjax(_this);
                }else{
                    if(_this.data('value-before') == '')
                    {
                          _this.data('value-before', 0);
                    }
                    _this.val(_this.data('value-before'));
                }
            }
        });
        
        function checkQtyVal(e) {
            var rule = new RegExp("^(($|[1-9])+[0-9]*)$");
            if (!rule.test(e.val()) && e.val() != "0")
            {
                if (e.data('value-before'))
                {

                    if (rule.test(e.data('value-before')))
                    {
                        e.val(e.data('value-before'));
                        return false;
                    }
                }
                e.val(0);
                return false;
            }
            return true;
        }
        function changeQtyVal(e, direction) {
            if (!checkQtyVal(e))
            {
                return;
            }
            var val = e.val();
            val = parseInt(val);
            if (direction.toLowerCase() == 'up')
            {
                e.val(val + 1);
            } else if (direction.toLowerCase() == 'down') {
                e.val((val - 1 < 0) ? 0 : val - 1)
            }
        }
        function triggerAjax(e) {
            if (timeout !== null)
            {
                clearTimeout(timeout);
            }
            
            if (e.val() == e.data('value-before')) {

                return;
            }
            timeout = setTimeout(function () {
                App.helper.lock();
                var url = e.data('action');
                if (typeof (productAddToCartForm) != 'undefined') {
                    if (url) {
                        $('#product_addtocart_form').attr({action: url});
                    }
                    $('#product_addtocart_form [name=qty]').val(e.val());
                    productAddToCartForm.submit();
                    _this.qtyBox = e;
                } else if (typeof (productUpdateForm) != 'undefined') {
                    ajaxcart.ajaxCartSubmit(productUpdateForm);

                    //	jQuery('.btn-update').trigger('click');
                }
                e.data('value-before', e.val());
            }, 500);
        }
    },
    restore: function (value) {
        var _this = this;
        if (_this.qtyBox != null)
        {
            _this.qtyBox.val(value);
            _this.qtyBox.data('value-before', value);
        }
    }
};

// var qtyControlMuti = {
//  qtyBox: null,

//  init: function () {
//      var $ = jQuery;
//      var timeout;
//      var _this = this;
//      $('.input-qty').each(function () {
//          $(this).data('value-before', $(this).val());
//      });
//      $(".spinbox-down").live('click', function (e) {
//          e.preventDefault();
//          var valBox = $(this).closest("div").find(".input-text");
//          changeQtyVal(valBox, "down");
//          triggerAjax();
//      })
//      $(".spinbox-up").live('click', function (e) {
//          e.preventDefault();
//          var valBox = $(this).closest("div").find(".input-text");
//          changeQtyVal(valBox, "up");
//          triggerAjax();
//      })
//      $('.input-qty').live('input', function (e) {
//          if (checkQtyVal($(this)))
//          {
//              var val = $(this).val();
//              val = parseInt(val);
//              triggerAjax();
//          }
//      });
//      function checkQtyVal(e) {
//          var rule = new RegExp("^([1-9]+[0-9]*)$");
//          if (!rule.test(e.val()) && e.val() != "0")
//          {
//              if (e.data('value-before'))
//              {
                    
//                  if (rule.test(e.data('value-before')))
//                  {
//                      e.val(e.data('value-before'));
//                      return false;
//                  }
//              }
//              e.val(0);
//              return false;
//          }
//          return true;
//      }
//      function changeQtyVal(e, direction) {
//          if (!checkQtyVal(e))
//          {
//              return;
//          }
//          var val = e.val();
//          val = parseInt(val);
//          if (direction.toLowerCase() == 'up')
//          {
//              e.val(val + 1);
//          } else if (direction.toLowerCase() == 'down') {
//              e.val((val - 1 < 0) ? 0 : val - 1)
//          }
//      }
//      function triggerAjax() {
//          if (timeout !== null)
//          {
//              clearTimeout(timeout);
//          }

//             var updateQty = [], updated = false;

//             $('.input-qty').each(function () {
//                 if ($(this).val() != $(this).data('value-before')) {
//                     updateQty[$(this).data('productid')] = $(this).val();
//                     updated = true;
//                 }
//             });

//             if (!updated) {
//                 return;
//             }

//             timeout = setTimeout(function () {
//                 App.helper.lock();

//                 _this.ajaxCartSubmit({ qty: updateQty });
//             }, 1500);
//      }
//  },
//  restore: function (value) {
//      var _this = this;
//      if(_this.qtyBox != null)
//      {
//          _this.qtyBox.val(value);
//          _this.qtyBox.data('value-before', value);
//      }
//  },
//     ajaxCartSubmit: function (obj) {
//         var _this = this;
        
//         if (Modalbox !== 'undefined' && Modalbox.initialized)
//             Modalbox.hide();

//         console.log(obj);
//         try {

//                 new Ajax.Request('http://dev.infinitusorderapp.com/hk_zh_tw/checkout/cart/add/', {
//                     onCreate: function () {
//                     },
//                     onSuccess: function (response) {
//                         App.helper.unlock();
                  
//                         // Handle the response content...
//                         try {
//                             var res = response.responseText.evalJSON();
//                             if (res) {
//                                 //check for group product's option
//                                 if (res.configurable_options_block) {
//                                     if (res.r == 'success') {
//                                     } else {
//                                         if (typeof res.messages != 'undefined') {
//                                             _this.showError(res.messages);
//                                         } else {
//                                             _this.showError("Something bad happened");
//                                         }
//                                         qtyControl.restore();
//                                     }
//                                 } else {
//                                     if (res.r == 'success') {
//                                         if (res.message) {
//                                         } else {
//                                         }

//                                         //update all blocks here
//                                         _this.updateBlocks(res.update_blocks);
 
//                                     } else {
//                                         if (typeof res.messages != 'undefined') {
//                                             _this.showError(res.messages);
//                                         } else {
//                                             _this.showError("Something bad happened");
//                                         }
//                                         if (typeof(res.default_qty) != 'undefined') {
//                                             qtyControl.restore(res.default_qty);
//                                         }
                                        
//                                     }

//                                 }
//                             } else {    
//                                 document.location.reload(true);
//                             }
//                         } catch (e) {
//                             //window.location.href = url;
//                             //document.location.reload(true);
//                         }
//                         App.helper.unlock();
//                     },
//                     onComplete: function() {
//                         App.helper.unlock();
//                     }
//                 });
//         } catch (e) {
//             //console.log(e);
//             if (typeof obj == 'string') {
//                 window.location.href = obj;
//             } else {
//                 document.location.reload(true);
//             }
//             App.helper.unlock();
//         }
//     },
// };
var oldSetLocation = setLocation;
var setLocation = (function () {
    return function (url, urlUpdate) {
        if (url.search('checkout/cart/add') != -1) {
            //its simple/group/downloadable product
            ajaxcart.ajaxCartSubmit(url);
        } else if (url.search('checkout/cart/delete') != -1) {
            ajaxcart.ajaxCartSubmit(url);
        } else if (url.search('options=cart') != -1) {
            //its configurable/bundle product
            url += '&ajax=true';
            ajaxcart.getConfigurableOptions(url);
        } else {
            oldSetLocation(url);
        }
    };
})();

setPLocation = setLocation;

document.observe("dom:loaded", function () {
    ajaxcart.initialize();
});