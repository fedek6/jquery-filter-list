(function ($) {
    // plugin definition
    $.fn.filterList = function (par1) {
        // check if par1 is options object
        if (jQuery.type(par1) === 'object') {
            var options = $.fn.extend({}, $.fn.filterList.defaults, par1);
        }
        // log error if there is no param passed
        else if (jQuery.type(par1) === 'undefined') {
            if (window.console && window.console.log) {
                window.console.log('No parameter specified');
            }
        }
        // on detach action
        else if (par1 === 'detach') {
            return this;
        }

        // variables declaration
        var $input = $(options.inputSelector),
            $ul = this;

        // on default attach
        $input.keyup(function (e) {
            var txt = $(this).val();

            $ul.each(function () {
                $(this).find('li').hideByContent(txt, options);
            });
        });

        return this;

    }
    // hide element if it has text
    $.fn.hideByContent = function(txt, options) {
        return this.each(function() { 
            var content = $(this).text();
            
            window.console.log(options.caseSensitive);
            if(!options.caseSensitive) {
                content = content.toLowerCase();
                txt = txt.toLowerCase();
            }
            
            if (content.indexOf(txt) === -1) { 
                $(this).stop().hide(options.duration);
            } else {
                $(this).stop().show(options.duration);
            }                        
        });
    }

    // default options
    $.fn.filterList.defaults = {
        method: 'attach',
        duration: 100,
        caseSensitive: true,
    }
}(jQuery));

$('ul#dynamic-search-list').filterList({
    inputSelector: '#filter-input',
    caseSensitive: false,
});