var _QUERYING = {
    initialize : function() {
        return initialize_I_1L();



        /**
         * Local helper functions
        */
        function initialize_I_1L() {
            /**
             * Create collection history object that will contain all collections passed to the same shared JLC instance, aka static or shared instance 
             * !!! -> NOT BEING USED IN NEW IMPLEMENTATION
            */
            var _DATA_HISTORY = {
                        // index that tracks contextually current collection within history array 
                        index : -1,

                        // collection history array
                        collection_array : [],

                        // store collection
                        store : function (collection) {
                            // store collection internally
                            this.collection_array.push(collection);

                            // increase collection index
                            this.index++;
                        },

                        // refresh updated contextually current collection in history array
                        update : function (collection) {
                            this.collection_array[this.index].dirty_data = collection;
                        },

                        // fetch metadata object of contextually current collection from history array
                        fetch : function() {
                            return {
                                // collection index within history array
                                index : this.index,

                                // collection itself
                                collection : this.collection_array[this.index].dirty_data
                            }
                        },
                        
                        // fetch type metadata of collection item of contextually current collection from history array
                        getItemType : function(index) {
                            return this.collection_array[index].type;
                        }
            };

            /**
             * Declare a private data object
             * !!! -> NOT BEING USED IN NEW IMPLEMENTATION
            */
            var _DATA_ = {
                        dirty_data : null,   // current flow data
                        dirty_data_temp : [],
                        data : null,         // data - the copy of current flow data - requested on demand via resultsView dynamic property of JavaScript LINQ Concept
                        type : {
                            source : null,
                            makeItEmpty : false,
                            isReady : false,
                            output : null
                        },
                        sortOrderSelectors : {
                            selectors : [],
                            udfComparers : [],
                            sort_data : [],

                            add : function(selectors_array, udfComparer) {
                                // store all current selectors for subsequent ordering purposes
                                this.selectors.push(selectors_array);

                                // store current UDF comparer for subsequent ordering purposes
                                this.udfComparers.push(udfComparer);
                            },

                            clear : function() {
                                // clear the already-used sorting selectors
                                this.selectors = [];
                                this.udfComparers = [];
                            },

                            getPreviousIndex : function() {
                                // return the logically valid previous selector index
                                return this.selectors.length - 1;
                            },

                            getLastUsedSelectors : function() {
                                // return the very last selectors
                                return this.selectors[this.getPreviousIndex()];
                            },

                            excludeCurrentSelectors : function() {
                                // get the very last selectors
                                var lastSelectors = this.getLastUsedSelectors();

                                // get the previous selectors' index
                                var prevIndex = this.getPreviousIndex();

                                // another invocation of thenBy or thenByDescending
                                if(lastSelectors && (prevIndex > -1)) {
                                    /**
                                     * Declare mapping object holding:
                                     *  - currently sorted stripped down intermediate data collection,
                                     *  - an array of objects, where each object consists of stripped down property and its value looked up in the backup object
                                     *
                                     *                  var mappingObject = {
                                     *                      collection : [ {...}, {...}, {...}, etc. ],
                                     *                      sort_props : [ {propName, propValue}, {propName, propValue}, {propName, propValue}, etc. ]
                                     *                   }
                                     *
                                     * Between 'collection' and 'sort_props' there is 1-1 mapping
                                     *      collection[0] <===> sort_props[0]
                                     *      collection[1] <===> sort_props[1]
                                     *      collection[2] <===> sort_props[2]
                                     *                      .
                                     *                      .
                                     *                      .
                                     *      collection[n] <===> sort_props[n]
                                    */

                                    // get the very last cached sorted stripped down intermediate collection
                                    var mappingObject = JSON.parse(this.sort_data[prevIndex]);

                                    // create mapping between original sequence and stripped down sequence
                                    createMapping_I_1L();

                                    // remove props that were used as selectors during previous ordering
                                    excludeObjectProps_I_1L(lastSelectors);
                                }
                                // first invocation of thenBy or thenByDescending
                                else if(lastSelectors) {
                                    // create mapping between original sequence and stripped down sequence
                                    createMapping_I_1L();

                                    // remove props that were used as selectors during previous ordering
                                    excludeObjectProps_I_1L(lastSelectors);
                                }



                                /**
                                 * Local helper functions
                                */
                                function createMapping_I_1L() {
                                    // loop over the sequence and assign internal id to each object
                                    for (var i = 0; i < _DATA.dirty_data.length; i++) {
                                        _DATA.dirty_data[i]._priv_id = i;
                                    }

                                    // make a copy of the sequence
                                    _DATA.createShallowCloneOrPrepare();
                                }

                                function excludeObjectProps_I_1L(lastSelectors) {
                                    // loop over all selectors
                                    for(var i = 0; i < lastSelectors.length; i++) {
                                        // reference current selector
                                        var selector = lastSelectors[i];

                                        // loop over current flow data
                                        for(var j = 0; j < _DATA.dirty_data.length; j++) {
                                            // remove current selector (property) from current object
                                            _DATA.sortOrderSelectors.includeOrExcludePropOnDemand(selector, _DATA.dirty_data[j], null, true);
                                        }
                                    }
                                }
                            },

                            serializeIntermediateSortedCollection : function(enumValue, propNameValuePair_array_array) {
                                /**
                                 * Declare mapping object holding:
                                 *  - currently sorted stripped down intermediate data collection,
                                 *  - an array of objects, where each object consists of stripped down property and its value looked up in the backup object
                                */
                                var mappingObject = {
                                    collection : null,
                                    sort_props : [] // {propName, propValue}
                                };

                                if(enumValue === _ENUM.SAVE) {
                                    // create for the first time
                                    mappingObject.collection = _DATA.dirty_data;

                                    // store current data flow mapping object
                                    _DATA.sortOrderSelectors.sort_data.push(JSON.stringify(mappingObject));
                                }
                                else if(enumValue === _ENUM.UPDATE) {
                                    // get the previous selectors' index
                                    var prevIndex = this.getPreviousIndex();

                                    // if we're dealing with thenBy or thenByDescending
                                    if(prevIndex > -1) {
                                        // deserialize the mapping object bound to current data flow sequence
                                        mappingObject = JSON.parse(_DATA.sortOrderSelectors.sort_data[prevIndex]);

                                        // update it
                                        mappingObject.sort_props = propNameValuePair_array_array;

                                        // store updated current data flow mapping object
                                        _DATA.sortOrderSelectors.sort_data[prevIndex] = JSON.stringify(mappingObject);
                                    }
                                }
                            },

                            includeOrExcludePropOnDemand : function(selector, currentObject, lookupObject, excludeOnDemand) {
                                // declare prop's name value pair
                                var propNameValuePair = {
                                    isComplex : null,
                                    propName : null,
                                    propValue : null
                                };

                                // does this selector exist in current object
                                var isOwnProp = selector[1];

                                // process only object properties
                                if(isOwnProp) {
                                    // reference the value
                                    var propName = selector[0];

                                    // is this selector a complex ?
                                    var isComplex = propName.indexOf('.') > -1;

                                    // store property value
                                    var value;

                                    // process nested props
                                    if(isComplex) {
                                        // create array of paths leading to the destination property
                                        var nestedProps = propName.split('.');

                                        // loop over all nested props
                                        for(var k = 0; k < nestedProps.length - 1; k++) {
                                            // drill down to the penaltimate property
                                            currentObject = currentObject[nestedProps[k]];
                                            lookupObject = lookupObject[nestedProps[k]];
                                        }

                                        if(excludeOnDemand)
                                            // remove property from object
                                            delete currentObject[nestedProps.length - 1];
                                        else {
                                            // get property value
                                            value = lookupObject[nestedProps.length - 1];

                                            // store property into object
                                            currentObject[nestedProps.length - 1] = value;

                                            // store property metadata
                                            propNameValuePair.isComplex = isComplex;
                                            propNameValuePair.propName = propName;
                                            propNameValuePair.propValue = value;
                                        }
                                    }
                                    // remove property from object
                                    else {
                                        if(excludeOnDemand)
                                            // remove property from object
                                            delete currentObject[propName];
                                        else {
                                            // get property value
                                            value = lookupObject[propName];

                                            // store property into object
                                            currentObject[propName] = value;

                                            // store property metadata
                                            propNameValuePair.isComplex = isComplex;
                                            propNameValuePair.propName = propName;
                                            propNameValuePair.propValue = value;
                                        }
                                    }
                                }

                                // return prop's name value pair
                                return propNameValuePair;
                            }
                        },

                        createShallowCloneOrPrepare : function(create) {
                            // do real cloning
                            if(create) {
                                // create shallow copy of the current flow data
                                this.dirty_data_temp = JSON.parse(this._dirty_data_temp_storage);

                                // remove working temp data
                                this._dirty_data_temp_storage = null;
                            }
                            // otherwise prepare, i.e. serialize the current flow data
                            else if(!create)
                                this._dirty_data_temp_storage = JSON.stringify(this.dirty_data.slice());
                        }
            };

            // declare a private enum object
            var _ENUM = {
                        FIRST : "first",
                        LAST : "last",
                        SINGLE : "single",
                        ALL : "all",
                        ANY : "any",
                        REVERSE : "reverse",
                        REVERSE_EXT : "reverse_ext",
                        SKIP : "skip",
                        TAKE : "take",
                        JOIN : "join",
                        LEFT_JOIN : "left_join",
                        ORDER_ASC : "asc",
                        ORDER_DESC : "desc",
                        ORDER_THEN_ASC : "then_asc",
                        ORDER_THEN_DESC : "then_desc",
                        SAVE : "save",
                        UPDATE : "update",
                        CONCAT : "concat",
                        APPEND : "append",
                        PREPEND : "prepend"
            };

            // declare a private common object
            var _COMMON = {
                        executeLogicalWhereFilter : function(jlc, predicateArray, reverseBoolResult) {
                            return executeLogicalWhereFilter_I_1L(jlc, predicateArray, reverseBoolResult);



                            /**
                             * Local helper functions
                            */
                            function executeLogicalWhereFilter_I_1L(jlc, predicateArray, reverseBoolResult) {
                                // declare current intermediate collection
                                var c_i_c = [];

                                // create input collection cache
                                var currentColl = _DATA.fetch().collection;

                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    var passed;

                                    if(reverseBoolResult) {
                                        passed = !_COMMON.applyLogicalWhereFilter(c_o, predicateArray, i);
                                    }
                                    else {
                                        passed = _COMMON.applyLogicalWhereFilter(c_o, predicateArray, i);
                                    }

                                    // based on filtering result (true/false) pass object further down the flow
                                    if(passed)
                                        c_i_c.push(c_o);
                                }

                                // store intermediate collection for further flow
                                _DATA.update(c_i_c);
                            }
                        },

                        executeLogicalBoolFilter : function(jlc, predicateArray, enumValue) {
                            return executeLogicalBoolFilter_I_1L(jlc, predicateArray, enumValue);



                            /**
                             * Local helper functions
                            */
                            function executeLogicalBoolFilter_I_1L(jlc, predicateArray, enumValue) {
                                // declare the bool filter result
                                var passed = false;

                                // create input collection cache
                                var currentColl = _DATA.fetch().data;

                                // loop over current collection and apply filters
                                for(var i = 0; i < currentColl.length; i++) {
                                    // access current object
                                    var c_o = currentColl[i];

                                    // apply where filter(s) and get the result
                                    passed = _COMMON.applyLogicalWhereFilter(c_o, predicateArray, i);

                                    // based on filtering result (true/false) trigger further action
                                    if(enumValue === _ENUM.ALL && !passed)
                                        break;
                                    else if(enumValue === _ENUM.ANY && passed)
                                        break;
                                }

                                // return the bool filter result
                                return passed;
                            }
                        },

                        applyLogicalWhereFilter : function(currentObject, predicateArray, elementIndex) {
                            return applyLogicalWhereFilter_I_1L(currentObject, predicateArray, elementIndex);



                            /**
                             * Local helper functions
                            */
                            function applyLogicalWhereFilter_I_1L(currentObject, predicateArray, elementIndex) {
                                // flag that tells whether object passes or fails the filter
                                var passed = true;

                                // loop over predicates
                                for(var i = 0; i < predicateArray.length; i++) {
                                    // access current filter
                                    var predicate = predicateArray[i];

                                    // determine the type of filter, i.e. user-defined function or a primitive one (string, int, float)
                                    if(typeof predicate === 'object') {
                                        // apply pre-defined basic comparison operators
                                        passed = applyWherePrimitivePredicate_I_2L(predicate, currentObject);
                                    }
                                    else if(typeof predicate === 'function') {
                                        // apply pre-defined user-defined comparison function
                                        passed = applyWhereUdfPredicate_I_2L(predicate, currentObject, elementIndex);
                                    }

                                    // check ASAP if object failed the filter
                                    if(!passed)
                                        break;
                                }

                                // return filtering result (true/false)
                                return passed;



                                /**
                                 * Local helper functions
                                */
                                function applyWherePrimitivePredicate_I_2L(predicate, currentObject) {
                                    // filtering property name
                                    var propName = predicate[0];

                                    // is filtering property value type set to float ?
                                    var propValueFloat = (predicate.length === 4) && predicate[3];

                                    // filtering property value
                                    var propValue;

                                    // process float
                                    if(propValueFloat)
                                        propValue = parseFloat(predicate[2]);
                                    // process Boolean
                                    else if(predicate[2] === true || predicate[2] === false)
                                        propValue = predicate[2];
                                    // process string
                                    else if(typeof predicate[2] === 'string')
                                        propValue = predicate[2];
                                    // by default try parsing as Int32
                                    else
                                        propValue = parseInt(predicate[2]);

                                    // filtering operator
                                    var propOperator = predicate[1];

                                    // navigate to the destination property of the current object and execute the filter
                                    var filterResult = seekObjectProp_I_3L();

                                    // return the filter result
                                    return filterResult;



                                    /**
                                     * Local helper functions
                                    */
                                    function seekObjectProp_I_3L() {
                                        // seek the destination property
                                        var propOrVal = _COMMON.seekObjectPropertyOrValue(currentObject, propName, true);

                                        /**
                                         * Check the validity of an object prop (logical "NOT NULL"), i.e. "", undefined, null
                                         * Boolean values like false, 0 (that evaluates to false) in this case are considered correct values !
                                        */
                                        var valid = propOrVal || propOrVal === 0 || propOrVal === false;

                                        // execute the filter provided that the found prop "is not null"
                                        if(valid) {
                                            switch (propOperator) {
                                                case ">":
                                                    return propOrVal > propValue;
                                                case "<":
                                                    return propOrVal < propValue;
                                                case ">=":
                                                    return propOrVal >= propValue;
                                                case "<=":
                                                    return propOrVal <= propValue;
                                                case "==":
                                                    return propOrVal == propValue;
                                                case "===":
                                                    return propOrVal === propValue;
                                                case "<>":
                                                    return propOrVal !== propValue;
                                                case "()":
                                                    return propOrVal ? true : false;
                                                case "(!)":
                                                    return propOrVal === propValue ? true : false;
                                                default:
                                                    throw new Error("Unsupported operator [ " + propOperator + " ] !");
                                            }
                                        }
                                        else
                                            return false;
                                    }
                                }

                                function applyWhereUdfPredicate_I_2L(predicate, currentObject, elementIndex) {
                                    /**
                                     * 1. Bind current collection object to user-defined function - having some pre-defined values - with 'bind' keyword
                                     *
                                     * 2. Invoke a filter with '()' invocation syntax
                                     *
                                     * 3. return the filter result with 'return' keyword
                                     *
                                     *
                                     *  All that is accomplished with the following line of code
                                    */

                                    return predicate.bind(null, currentObject, elementIndex)();
                                }
                            }
                        },

                        firstOrLastOrSingleOrAll : function(jlc, predicateArray, fallbackOnDefault, enumValue) {
                            return firstOrLastOrSingleOrAll_I_1L(jlc, predicateArray, fallbackOnDefault, enumValue);



                            /**
                             * Local helper functions
                            */
                            function firstOrLastOrSingleOrAll_I_1L(jlc, predicateArray, fallbackOnDefault, enumValue) {
                                // for given predicates
                                if(predicateArray) {
                                    // execute the "WHERE" filter
                                    _COMMON.executeLogicalWhereFilter(jlc, predicateArray);

                                    // check the result
                                    return getResult_I_2L(true);
                                }
                                // for no given predicates
                                else {
                                    // check the result
                                    return getResult_I_2L(false);
                                }



                                /**
                                 * Local helper functions
                                */
                                function getResult_I_2L(withPredicates) {
                                    // get metadata of contextually current collection from history array
                                    var metadata = _DATA.fetch();

                                    // reference contextually current collection
                                    var currentColl = metadata.collection;

                                    // if the sequence contains elements
                                    if(currentColl.length) {
                                        switch (enumValue) {
                                            case _ENUM.FIRST:
                                                // return the first item from the sequence
                                                return currentColl[0];

                                            case _ENUM.LAST:
                                                // return the last item from the sequence
                                                return currentColl[currentColl.length - 1];

                                            case _ENUM.SINGLE:
                                                if(currentColl.length === 1)
                                                    // return the single item from the sequence
                                                    return currentColl[0];
                                                else
                                                    throw Error("Sequence contains more than one element !");

                                            case _ENUM.ALL:
                                                break;

                                            default:
                                                throw Error("Unrecognized logical type of collection item [ " + enumValue +  " ] !");
                                        }
                                    }
                                    // if the sequence contains no elements
                                    else {
                                        // return an array of one empty proper object
                                        if(fallbackOnDefault && (enumValue === _ENUM.ALL)) {
                                            return [_COMMON.createDefaultOfT(metadata.index)];
                                        }
                                        // return one empty proper object
                                        else if(fallbackOnDefault)
                                            return _COMMON.createDefaultOfT(metadata.index);
                                        // throw valid error
                                        else {
                                            if(withPredicates && (enumValue === _ENUM.SINGLE))
                                                throw Error("Sequence contains no elements !");
                                            else if(withPredicates)
                                                throw Error("Sequence contains no matching element !");
                                            else if(enumValue === _ENUM.REVERSE)
                                                throw Error("Source is null !");
                                            else
                                                throw Error("Sequence contains no elements !");
                                        }
                                    }
                                }
                            }
                        },

                        extractRange : function(jlc, predicateArray, index, count, enumValue) {
                            return extractRange_I_1L(jlc, predicateArray, index, count, enumValue);



                            /**
                             * Local helper functions
                            */
                            function extractRange_I_1L(jlc, predicateArray, index, count, enumValue) {
                                // for given predicates
                                if(predicateArray && (enumValue === _ENUM.SKIP)) {
                                    // execute the "WHERE" filter
                                     _COMMON.executeLogicalWhereFilter(jlc, predicateArray, true);

                                    // check the result
                                    return getResult_I_2L(true);
                                }
                                else if(predicateArray) {
                                    // execute the "WHERE" filter
                                    _COMMON.executeLogicalWhereFilter(jlc, predicateArray);

                                    // check the result
                                    return getResult_I_2L(true);
                                }
                                // for no given predicates
                                else {
                                    // check the result
                                    return getResult_I_2L(false);
                                }



                                /**
                                 * Local helper functions
                                */
                                function getResult_I_2L(withPredicates) {
                                    // get contextually current collection within history array
                                    var currentColl = _DATA.fetch().data;

                                    // if the sequence contains elements
                                    if(currentColl.dirty_data.length) {
                                        // declare array of reversed sequence
                                        var r_seq = [];

                                        // loop indexes
                                        var i, j;

                                        switch (enumValue) {
                                            case _ENUM.REVERSE:
                                            case _ENUM.REVERSE_EXT:
                                                // determine the valid range of sequence to reverse
                                                if((index || index === 0) && count) {
                                                    if(index + count - 1 > currentColl.dirty_data.length - 1)
                                                        throw Error("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection !");
                                                    else if(index + count - 1 === currentColl.dirty_data.length - 1)
                                                        i = currentColl.dirty_data.length - 1;
                                                    else if(index + count - 1 < currentColl.dirty_data.length - 1)
                                                        i = index + count - 1;

                                                    // reverse the sequence
                                                    for(i; i >= index; i--)
                                                        r_seq.push(currentColl.dirty_data[i]);

                                                    // replace original sequence with the reversed sequence
                                                    for(j = 0; j < r_seq.length; j++)
                                                        currentColl.dirty_data[j + index] = r_seq[j];
                                                }
                                                else if((index || index === 0) && enumValue === _ENUM.REVERSE_EXT) {
                                                    // reverse the sequence
                                                    for(i = currentColl.dirty_data.length - 1; i >= index; i--)
                                                        r_seq.push(currentColl.dirty_data[i]);

                                                    // replace original sequence with the reversed sequence
                                                    for(j = 0; j < r_seq.length; j++)
                                                        currentColl.dirty_data[j + index] = r_seq[j];
                                                }
                                                else if(count && enumValue === _ENUM.REVERSE_EXT) {
                                                    // determine the start index
                                                    index = currentColl.dirty_data.length - 1 - count;

                                                    // reverse the sequence
                                                    for(i = currentColl.dirty_data.length - 1; i > index; i--)
                                                        r_seq.push(currentColl.dirty_data[i]);

                                                    // increment the starting index by 1 because of condition i > index
                                                    index++;
                                                    // replace original sequence with the reversed sequence
                                                    for(j = 0; j < r_seq.length; j++)
                                                        currentColl.dirty_data[j + index] = r_seq[j];
                                                }
                                                else {
                                                    if(enumValue === _ENUM.REVERSE && (index || count)) {
                                                        console.warn("Invoking Reverse with only one of the parameters defaults to parameterless Reverse !");
                                                        console.warn("If you wanna use only one of the parameters resort to ReverseExt instead !");
                                                    }
                                                    // reverse the whole sequence
                                                    for(i = currentColl.dirty_data.length - 1; i >= 0; i--)
                                                        r_seq.push(currentColl.dirty_data[i]);

                                                    // replace original sequence with the reversed sequence
                                                    currentColl.dirty_data = r_seq;
                                                }

                                                break;

                                            case _ENUM.SKIP:
                                                    // process skip only (no predicates, just count), because skipWhile was handled by executing the "WHERE" filter in the parent method
                                                    if(!withPredicates) {
                                                        // for null or undefined count just throw an error
                                                        if(!count && count !== 0)
                                                            throw Error("Supply required parameter called count !");

                                                        // determine the valid range of sequence to extract
                                                        if(count > 0 && count < currentColl.dirty_data.length) {
                                                            for(i = count; i < currentColl.dirty_data.length; i++)
                                                                r_seq.push(currentColl.dirty_data[i]);
                                                        }
                                                        // skip the whole sequence
                                                        else if(count >= currentColl.dirty_data.length)
                                                            ;
                                                        // skip nothing, which means taking whole sequence
                                                        else if(count < 0)
                                                            r_seq = currentColl.dirty_data;

                                                        // skip the first element with index equal to 0
                                                        else if(count === 0) {
                                                            for(i = 1; i < currentColl.dirty_data.length; i++)
                                                                r_seq.push(currentColl.dirty_data[i]);
                                                        }


                                                        // replace original sequence with the new sequence
                                                        currentColl.dirty_data = r_seq;
                                                    }

                                                    break;

                                            case _ENUM.TAKE:
                                                    // process take only (no predicates, just count), because takeWhile was handled by executing the "WHERE" filter in the parent method
                                                    if(!withPredicates) {
                                                        // for null or undefined count just throw an error
                                                        if(!count)
                                                            throw Error("Supply required parameter called count !");

                                                        // determine the valid range of sequence to extract
                                                        if(count >= currentColl.dirty_data.length)
                                                            r_seq = currentColl.dirty_data;

                                                        else if(count > 0 && count < currentColl.dirty_data.length) {
                                                            for(i = 0; i < count; i++)
                                                                r_seq.push(currentColl.dirty_data[i]);
                                                        }
                                                        // take nothing which means no any processing required
                                                        else if(count <= 0)
                                                            ;

                                                        // replace original sequence with the new sequence
                                                        currentColl.dirty_data = r_seq;
                                                    }

                                                    break;

                                            default:
                                                throw Error("Unrecognized logical type of collection item [ " + enumValue +  " ] !");
                                        }

                                        // store intermediate collection for further flow
                                        _DATA.update(currentColl);
                                    }
                                }
                            }
                        },

                        addCollectionOrItem : function(jlc, collectionOrItem, enumValue) {
                            return addCollectionOrItem_I_1L(jlc, collectionOrItem, enumValue);



                            /**
                             * Local helper functions
                            */
                            function addCollectionOrItem_I_1L(jlc, collectionOrItem, enumValue) {
                                // get contextually current collection within history array
                                var currentColl = _DATA.fetch().data;

                                if(enumValue === _ENUM.APPEND) {
                                    // append item to the end of current data flow collection
                                    currentColl.dirty_data.push(collectionOrItem);
                                }
                                else if(enumValue === _ENUM.PREPEND) {
                                    // declare new current flow data collection
                                    var new_dirty_data = [collectionOrItem];

                                    // merge new current flow data collection with old current flow data collection
                                    Array.prototype.push.apply(new_dirty_data, currentColl.dirty_data);

                                    // replace the existing current data flow collection with new current data flow collection
                                    currentColl.dirty_data = new_dirty_data;
                                }
                                else if(enumValue === _ENUM.CONCAT) {
                                    // merge new data collection with current flow data collection
                                    Array.prototype.push.apply(currentColl.dirty_data, collectionOrItem);
                                }

                                // store intermediate collection for further flow
                                _DATA.update(currentColl);                                      
                            }
                        },

                        applyOrder : function(keyPartSelectorArray, udfComparer, enumValue) {
                            return applyOrder_I_1L(keyPartSelectorArray, udfComparer, enumValue);



                            /**
                             * Local helper functions
                            */
                            function applyOrder_I_1L(keyPartSelectorArray, udfComparer, enumValue) {
                                // if first-level sorting required
                                if(enumValue === _ENUM.ORDER_ASC || enumValue === _ENUM.ORDER_DESC) {
                                    // clear the previous sorting selectors
                                    _DATA.sortOrderSelectors.clear();
                                }

                                // if user defined his own comparer
                                if(udfComparer) {
                                    // just invoke it
                                    _DATA.dirty_data.sort(udfComparer);
                                }
                                // otherwise do the subsequent sorting by applying result from the very last sorting using default comparer
                                else if(enumValue === _ENUM.ORDER_THEN_ASC || enumValue === _ENUM.ORDER_THEN_DESC) {
                                    // prepare sequence for this-context type of sorting
                                    prepareContextualSorting_I_2L();

                                    // invoke actual sorting
                                    doContextualSorting_I_2L();

                                    // store intermediate sorted collection as the input for next sort order
                                    storeContextualSorting_I_2L();

                                    // perform kind of T-SQL-like property lookup, and return array of arrays of current flow data objects' stripped down props looked up from respective lookup objects
                                    var propNameValuePair_array_array = includeOmittedProps_I_2L();

                                    // update contextual sorting object
                                    updateContextualSorting_I_2L(propNameValuePair_array_array);
                                }
                                // otherwise do the sorting using default comparer
                                else {
                                    // invoke actual sorting
                                    doContextualSorting_I_2L();
                                }



                                /**
                                 * Local helper functions
                                */
                                function prepareContextualSorting_I_2L() {
                                    // exclude properties that were used as keys in the very previous sorting
                                    _DATA.sortOrderSelectors.excludeCurrentSelectors();
                                }

                                function doContextualSorting_I_2L() {
                                    // just invoke the default comparer
                                    _DATA.dirty_data.sort(_COMMON.useDefaultComparer(keyPartSelectorArray));
                                }

                                function storeContextualSorting_I_2L() {
                                    // cache data for next sort order
                                    _DATA.sortOrderSelectors.serializeIntermediateSortedCollection(_ENUM.SAVE);
                                }

                                function includeOmittedProps_I_2L() {
                                    // reference backup object of current flow data - serving as a lookup object - by invoking real shallow cloning
                                    _DATA.createShallowCloneOrPrepare(true);

                                    // declare array of arrays of current object's stripped down props looked up from lookup object
                                    var propNameValuePair_array_array = [];

                                    // include properties that were used as keys in the very previous sorting
                                    for(var i = 0; i < _DATA.dirty_data.length; i++) {
                                        // reference current object
                                        var c_o = _DATA.dirty_data[i];

                                        // reference backup object of current flow data serving as a lookup object
                                        var l_o = _DATA.dirty_data_temp[c_o._priv_id];

                                        // add required props from lookup object to current flow sequence object, and then return array of stripped down looked up properties of current flow sequence object
                                        var propNameValuePair_array = addRequiredPropsFromLookup_I_3L(c_o, l_o);

                                        // store array of current object's stripped down props looked up from lookup object
                                        propNameValuePair_array_array.push(propNameValuePair_array);

                                        // remove internal id from next flow sequence
                                        delete c_o._priv_id;
                                    }

                                    // return array of arrays of current object's stripped down props looked up from lookup object
                                    return propNameValuePair_array_array;



                                    /**
                                     * Local helper functions
                                    */
                                    function addRequiredPropsFromLookup_I_3L(currentObject, lookupObject) {
                                        // get the very last selectors
                                        var lastSelectors = _DATA.sortOrderSelectors.getLastUsedSelectors();

                                        // declare array of stripped down looked up properties of current object
                                        var propNameValuePair_array = [];

                                        // if there are any
                                        if(lastSelectors) {
                                            // loop over lastly used selectors
                                            for(var i = 0; i < lastSelectors.length; i++) {
                                                // reference the current selector
                                                var selector = lastSelectors[i];

                                                // from lookup object add current selector (property) value to current object
                                                var propNameValuePair = _DATA.sortOrderSelectors.includeOrExcludePropOnDemand(selector, currentObject, lookupObject, false);

                                                // add to array
                                                propNameValuePair_array.push(propNameValuePair);
                                            }
                                        }

                                        // return array of stripped down looked up properties of current object
                                        return propNameValuePair_array;
                                    }
                                }

                                function updateContextualSorting_I_2L(propNameValuePair_array_array) {
                                    // update cache data for next sort order
                                    _DATA.sortOrderSelectors.serializeIntermediateSortedCollection(_ENUM.UPDATE, propNameValuePair_array_array);
                                }
                            }
                        },

                        groupAllByKey : function(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData) {
                            return groupAllByKey_I_1L(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData);



                            /**
                             * Local helper functions
                            */
                            function groupAllByKey_I_1L(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData) {
                                // check if grouping key is present
                                if(predicateArray) {
                                    // create the key
                                    var key_array = _COMMON.createGroupingOrSortingKey(predicateArray);

                                    // declare groups object
                                    var groups = {};

                                    // get contextually current collection within history array
                                    var currentColl = _DATA.fetch().data;                                        

                                    // do grouping
                                    currentColl.dirty_data.forEach(function (item) {
                                        // get the group id
                                        var id = getTheKeyValue_I_2L(item);

                                        // project group id if required
                                        if(udfGroupProjector)
                                            id = (udfGroupProjector.bind(id))();

                                        // project group elements if required
                                        if(udfGroupElementsProjector)
                                            item = (udfGroupElementsProjector.bind(item))();

                                        // reference the list of elements
                                        var list = groups[id];

                                        // if such group exists
                                        if (list) {
                                            // add object to this group
                                            list.push(item);
                                        // otherwise create a new group
                                        }
                                        else {
                                            // add object to this group
                                            groups[id] = [item];
                                        }
                                    });

                                    // sort the groups by using user-defined or a default comparer
                                    if(udfEqualityComparer)
                                       groups = sortGroups_I_2L(udfEqualityComparer);

                                    // store intermediate collection for further flow
                                    _DATA.update(currentColl);                                          

                                    // check if terminate data flow and return data to the calling client
                                    if(terminateFlowAndReturnData)
                                        return groups;
                                }
                                // otherwise throw error
                                else {
                                    throw Error("groupBy requires a grouping key to be present. Current invocation is missing the key !");
                                }



                                /**
                                 * Local helper functions
                                */
                                function getTheKeyValue_I_2L(itemCurrent) {
                                    // declare a real key
                                    var key;

                                    // loop over key parts and apply the comparison logic
                                    for(var i = 0; i < key_array.length; i++) {
                                        // reference the key part
                                        keyPart = key_array[i];

                                        // is it complex ?
                                        if(keyPart.isValidProperty && keyPart.isComplex) {
                                            // get the property value from both, the current and the previous object
                                            key += _COMMON.seekObjectPropertyOrValue(itemCurrent, keyPart.value);
                                        }
                                        // is it simple ?
                                        else if(keyPart.isValidProperty) {
                                            key += itemCurrent[keyPart.value];
                                        }
                                        // otherwise apply some part that is not a property of an object
                                        else {
                                            key += keyPart.value;
                                        }
                                    }

                                    // return the key from object
                                    return key;
                                }

                                function sortGroups_I_2L(equalityComparer) {
                                    // declare array of group keys
                                    var keys = [];

                                    // loop over all groups
                                    for(var gk in groups)
                                        // store current group key
                                        keys.push(gk);

                                    // sort the keys
                                    keys.sort(equalityComparer);

                                    // declare object holding sorted groups
                                    var sorted_groups = {};

                                    // store grouped objects sorted in a proper way into new object
                                    keys.forEach(function(key) {
                                        sorted_groups[key] = groups[key];
                                    });

                                    // return sorted groups
                                    return sorted_groups;
                                }
                            }
                        },

                        allOrAny : function(jlc, predicateArray, enumValue) {
                            return all_or_any_I_1L(jlc, predicateArray, enumValue);



                            /**
                             * Local helper functions
                            */
                            function all_or_any_I_1L(jlc, predicateArray, enumValue) {
                                // for given predicates
                                if(predicateArray) {
                                    // execute the "IF" filter
                                    var passed = _COMMON.executeLogicalBoolFilter(jlc, predicateArray, enumValue);

                                    // return the result
                                    return passed;
                                }
                                // for no given predicates
                                else {
                                    // check if there are any items in the sequence (contextually current collection within history array)
                                    return _DATA.fetch().collection.length > 0;
                                }
                            }
                        },

                        createType : function(templateObject) {
                            return createType_I_1L(templateObject);



                            /**
                             * Local helper functions
                            */
                            function createType_I_1L(templateObject) {
                                // loop over all props and delete their values
                                for(var eot_k in templateObject) {
                                    // access current property
                                    var objProp = templateObject[eot_k];

                                    // if it's nested another object, drill down to discover the props of such nested object
                                    if(typeof objProp === 'object') {
                                        createType_I_1L(objProp);
                                    }
                                    // for primitive props just set the value to 'undefined'
                                    else if(typeof objProp !== 'function') {
                                        templateObject[eot_k] = undefined;
                                    }
                                }

                                // return the empty object
                                return templateObject;
                            }
                        },

                        createDefaultOfT : function(historyIndex) {
                            return createDefaultOfT_I_1L(historyIndex);



                            /**
                             * Local helper functions
                            */
                            function createDefaultOfT_I_1L(historyIndex) {
                                // get collection item type metadata of contextually current collection from history array
                                var itemTypeMetadata = _DATA.getItemType(historyIndex);

                                if(itemTypeMetadata.type.isReady)
                                    // return an empty proper object
                                    return itemTypeMetadata.type.output;
                                else {
                                    if(itemTypeMetadata.type.makeItEmpty)
                                        itemTypeMetadata.type.output = _COMMON.createType(itemTypeMetadata.type.source);
                                    else
                                        itemTypeMetadata.type.output = itemTypeMetadata.type.source;

                                    // return an empty proper object
                                    return itemTypeMetadata.type.output;
                                }
                            }
                        },

                        seekObjectPropertyOrValue : function(currentObject, propertyName, returnValue) {
                            return seekObjectProperty_I_1L(currentObject, propertyName, returnValue);



                            /**
                             * Local helper functions
                            */
                            function seekObjectProperty_I_1L(currentObject, propertyName, returnValue) {
                                // create array of prop's path
                                var pathArray = propertyName.split('.');

                                // define property value holder
                                var propertyOrValue = null;

                                // loop over array of prop's path to seek the destination property and/or return its value
                                for(var i = 0, length = returnValue ? pathArray.length : pathArray.length - 1; i < length; i++) {
                                    propertyOrValue = propertyOrValue ? propertyOrValue[pathArray[i]] : currentObject[pathArray[i]];
                                }

                                // return value of the property or property
                                return propertyOrValue;
                            }
                        },

                        createGroupingOrSortingKey : function(keyPartSelectorArray) {
                            return createGroupingOrSortingKey_I_1L(keyPartSelectorArray);



                            /**
                             * Local helper functions
                            */
                            function createGroupingOrSortingKey_I_1L(keyPartSelectorArray) {
                                // define array holding grouping or sorting logic key
                                var key = [];

                                // loop over all key selectors
                                for(var i = 0; i < keyPartSelectorArray.length; i++) {
                                    // access current key part selector
                                    var keyPartSelector = keyPartSelectorArray[i];

                                    // get the value
                                    var value = keyPartSelector[0];

                                    // is this a property of the object
                                    var isValidProperty = keyPartSelector[1];

                                    // store object representing part of the key
                                    key.push({value : value, isValidProperty : isValidProperty, isComplex : value.indexOf('.') > -1});
                                }

                                // return array holding grouping or sorting logic key
                                return key;
                            }
                        },

                        useDefaultComparer : function(keyPartSelectorArray) {
                            return useDefaultComparer_I_1L(keyPartSelectorArray);



                            /**
                             * Local helper functions
                            */
                            function useDefaultComparer_I_1L(keyPartSelectorArray) {
                                // define comparer object
                                var comparer = {
                                    input : keyPartSelectorArray,

                                    defaultComparer : function(itemCurrent, itemPrevious) {
                                        var keyPart, itemCurrentValue, itemPreviousValue;

                                        // get the array of sorting key parts
                                        var key_array = _COMMON.createGroupingOrSortingKey(this.input);

                                        // loop over key parts and apply the comparison logic
                                        for(var j = 0; j < key_array.length; j++) {
                                            // reference the key part
                                            keyPart = key_array[j];

                                            // is it complex ?
                                            if(keyPart.isValidProperty && keyPart.isComplex) {
                                                // get the property value from both, the current and the previous object
                                                itemCurrentValue += _COMMON.seekObjectPropertyOrValue(itemCurrent, keyPart.value, true);
                                                itemPreviousValue += _COMMON.seekObjectPropertyOrValue(itemPrevious, keyPart.value, true);
                                            }
                                            // is it simple ?
                                            else if(keyPart.isValidProperty) {
                                                itemCurrentValue += itemCurrent[keyPart.value];
                                                itemPreviousValue += itemPrevious[keyPart.value];
                                            }
                                            // otherwise apply some part that is not a property of an object
                                            else {
                                                itemCurrentValue += keyPart.value;
                                                itemPreviousValue += keyPart.value;
                                            }
                                        }

                                        // determine the sorting order of the comparer
                                        switch (enumValue) {
                                            case _ENUM.ORDER_ASC:
                                            case _ENUM.ORDER_THEN_ASC:
                                                // go the ASC way
                                                if(itemCurrentValue > itemPreviousValue)
                                                    return 1;
                                                else
                                                    return -1;

                                            case _ENUM.ORDER_DESC:
                                            case _ENUM.ORDER_THEN_DESC:
                                                // go the DESC way
                                                if(itemCurrentValue > itemPreviousValue)
                                                    return -1;
                                                else
                                                    return 1;

                                            default:
                                                throw Error("Unsupported sorting order [ " + enumValue + " ] !");
                                        }
                                    }
                                };

                                // bind the comparer to comparer object
                                comparer.defaultComparer.bind(comparer);

                                // return the comparer itself
                                return comparer.defaultComparer;
                            }
                        },

                        resultsView : function() {
                            return resultsView_I_1L();



                            /**
                             * Local helper functions
                            */
                            function resultsView_I_1L() {
                                // get metadata of contextually current collection from the collection history array
                                var metadata = _DATA.fetch(); 

                                // create result view object that holds current query metadata
                                return {
                                    // current index of contextually current query collection in collection history array
                                    historyIndex : metadata.index,
                                            
                                    // contextually current query collection
                                    dataYield : metadata.collection
                                };
                            }
                        }
            };

            // declare a private core object
            var _CORE = {
                        where : function(jlc, predicateArray) {
                            // invoke core logic
                            _COMMON.executeLogicalWhereFilter(jlc, predicateArray);

                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView();
                        },

                        group_all_by_key : function(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            return _COMMON.groupAllByKey(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData);
                        },

                        list_all : function(jlc, fallbackOnDefault, returnFinalResult) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            _COMMON.firstOrLastOrSingleOrAll(jlc, null, fallbackOnDefault, _ENUM.ALL);

                            // check if this invocation is the final flow invocation
                            if(returnFinalResult)
                                return _COMMON.resultsView();
                        },

                        add_collection_or_item : function(jlc, collectionOrItem, enumValue) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                           // invoke core logic
                           _COMMON.addCollectionOrItem(jlc, collectionOrItem, enumValue);
                        },

                        first_or_default : function(jlc, predicateArray, fallbackOnDefault) {
                            // invoke core logic
                            return _COMMON.firstOrLastOrSingleOrAll(jlc, predicateArray, fallbackOnDefault, _ENUM.FIRST);
                        },

                        last_or_default : function(jlc, predicateArray, fallbackOnDefault) {
                            // invoke core logic
                            return _COMMON.firstOrLastOrSingleOrAll(jlc, predicateArray, fallbackOnDefault, _ENUM.LAST);
                        },

                        single_or_default : function(jlc, predicateArray, fallbackOnDefault) {
                            // invoke core logic
                            return _COMMON.firstOrLastOrSingleOrAll(jlc, predicateArray, fallbackOnDefault, _ENUM.SINGLE);
                        },

                        all_or_any : function(jlc, predicateArray, enumValue) {
                            // invoke core logic
                            return _COMMON.allOrAny(jlc, predicateArray, enumValue);
                        },

                        reverse_all : function(jlc, startingIndex, count, enumValue) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            _COMMON.extractRange(jlc, null, startingIndex, count, enumValue);
                        },

                        skip_or_take : function(jlc, count, predicateArray, enumValue) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            _COMMON.extractRange(jlc, predicateArray, null, count, enumValue);
                        },

                        apply_set_based_operations : function(jlc, inputObjectCollection, thisCollectionKeyArray, inputObjectCollectionKeyArray, outputType, enumValue) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            //_COMMON.
                        },

                        order_asc_or_desc : function (keyPartSelectorArray, udfComparer, enumValue) {
                            /**
                             * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                             * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                            */
                            jlc.resultsView = _COMMON.resultsView;

                            // invoke core logic
                            _COMMON.applyOrder(keyPartSelectorArray, udfComparer, enumValue);

                            // store dynamically the current array of selectors
                            _DATA.sortOrderSelectors.add(keyPartSelectorArray, udfComparer);

                            // inject dynamically contextual ordering method called thenBy
                            _API.thenBy = _API.thenBy || function(keyPartSelectorArray, udfComparer) {
                                // sort the collection in ascending order according to a key or using given comparer
                                _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_THEN_ASC);

                                // return JavaScript LINQ Concept object
                                return _API;
                            };

                            // inject dynamically contextual ordering method called thenByDescending
                            _API.thenByDescending = _API.thenByDescending || function(keyPartSelectorArray, udfComparer) {
                                // sort the collection in descending order according to a key or using given comparer
                                _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_THEN_DESC);

                                // return JavaScript LINQ Concept object
                                return _API;
                            };
                        }
            };

            // declare a private JavaScript LINQ Concept object
            var _API = {
                        where : function (predicateArray) {
                            // apply SQL WHERE-like logic
                            _CORE.where(this, predicateArray);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        join : function(anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType) {
                            // join two sequences based on defined keys
                            _CORE.apply_set_based_operations(this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.JOIN);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        leftJoin : function(anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType) {
                            // left join two sequences based on defined keys
                            _CORE.apply_set_based_operations(this, anotherObjectCollection, thisCollectionItemKeyPropArray, anotherCollectionItemKeyPropArray, outputCollectionItemType, _ENUM.LEFT_JOIN);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        groupBy : function(predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData) {
                            // group the whole sequence by given props
                            _CORE.group_all_by_key(this, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        toDictionary : function(predicateArray, udfEqualityComparer, udfGroupElementsProjector, terminateFlowAndReturnData) {
                            // return the whole sequence
                            _CORE.group_all_by_key(this, predicateArray, udfEqualityComparer, null, null, udfGroupElementsProjector, terminateFlowAndReturnData);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        toArray : function(returnFinalResult) {
                            if(returnFinalResult)
                                // return the whole sequence
                                return _CORE.list_all(this, true, returnFinalResult);

                            // otherwise prepare the whole sequence
                            _CORE.list_all(this, true, returnFinalResult);

                            // and return JavaScript LINQ Concept object
                            return this;
                        },

                        concat : function(inputCollection) {
                            // concatenate the inputCollection to the current collection
                            _CORE.add_collection_or_item(this, inputCollection, _ENUM.CONCAT);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        append : function(collectionItem) {
                            // append the collection item to the end of current collection
                            _CORE.add_collection_or_item(this, collectionItem, _ENUM.APPEND);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        prepend : function(collectionItem) {
                            // prepend the collection item to the beginning of current collection
                            _CORE.add_collection_or_item(this, collectionItem, _ENUM.PREPEND);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        contains : function(collectionItem, udfEqualityComparer) {
                            //

                            // return true/false
                        },

                        distinct : function(udfEqualityComparer) {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        except : function() {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        // ?
                        intersect : function() {

                        },
                        // ?
                        union : function() {

                        },

                        reverse : function(startingIndex, count) {
                            // apply the opposite order to the whole sequence
                            _CORE.reverse_all(this, startingIndex, count, _ENUM.REVERSE);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        reverseExt : function(startingIndex, count) {
                            // apply the opposite order to the whole sequence
                            _CORE.reverse_all(this, startingIndex, count, _ENUM.REVERSE_EXT);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        first : function(predicateArray) {
                            // return the first item from a sequence
                            return _CORE.first_or_default(this, predicateArray, false);
                        },

                        firstOrDefault : function(predicateArray) {
                            // return the first item from a sequence or a default one (sequence item type object with default values)
                            return _CORE.first_or_default(this, predicateArray, true);
                        },

                        last : function(predicateArray) {
                            // return the last item from a sequence
                            return _CORE.last_or_default(this, predicateArray, false);
                        },

                        lastOrDefault : function(predicateArray) {
                            // return the last item from a sequence or a default one (sequence item type object with default values)
                            return _CORE.last_or_default(this, predicateArray, true);
                        },

                        single : function(predicateArray) {
                            // return the only item from a sequence
                            return _CORE.single_or_default(this, predicateArray, false);
                        },

                        singleOrDefault : function(predicateArray) {
                            // return the only item from a sequence or a default one (sequence item type object with default values)
                            return _CORE.single_or_default(this, predicateArray, true);
                        },

                        any : function(predicateArray) {
                            // return true if any item from a sequence satisfies predicates
                            return _CORE.all_or_any(this, predicateArray, _ENUM.ANY);
                        },

                        all : function(predicateArray) {
                            // return true if all items from a sequence satisfy predicates
                            return _CORE.all_or_any(this, predicateArray, _ENUM.ALL);
                        },

                        skip : function(count) {
                            // bypass a specified number of elements in a sequence and return the remaining elements
                            _CORE.skip_or_take(this, count, null, _ENUM.SKIP);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        skipWhile : function(predicateArray) {
                            // bypass a specified number of elements in a sequence and return the remaining elements
                            _CORE.skip_or_take(this, null, predicateArray, _ENUM.SKIP);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        take : function(count) {
                            // return a specified number of contiguous elements from the start of a sequence
                            _CORE.skip_or_take(this, count, null, _ENUM.TAKE);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        takeWhile : function(predicateArray) {
                            // return elements from a sequence as long as a specified condition is true
                            _CORE.skip_or_take(this, null, predicateArray, _ENUM.TAKE);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        orderBy : function(keyPartSelectorArray, udfComparer) {
                            // sorts the collection in ascending order according to a key or using given comparer
                            _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_ASC);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        orderByDescending : function(keyPartSelectorArray, udfComparer) {
                            // sorts the collection in descending order according to a key or using given comparer
                            _CORE.order_asc_or_desc(keyPartSelectorArray, udfComparer, _ENUM.ORDER_DESC);

                            // return JavaScript LINQ Concept object
                            return this;
                        },

                        select : function(arrayOfNewObjectProps, outputType) {
                            //

                            // return JavaScript LINQ Concept object
                            return this;
                        }
            };

            // create public API context called JLC (JavaScript LINQ Concept)
            return _API;
        }
    }
};



console.log("orderBy");

console.log(coll_1);
var jlc_14 = jlc.Factory.Querying.createNew();
var orderBy = jlc_14
                .over(coll_1)
                .where(
                        [
                            ["id", ">", 1.1, true],
                            ["ne.ne_id", ">", 1.5, true],
                            ["id", "<>", "-1"],
                            ["id", "()", true],
                            ["valid", "(!)", true],
                            jlc_filters.myFilter1.bind(null, 1.9, 100)
                        ]
                )
                .orderBy(
                            [
                                ["name", true]
                            ]
                );
console.log(orderBy.resultsView());

console.log("~ orderBy");


console.log("orderByDescending");

console.log(coll_1);
var jlc_15 = jlc.Factory.Querying.createNew();
var orderByDescending = jlc_15
                .over(coll_1)
                .where(
                        [
                            ["id", ">", 1.1, true],
                            ["ne.ne_id", ">", 1.5, true],
                            ["id", "<>", "-1"],
                            ["id", "()", true],
                            ["valid", "(!)", true],
                            jlc_filters.myFilter1.bind(null, 1.9, 100)
                        ]
                )
                .orderByDescending(
                            [
                                ["name", true],
                                [" - ", false],
                                ["ne.ne_id", true],
                                ["id", true]
                            ]
                );
console.log(orderByDescending.resultsView());

console.log("~ orderByDescending");




function O() {}
O.prototype = proto;

return new O()



// fully identical shallow clone of obj
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));




// How can I remove a specific item from an array ?
    // > Find the index of the array element you want to remove using indexOf, and then remove that index with splice.
    // > The splice() method changes the contents of an array by removing existing elements and/or adding new elements.

const array = [2, 5, 9];

console.log(array);

const index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}

// array = [2, 9]
console.log(array); 





// Write a function generator that accepts a property name:

function propComparator(prop) {
    return function(a, b) {
        return a[prop] - b[prop];
    }
}

arr.sort(propComparator('name'));
// You can also save the sorters for later use, directly, or as parameters:

var compareNames = propComparator('name');
var compareFoos = propComparator('foo');
// ...
arr.sort(compareNames);
takesComparator(compareFoos);







,

                // CURRENTLY NOT IN USAGE 
                resultsView : function(token) {
                    return resultsView_I_1L(token);



                    /**
                     * Local helper functions
                    */
                    function resultsView_I_1L(token) {
                            // get metadata of contextually current collection from the collection history array
                            var metadata = _DATA.fetch(token); 

                            // create result view object that holds current query metadata
                            return {
                                // current index of contextually current query collection in collection history array
                                dataToken : metadata.index,
                                        
                                // contextually current query collection
                                dataYield : metadata.collection
                            };
                    }
                }





                isPrimitiveType_ : function(type, propertyName, isSortContxt) {
                    return isPrimitiveType_I_1L(type, propertyName, isSortContxt);



                    /**
                     * Local helper functions
                    */
                    function isPrimitiveType_I_1L(type, propertyName, isSortContxt) {
                        // in this context function type is not supported
                        if(type === 'function')
                            throw new TypeError('Type ' + type + ' is not supported in this context - "object" type and primitive types are supported !');


                        // check for empty property name
                        var isEmpty = propertyName.trim().length === 0;

                        if(isEmpty) {
                            // determine whether objects are sorted
                            if(isSortContxt && type === 'object') return false;

                            // determine whether primitive types are sorted
                            else if(isSortContxt && type !== 'object') return true;
                        }
                        //
                        else {
                            // determine whether objects are sorted
                            if(isSortContxt && type === 'object') return false;

                            // determine whether objects are involved in other operations
                            else if(type === 'object') return false;

                            // determine whether primitive types are involved in other operations
                            else if(type !== 'object') return true;

                            // unsupported context
                            else
                                throw Error('Contxt [ ' + type + ', ' + propertyName + ', ' + isSortContxt + ' ] is not supported !');
                        }
                    }
                },                




                    function provideCustomToStringImpl_I_2L ()
                    {
                        // declare getHashCode method on Object prototype
                        Object.prototype.getHashCode = (
                            function ()
                            {
                                // internal hash index
                                var ___h_c_i = 0;

                                // return the implementation
                                return function ()
                                {
                                    if ( !this.___jlc_h_c )
                                    {
                                        ___h_c_i++;
                                        this.___jlc_h_c = '<#' + ___h_c_i + '>';
                                    }
                                    return this.___jlc_h_c;
                                };
                            }()
                        );


                        // override toString method on Object prototype
                        Object.prototype.toString = function () { return this.getHashCode(); };
                    }




//The following function will return an array of the parameter names of any function passed in.
                    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
                    var ARGUMENT_NAMES = /([^\s,]+)/g;
                    function getParamNames(func) {
                      var fnStr = func.toString().replace(STRIP_COMMENTS, '');
                      var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
                      if(result === null)
                         result = [];
                      return result;
                    }



// Example usage:
getParamNames(getParamNames) // returns ['func']
getParamNames(function (a,b,c,d){}) // returns ['a','b','c','d']
getParamNames(function (a,/*b,c,*/d){}) // returns ['a','d']
getParamNames(function (){}) // returns []









        deepCopy: /**
         * Generically deep-copies a value original.
         *
         * Source: https://exploringjs.com/deep-js/ch_copying-objects-and-arrays.html#implementing-generic-deep-copying
         * 
         * @param {any} original Object to clone content from.
         */
            function (original) {
                if (Array.isArray(original)) {
                const copy = [];
                for (const [index, value] of original.entries()) {
                    copy[index] = _COMMON.deepCopy(value);
                }
                return copy;
                } else if (typeof original === 'object' && original !== null) {
                const copy = Object.create(null);
                for (const [key, value] of Object.entries(original)) {
                    copy[key] = _COMMON.deepCopy(value);
                }
                return copy;
                } else {
                // primitive value: atomic, no need to copy
                return original;
                }
            },
        deepCopyNoCR: /**
         * Clone object without reference without circular references.
         *
         * Source: https://dev.to/ptasker/best-way-to-copy-an-object-in-javascript-827
         * 
         * @param {any} obj Object to clone content from.
         */
            function ( obj )
            {
                if ( obj && typeof obj === 'object' )
                {
                    return Object.keys( obj )
                        .map( k => ( { [ k ]: _COMMON.deepCopyNoCR( obj[ k ] ) } ) )
                        .reduce( ( a, c ) => Object.assign( a, c ), Object.create( null ) );
                } else if ( Array.isArray( obj ) )
                {
                    return obj.map( _COMMON.deepCopyNoCR );
                }
                return obj;
            },