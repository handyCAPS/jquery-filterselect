(function($) {

	"use strict";

	$.fn.filterSelect = function(target, optionsObject) {

		var noTargetSet = false;

		function errorOut(message) {
			console.error(message);
			return this;
		}

		if (!this.is('select')) {
			return errorOut('filterSelect expects a select element!');
		}

		if (typeof target === 'string' && !$(target).is('select')) {
			return errorOut('filterSelect expect a select as the target element!');
		}

		if (target === undefined || typeof target === "object") {
			optionsObject = target;
			noTargetSet = true;
		}

		var defaultDataString = {
					target: 'target',
					reference: 'reference',
					belongsto: 'belongsto'
			};

		var settings = $.extend({
			dataString: defaultDataString
		}, optionsObject);

		if (optionsObject && optionsObject.dataString) {
			settings.dataString = $.extend(defaultDataString, optionsObject.dataString);
		}

		

		/**
		 * Hides and disables options that don't belong
		 * Unhides and re-enables options that do belong
		 * removes selection from both belongers and non-belongers
		 * @param nonBelongers {jQuery Object}
		 * @param belongers {jQuery Object}
		 * @return {void}
		 */	
		function showBelongingOptions(nonBelongers, belongers) {
			belongers.prop('hidden', null);
            nonBelongers.prop('hidden', true);

            belongers.prop('disabled', null);
            nonBelongers.prop('disabled', true);

            nonBelongers.prop('selected', null);
            belongers.prop('selected', null);
		}

		/**
		 * Takes an array of options and returns those that do not belong
		 * @param {Array | jQuery Object} options
		 * @param {Int | Array} belongsTo
		 * @return {Array}
		 */
		function findNonBelongers(options, belongsTo) {
			var b = parseInt(belongsTo);
			function filterForValue(option) {
				return parseInt(option.dataset[settings.dataString.belongsto]) !== b;
			}
			function filterForArray(option) {
				return belongsTo.indexOf(parseInt(option.dataset[settings.dataString.belongsto])) === -1;
			}
			var filterFunc = Array.isArray(belongsTo) ? filterForArray : filterForValue;

			return [].filter.call(options, filterFunc);
		}

		function getAllReferences(options) {
			var result = [];
			for (var i = 0; i < options.length; i++) {
				result.push(parseInt(options[i].dataset[settings.dataString.reference]));
			}
			return result;
		}

		/**
		 * Filters the target select based on the value of the filter select
		 * @param  {string} filter CSS selector for the select to base filter on
		 * @param  {string} target CSS selector for the select that gets filtered
		 * @return {void}        
		 */
		 function filterIt(filter, tar) {
 	        $(filter).on('change', function () {
 	            var targetSelect = $(tar);
 	            var targetOptions = targetSelect.find('option');
 	            var filterOptions = $(this).find('option:not(:hidden)');

 	            var selectedOption = $(this).find('option:selected');
 	            // if an option is selected, use that as the filter, otherwise use all options as filter
 	            var reference = selectedOption.length ? selectedOption.data(settings.dataString.reference) : getAllReferences(filterOptions);
 	            // Noneblongers get wrapped in jQuery Object
 	            var nonBelongers = $(findNonBelongers(targetOptions, reference));

 	            showBelongingOptions(nonBelongers, targetSelect.find('option'));
 	            // Triggering a change in the target select triggers filtering on subsequent targets.
 	            targetSelect.trigger('change');

 	        });
 	    }

        return this.each(function(index, sel) {
        	var tgt = target;
        	if (noTargetSet) {
        		tgt = '#' + $(sel).data(settings.dataString.target);
        	}

        	if (!$(tgt).length) {
        		return errorOut('filterSelect could not find a target! Selector is: ' + tgt);
        	}

        	filterIt(sel, tgt);
        });

	};


}(jQuery));