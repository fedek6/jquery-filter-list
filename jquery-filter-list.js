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
            
       	if(options.zebra) {
       		$ul.find('li').filter(':odd').addClass('even');
       	}

        // on default attach
        $input.keyup(function (e) {
            var txt = $(this).val();

            $ul.each(function () {
                $(this).find('li').not('.no-results').hideByContent(txt, options);
            });
        });

        return this;

    }
    // hide element if it has text
    $.fn.hideByContent = function(txt, options) {
    	var count = this.length,
    		i = 0
    		visibleIndex = 0;
        
        this.each(function() { 
            var content = $(this).text();
            
            if(!options.caseSensitive) {
                content = content.toLowerCase();
                txt = txt.toLowerCase();
            }
            
            if(options.zebra) {
            	$(this).removeClass('even');
            }
            
            if (content.indexOf(txt) === -1) { 
                $(this).stop().hide(options.duration);
                ++i;
            } else {
            	if(options.zebra && ++visibleIndex%2 == 0) {
            		$(this).addClass('even');
            	}
                $(this).stop().show(options.duration);
            }                        
        });
        
        // if all elements were removed
		if( count === i && !this.data().hadNoContent ) {
        	// create no results indicator
        	if(!this.data().indicator) {
        		var noResults = $('<li></li>').addClass('no-results').text(options.noResultsText).appendTo(this.parent());
        		this.data('indicator', noResults);
        	}
        	else {
        		var noResults = this.data().indicator;
        	}
        	
        	noResults.show();
        	
        	this.data('hadNoContent', true);
        } 
        // else not all elements were removed
        else if(count > i && this.data().hadNoContent ) {
        	this.data().indicator.hide();
        	this.data('hadNoContent', false);
        }
        
        return this;
    }

    // default options
    $.fn.filterList.defaults = {
        method: 'attach',
        duration: 100,
        caseSensitive: true,
        noResultsText: 'There are no results.',
        zebra: true
    }
}(jQuery));