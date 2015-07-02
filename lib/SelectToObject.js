(function () {

	'use strict';

	var SelectToObject = function (select, attributes) {

		attributes || (attributes = []);

		var options = select.querySelectorAll('option'),
		    output  = [],
			optionObj,
			value,
			name,
			attributeValue;

		[].forEach.call(options, function (option) {
			value     = option.value;
			name      = option.textContent;
			optionObj = {
				name: name,
				value: value
			};

			if (attributes.constructor === Array) {
				attributes.forEach(function (attribute) {
					attributeValue = option.getAttribute(attribute);
					optionObj[attribute] = attributeValue;
				});
			}

			output.push(optionObj);
		});

		return output;

	};

	module.exports = SelectToObject;

}).call(this);
