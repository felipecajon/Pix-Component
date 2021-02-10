(function ($, window) {
  'use strict';

  /**
  * @author gcruz
  *
  * FH.currency.priceFormat - Formatador de preço
  * @param {(Object|number|string)} el - O que sera formatado.
  * @param {{prefix:string, centsSeparator:string, thousandsSeparator:string,
  * decimalLimit:number}} [options] - Opcionalmente sobescreve o default.
  * @return {string} valor formatado.
  */

  window.FH = window.FH || {};

  FH.currency = {

    _defaults: {
      prefix: "R$ ",
      centsSeparator: ",",
      thousandsSeparator: ".",
      decimalLimit: 2
    },

    priceFormat: function(el, options) {
      /* Substitui defaults caso seja passado como parâmetro */
      var defaults = $.extend(false, FH.currency._defaults, options);

      if($.type(el) == 'object') {
        if(el.length > 1) {
          for (var i = 0; i < el.length; i++) {
            var elementOptions = defaults;

            /* Via data- API */
            if(!$.isEmptyObject($(el[i]).data())) {
              elementOptions = $.extend(false, defaults, $(el[i]).data());
            }

            FH.currency._priceIt(el[i], elementOptions);
          }
          return;
        }

        /* Via data- API */
        if(!$.isEmptyObject($(el).data())) {
          defaults = $.extend(false, defaults, $(el).data());
        }

        return FH.currency._priceIt(el, defaults);

      } else {
        return FH.currency._priceIt(el, defaults);
      }
    },

    _priceIt: function(obj, options) {
      var valueOriginal = FH.currency.getValue(obj);
      var valueFormated = FH.currency._formatedValue(valueOriginal, options);

      if(valueOriginal !== valueFormated) {
        return FH.currency._setValue(obj, valueFormated, valueOriginal);
      }
    },

    getValue: function(obj) {
      var value = "";
      var type = $.type(obj);

      if(type === "string" || type === "number") {
        value = parseFloat(obj.toString().replace(",", ".").replace(/[^0-9-.]/g, ""));
      } else if($(obj).is("input") || $(obj).is("textarea")) {
        value = $(obj).val();
      } else {
        value = $(obj).html();
      }

      if (value <= 0) {
        value = "0.00";
      }

      if(isNaN(value)) {
        value = FH.currency._toNumber($.trim(value));
      }

      /* Preenche com 0 quando nao tem minimo de centavos */
      if(value.length < 3) {
        while (value.length < 3) value = "0" + value;
      }

      return value;
    },

    _formatedValue: function(el, options) {
      var value = el;
      var negative = (
        value < 0 ? "-" : ""
        );

      var intergerValue = parseInt(
        value = Math.abs(+value || 0).toFixed(options.decimalLimit), 10
        ) + "";

      var thousandsSplit = (thousandsSplit = intergerValue.length) > 3 ? thousandsSplit % 3 : 0;

      var formated = options.prefix + negative + (thousandsSplit ? intergerValue.substr(0, thousandsSplit) + options.thousandsSeparator : "") + intergerValue.substr(thousandsSplit).replace(/(\d{3})(?=\d)/g, "$1" + options.thousandsSeparator) + (options.decimalLimit ? options.centsSeparator + Math.abs(value - intergerValue).toFixed(options.decimalLimit).slice(2) : "");

      return formated;
    },

    _toNumber: function(str) {
      var formatted = '';      
      formatted = str.replace(/[^0-9-,]/g, "").replace(",", ".");

      return formatted;
    },

    _setValue: function(obj, value, originalValue) {
      var type = $.type(obj);

      try {
        if(type === "string" || type === "number") {
          return value;
        } else if ($(obj).is("input") || $(obj).is("textarea")) {
          $(obj).val(value);
        } else {
          $(obj).html(value);
        }
      } catch(err) {
        console.log(err.message);
      }      

      $(obj).trigger("priceFormat", [obj, originalValue]);
    },
  };


})(jQuery, window);