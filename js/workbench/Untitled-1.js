                    // reset hpid state
                    _ACTION.hpid.isOn = false;

                    _ACTION.hpid.context = undefined;
                    
                    // reset holder of physical intermediate data
                    Array.isArray( _ACTION.hpid.data ) ? _ACTION.hpid.data.length = 0 : _ACTION.hpid.data = [];

                    _ACTION.hpid.done = false;






                    // reset column set object
                    _ACTION.hpid.columnSet.cit = undefined;
                    _ACTION.hpid.columnSet.all_columns.length = 0;

                    // reset sorting object
                    _ACTION.hpid.sorting.sort_order = undefined;
                    _ACTION.hpid.sorting.sort_columns.length = 0;
                    _ACTION.hpid.sorting.stop = false;

                    // reset sorting object first-level object
                    _ACTION.hpid.sorting.firstLevelCtx.set( false );
                    // reset sorting object second-level object
                    _ACTION.hpid.sorting.secondLevelCtx.force( false );
                    _ACTION.hpid.sorting.secondLevelCtx.ovc.length = 0;







                    


                                
                System.Linq.Context.orderBy : 
                                                {
                                                    jlc : null
                                                    c_arr : [
                                                        // set the 1st level sorting context
                                                        _ACTION.hpid.sorting.firstLevelCtx.set.bind(this.jlc, true )
                                                    ]
                                                },
    
                System.Linq.Context.orderByDescending :
                                                            {
                                                                jlc : null
                                                                c_arr : [
                                                                    // set the 1st level sorting context
                                                                    _ACTION.hpid.sorting.firstLevelCtx.set.bind(this.jlc, true )
                                                                ]
                                                            },
    
                System.Linq.Context.thenBy : 
                                                {
                                                    jlc : null
                                                    c_arr : [
                                                        // evaluate the 1st level sorting context
                                                        _ACTION.hpid.sorting.firstLevelCtx.check.bind(this.jlc)
                                                    ]
                                                },
    
                System.Linq.Context.thenByDescending : 
                                                        {
                                                            jlc = null
                                                            c_arr : [
                                                                // evaluate the 1st level sorting context
                                                                _ACTION.hpid.sorting.firstLevelCtx.check.bind(this.jlc)
                                                            ]
                                                        }
    
    
        

                // determines the validity of usage of second-level sorting
                firstLevelCtx: {
                    // is first-level sorting available, i.e. can you use 2nd level sorting
                    _present: false,

                    check: function ()
                    {
                        /**
                         * Here you can access 'this' object which points to action constraint object and all-required contextual metadata available during the flow !
                         * 
                         * Contextual 'this' object is available during action constraint checking only
                        */

                        if ( !_ACTION.hpid.sorting.firstLevelCtx._present )
                            throw Error( '\r\nYou can only invoke 2nd level sorting (thenBy, thenByDescending), when 1st level sorting (orderBy, orderByDescending) took place !\r\n\r\n' );
                    },

                    set: /**
                     * @param {boolean} flag
                     * @param {boolean} isSetupCleanup
                     */
                        function ( flag, isSetupCleanup )
                        {
                            _ACTION.hpid.sorting.firstLevelCtx._present = flag;

                            /**
                             * Here you can access 'this' object which points to action constraint object and all-required contextual metadata available during the flow !
                             * 
                             * Contextual 'this' object is available during action constraint checking only, i.e. when 'isSetupCleanup' is not set ('undefined') !
                            */
                            if ( !isSetupCleanup && this.isWritable )
                                // when executing writable action constraint, mark that this action constraint is applied by disabling it
                                this.isEnabled = false;
                        }
                },






                                                  // action context
                                                  null,
                                                  // data to pass to action constraint function respectively
                                                  [ true ],
                                                  // action constraint functions (all constraints to apply)
                                                  [
                                                      // set the 1st level sorting context
                                                      function () {
                                                          return this.set;
                                                      }
                                                  ],
                                                  // by design this action constraint is writable
                                                  true