(function (scope) {
    let ring = null;

    // node.js
    if (typeof require !== 'undefined') {
        ring = require('../../ring');
    }

    // browser
    if (typeof window === 'object') {
        ring = window.ring;
        if (window !== scope) {
            // eslint-disable-next-line no-param-reassign
            ring = scope.ring;
        }
    }

    function isDefined(input) {
        if (typeof input !== 'undefined') return true;
        return false;
    }

    function isNull(input) {
        if (input === null && typeof input === 'object') return true;
        return false;
    }

    function isBoolean(input) {
        if (typeof input === typeof true) return true;
        return false;
    }

    function isObject(input) {
        if (
            typeof input === 'object' &&
            input === Object(input) &&
            Object.prototype.toString.call(input) !== '[object Array]' &&
            Object.prototype.toString.call(input) !== '[object Date]'
        ) {
            return true;
        }
        return false;
    }

    function isString(input) {
        if (typeof input === 'string') return true;
        return false;
    }

    function isEmptyString(input) {
        if (this.isString && input.length === 0) return true;
        return false;
    }

    function isNumber(input) {
        if (Number.isFinite(input)) return true;
        return false;
    }

    function isArray(input) {
        if (Array.isArray(input)) return true;
        return false;
    }

    function isEmptyArray(input) {
        if (this.isArray && input.length === 0) return true;
        return false;
    }

    function isFunction(input) {
        if (typeof input === 'function') return true;
        return false;
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function isSymbol(input) {
        return (
            typeof input === 'symbol' ||
            (typeof input === 'object' &&
            Object.prototype.toString.call(input) === '[object Symbol]')
        );
    }

    function isArrayOfObjects(element) {
        if (!isEmptyArray(element)) {
            element.map(function(item){
                if (!isObject(item)) {
                    return false;
                }
            });

            return true;
        }
        return false;
    }

    function isValidType(type, value){
        switch(type){
            case 'defined':
                return isDefined(value);
            case 'null':
                return isNull(value);
            case 'boolean':
                return isBoolean(value);
            case 'object':
                return isObject(value);
            case 'string':
                return isString(value);
            case 'validString':
                return isEmptyString(value);
            case 'number':
                return isNumber(value);
            case 'array':
                return isArray(value);
            case 'validArray':
                return !isEmptyArray(value);
            case 'function':
                return isFunction(value);
            case 'date':
                return isDate(value);
            case 'symbol':
                return isSymbol(value);
            case 'objectArray':
                return isArrayOfObjects(value);
        }
    }

    function checkTypes(structure, properties){
        const keys = Object.keys(structure);
        const exists = [];

        keys.forEach(function(item){
            const type = structure[item];

            if(isValidType(type, properties[item])){
                exists.push(item);
            }
        });

        return exists;
    }

    function fastConcat () {
        var length = arguments.length,
            arr = [],
            i, item, childLength, j;

        for (i = 0; i < length; i++) {
          item = arguments[i];
          if (Array.isArray(item)) {
            childLength = item.length;
            for (j = 0; j < childLength; j++) {
              arr.push(item[j]);
            }
          }
          else {
            arr.push(item);
          }
        }
        return arr;
      }

    function parseParentError(structure, parents){
        let exists = [];

        parents.map(function(parent){
            const classExists = checkTypes(structure, parent.__properties__);
            exists = fastConcat(exists, classExists);

            if(parent.__parents__.length > 0){
                const result = parseParentError(structure, parent.__parents__);
                exists = fastConcat(exists, result);
            }
        });

        return exists;
    }

    function findMissingProperties(structure, exists){
        let errors = '';
        const keys = Object.keys(structure);

        keys.forEach(function(item){
            if(exists.includes(item) !== true){
                errors = `${errors}\nMissing property "${item}" of type "${structure[item]}"`;
            }
        });

        return errors;
    }

    function validateStructure({ sourceClass, structure, parents }){
        let exists = checkTypes(structure, sourceClass);
        exists = fastConcat(exists, parseParentError(structure, parents));

        const errors = findMissingProperties(structure, exists);
        return errors;
    }

    function Interface(structure, sourceClass){
        return function(parents){
            if(Array.isArray(parents)){
                const err = validateStructure({ sourceClass, structure, parents });

                if(err){
                    throw new Error(err);
                }

                return ring.create(parents, sourceClass);
            }

            throw new Error('Parents should be an array');
        }
    }

    // if sbd's using requirejs library to load Interface
    if (typeof define === 'function') {
        // eslint-disable-next-line no-undef
        define(Interface);
    }

    // node.js
    if (typeof module === 'object' && module.exports) {
        module.exports = Interface;
    }

    // browser
    if (typeof window === 'object') {
        window.Interface = Interface;
        if (window !== scope) {
            // eslint-disable-next-line no-param-reassign
            scope.Interface = Interface;
        }
    }

})(this);
