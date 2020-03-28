/*
 * JavaScript LINQ Concept
 * The idea of querying JavaScript object collections is entirely based on programming language from Microsoft called C# !
 *
 *
 * Author: Łukasz Dąbrowski
 * Title : Software Engineer
 *
 * (c) C4B Solutions
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function (window) {


    /* private variables */
    
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
                            var currentColl = _DATA.fetch(jlc._jlcToken).collection;

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
                            _DATA.update(jlc._jlcToken, c_i_c);
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
                            var currentColl = _DATA.fetch(jlc._jlcToken).collection;

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
                                var metadata = _DATA.fetch(jlc._jlcToken);

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
                                        return [_COMMON.createDefaultOfT(metadata.token)];
                                    }
                                    // return one empty proper object
                                    else if(fallbackOnDefault)
                                        return _COMMON.createDefaultOfT(metadata.token);
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
                                var currentColl = _DATA.fetch(jlc._jlcToken);

                                // if the sequence contains elements
                                if(currentColl.collection.length) {
                                    // declare array of reversed sequence
                                    var r_seq = [];

                                    // loop indexes
                                    var i, j;

                                    switch (enumValue) {
                                        case _ENUM.REVERSE:
                                        case _ENUM.REVERSE_EXT:
                                            // determine the valid range of sequence to reverse
                                            if((index || index === 0) && count) {
                                                if(index + count - 1 > currentColl.collection.length - 1)
                                                    throw Error("Offset and length were out of bounds for the array or count is greater than the number of elements from index to the end of the source collection !");
                                                else if(index + count - 1 === currentColl.collection.length - 1)
                                                    i = currentColl.collection.length - 1;
                                                else if(index + count - 1 < currentColl.collection.length - 1)
                                                    i = index + count - 1;

                                                // reverse the sequence
                                                for(i; i >= index; i--)
                                                    r_seq.push(currentColl.collection[i]);

                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                    currentColl.collection[j + index] = r_seq[j];
                                            }
                                            else if((index || index === 0) && enumValue === _ENUM.REVERSE_EXT) {
                                                // reverse the sequence
                                                for(i = currentColl.collection.length - 1; i >= index; i--)
                                                    r_seq.push(currentColl.collection[i]);

                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                    currentColl.collection[j + index] = r_seq[j];
                                            }
                                            else if(count && enumValue === _ENUM.REVERSE_EXT) {
                                                // determine the start index
                                                index = currentColl.collection.length - 1 - count;

                                                // reverse the sequence
                                                for(i = currentColl.collection.length - 1; i > index; i--)
                                                    r_seq.push(currentColl.collection[i]);

                                                // increment the starting index by 1 because of condition i > index
                                                index++;
                                                // replace original sequence with the reversed sequence
                                                for(j = 0; j < r_seq.length; j++)
                                                    currentColl.collection[j + index] = r_seq[j];
                                            }
                                            else {
                                                if(enumValue === _ENUM.REVERSE && (index || count)) {
                                                    console.warn("Invoking Reverse with only one of the parameters defaults to parameterless Reverse !");
                                                    console.warn("If you wanna use only one of the parameters resort to ReverseExt instead !");
                                                }
                                                // reverse the whole sequence
                                                for(i = currentColl.collection.length - 1; i >= 0; i--)
                                                    r_seq.push(currentColl.collection[i]);

                                                // replace original sequence with the reversed sequence
                                                currentColl.collection = r_seq;
                                            }

                                            break;

                                        case _ENUM.SKIP:
                                                // process skip only (no predicates, just count), because skipWhile was handled by executing the "WHERE" filter in the parent method
                                                if(!withPredicates) {
                                                    // for null or undefined count just throw an error
                                                    if(!count && count !== 0)
                                                        throw Error("Supply required parameter called count !");

                                                    // determine the valid range of sequence to extract
                                                    if(count > 0 && count < currentColl.collection.length) {
                                                        for(i = count; i < currentColl.collection.length; i++)
                                                            r_seq.push(currentColl.collection[i]);
                                                    }
                                                    // skip the whole sequence
                                                    else if(count >= currentColl.collection.length)
                                                        ;
                                                    // skip nothing, which means taking whole sequence
                                                    else if(count < 0)
                                                        r_seq = currentColl.collection;

                                                    // skip the first element with index equal to 0
                                                    else if(count === 0) {
                                                        for(i = 1; i < currentColl.collection.length; i++)
                                                            r_seq.push(currentColl.collection[i]);
                                                    }


                                                    // replace original sequence with the new sequence
                                                    currentColl.collection = r_seq;
                                                }

                                                break;

                                        case _ENUM.TAKE:
                                                // process take only (no predicates, just count), because takeWhile was handled by executing the "WHERE" filter in the parent method
                                                if(!withPredicates) {
                                                    // for null or undefined count just throw an error
                                                    if(!count)
                                                        throw Error("Supply required parameter called count !");

                                                    // determine the valid range of sequence to extract
                                                    if(count >= currentColl.collection.length)
                                                        r_seq = currentColl.collection;

                                                    else if(count > 0 && count < currentColl.collection.length) {
                                                        for(i = 0; i < count; i++)
                                                            r_seq.push(currentColl.collection[i]);
                                                    }
                                                    // take nothing which means no any processing required
                                                    else if(count <= 0)
                                                        ;

                                                    // replace original sequence with the new sequence
                                                    currentColl.collection = r_seq;
                                                }

                                                break;

                                        default:
                                            throw Error("Unrecognized logical type of collection item [ " + enumValue +  " ] !");
                                    }

                                    // store intermediate collection for further flow
                                    _DATA.update(jlc._jlcToken, currentColl);
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
                            var currentColl = _DATA.fetch(jlc._jlcToken).collection;

                            if(enumValue === _ENUM.APPEND) {
                                // append item to the end of current data flow collection
                                currentColl.push(collectionOrItem);
                            }
                            else if(enumValue === _ENUM.PREPEND) {
                                // declare new current flow data collection
                                var new_dirty_data = [collectionOrItem];

                                // merge new current flow data collection with old current flow data collection
                                Array.prototype.push.apply(new_dirty_data, currentColl);

                                // replace the existing current data flow collection with new current data flow collection
                                currentColl = new_dirty_data;
                            }
                            else if(enumValue === _ENUM.CONCAT) {
                                // merge new data collection with current flow data collection
                                Array.prototype.push.apply(currentColl, collectionOrItem);
                            }

                            // store intermediate collection for further flow
                            _DATA.update(jlc._jlcToken, currentColl);
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
                                var currentColl = _DATA.fetch(jlc._jlcToken).collection;

                                // do grouping
                                currentColl.forEach(function (item) {
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
                                _DATA.update(jlc._jlcToken, currentColl);                                          

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
                                return _DATA.fetch(jlc._jlcToken).collection.length > 0;
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

                            if(itemTypeMetadata.isReady)
                                // return an empty proper object
                                return itemTypeMetadata.output;
                            else {
                                if(itemTypeMetadata.makeItEmpty)
                                    itemTypeMetadata.output = _COMMON.createType(itemTypeMetadata.source);
                                else
                                    itemTypeMetadata.output = itemTypeMetadata.source;

                                // return an empty proper object
                                return itemTypeMetadata.output;
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
                                dataToken : metadata.token,
                                        
                                // contextually current query collection
                                dataYield : metadata.collection,

                                // FOR DEBUGGING PURPOSES !!!!
                                _data : _DATA
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
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);
                    },

                    group_all_by_key : function(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData) {
                        /**
                         * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                         * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                        */
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

                        // invoke core logic
                        return _COMMON.groupAllByKey(jlc, predicateArray, udfEqualityComparer, udfGroupProjector, udfGroupElementsProjector, udfGroupResultValueSelector, terminateFlowAndReturnData);
                    },

                    list_all : function(jlc, fallbackOnDefault, returnFinalResult) {
                        /**
                         * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                         * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                        */
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

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
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

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
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

                        // invoke core logic
                        _COMMON.extractRange(jlc, null, startingIndex, count, enumValue);                      
                    },

                    skip_or_take : function(jlc, count, predicateArray, enumValue) {
                        /**
                         * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                         * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                        */
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

                        // invoke core logic
                        _COMMON.extractRange(jlc, predicateArray, null, count, enumValue);
                    },

                    apply_set_based_operations : function(jlc, inputObjectCollection, thisCollectionKeyArray, inputObjectCollectionKeyArray, outputType, enumValue) {
                        /**
                         * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                         * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                        */
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

                        // invoke core logic
                        //_COMMON.
                    },

                    order_asc_or_desc : function (keyPartSelectorArray, udfComparer, enumValue) {
                        /**
                         * Create dynamically a Results View, which after invoking (kind of expanding) will produce the valid output array !
                         * This approach is based on System.Linq.Enumerable.WhereListIterator<T>'s property called Results View from C# !
                        */
                        jlc.resultsView = _COMMON.resultsView.bind(null, jlc._jlcToken);

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

        // declare a private data object holding all data flows of all collections passed to JLC
        var _DATA = {
            // index that tracks contextually current collection within history array 
            index : -1,

            // collection history array
            collection_array : [],

            // get token associated with current collection
            getToken : function() {
                // increase collection index
                this.index++;

                // return collection index
                return this.index;
            },

            // store collection
            store : function (collection) {
                // store collection internally
                this.collection_array.push(collection);
            },

            // refresh updated contextually current collection in history array
            update : function (token, collection) {
                this.collection_array[token].dirty_data = collection;
            },

            // fetch metadata object of contextually current collection from history array
            fetch : function(token) {
                return {
                    // collection index within history array
                    token : token,
        
                    // collection itself
                    collection : this.collection_array[token].dirty_data
                }
            },
            
            // fetch type metadata of collection item of contextually current collection from history array
            getItemType : function(index) {
                return this.collection_array[index].type;
            }
        };

        // declare a private setup object that does required initialization
        var _SETUP = {
            ___init___ : function() {
                // set JLC runtime mode (so far exemplary usage, because it has no any effect on current inner workings of JLC)
                this.Vars.isWritable = true;

                // enable usage of JLC
                Array.prototype.usingLinq = this.Funcs.useJLC;
            },

            Vars : {
                /**
                 * Set JLC runtime mode (future-reserved property !!!)
                 *   > true   - collection in question CAN be modified during data flow  
                 *   > false  - collection in question CANNOT be modified during data flow
                */
                isWritable : false,

                // JLC API
                jlc : undefined // yes, I deliberately initialize it with default  
            },
            
            Funcs : {
                useJLC : function() {
                    /**
                     * Check if JLC context was initialized the very first time you invoke 'usingLinq()' - if not initialized, then initialize it.
                     * This is a global - Array.prototype-wide - initialization, which basically means that you has to do it only once.
                     * After JLC context initialization, it is shared across all arrays containing data collections !
                     * In plain English, the core mechanism spanning ~ 1.7k lines of code is being set up just once for the whole usage. 
                    */

                    // pass data in to the mechanism - 'this' refers to the calling client data array !
                    _SETUP.Funcs.over(this);

                    // get token associated with current collection
                    var token = _DATA.getToken();

                    // allow user to invoke JLC API by returning it to the calling client
                    return getAPI_I_1L(token);



                    /**
                     * Local helper functions
                    */
                    
                    function getAPI_I_1L(token) {
                        // declare JavaScript LINQ Concept API object
                        var _api = {
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

                        // assign token to this 'instance' of API object
                        _api._jlcToken = token;

                        // return JLC API
                        return _api;
                    }
                },

                over : function (inputCollection, inputCollectionOptionalItemType, makeItEmpty) {
                    // declare a private data object holding data collection of current JLC instance, aka static or shared instance
                    var coll_data = {
                        dirty_data : null,   // current flow data
                        dirty_data_temp : [],
                        data : null,         // data - the copy of current flow data - requested on demand via resultsView dynamic property of JavaScript LINQ Concept
                        type : {
                            source : null,
                            makeItEmpty : false,
                            isReady : false,
                            output : null
                        }
                    };


                    // store the collection to iterate over
                    coll_data.dirty_data = inputCollection || coll_data.dirty_data || [];

                    // store the collection item type for later preparation of an empty object if required
                    if(inputCollectionOptionalItemType) {
                        coll_data.type.source = inputCollectionOptionalItemType;
                        coll_data.type.makeItEmpty = makeItEmpty;
                    }
                    // otherwise create an empty object based on inputCollection's first item
                    else if(coll_data.dirty_data.length) {
                        coll_data.type.source = coll_data.dirty_data[0];
                        coll_data.type.makeItEmpty = true;
                    }
                    // or default to an empty JavaScript object
                    else {
                        coll_data.type.output = {};
                        coll_data.type.isReady = true;
                    }

                        
                    // store current collection into collection history array
                    _DATA.store(coll_data);
                }
            }
        };

    /* ~ private variables */



    /* Initialize JLC */
    _SETUP.___init___();
 }
)(window);