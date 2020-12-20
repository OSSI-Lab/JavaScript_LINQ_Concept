# JavaScript LINQ Concept 1.0

![JavaScript LINQ Concept](/JLC_1_0_logo.png)

This library is aimed to work in FCU or in the FrontEnd apps in general and will serve the same purpose as LINQ in C# ! \
The parameters of methods of the same names like C#'s LINQ are exactly the same or as close as possible. \
\
My goal was to:
 - provide the exact functionality from LINQ in C# and transfer it stright into plain JavaScript from the user point of view
 - chose the methods that I considered the JavaScript-logical ones

JavaScript LINQ is the real thing since 22-June-2020 !

If you do not understand the architecture, do not understand what JavaScript LINQ stands for, or you are struggle to get to grips with figuring out engineering of the internal implementation, please request official explanation by making official inquary to me.

I highly encourage reading this amazing article treating about [C# LINQ in detail](https://www.codeproject.com/Articles/383749/How-does-it-work-in-Csharp-Part-3-Csharp-LINQ-in-d "How does it work in C# ?") to better understand inner workings of LINQ ! \
By the way, taking advantage of the occasion there are 3 books that every C#-oriented developer should have on his/her shelf... \
(guess, whether I have them or not ? :smirk:)
 - [Essential C# 7.0 (6th Edition)](https://www.amazon.com/Essential-7-0-Addison-Wesley-Microsoft-Technology/dp/1509303588/ref=olp_product_details?ie=UTF8&me= "The Comprehensive, Expert Guide to C# Language Programming")&nbsp; - good for 0+ years of experience
 - [C# in Depth, Fourth Edition](https://www.manning.com/books/c-sharp-in-depth-fourth-edition "C# in Depth, Fourth Edition is your key to unlocking the powerful new features added to the language in C# 5, 6, and 7")&nbsp; - good for 2+ years of experience
 - [C# Deconstructed](https://www.apress.com/us/book/9781430266709 "Discover how C# works on the .NET Framework")&nbsp; - good for 6+ years of experience

##
## Version:&nbsp;:one:.:zero:
## Status:&nbsp;GA/TEST&nbsp;[ TEST out of DEV/TEST/RELEASE ]&nbsp;:heavy_check_mark:
## Streamlined:&nbsp;YES
#
 - TEST #20 - DPR #43:&nbsp;2020-12-20 &nbsp;&nbsp;10:04 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - testing the whole interface
        - the interface of query methods was tested up to 'defaultIfEmpty' query methods (line 1660) !
      - adding 'object full structure string' (ofss) special property to address the case with null properties ! (line 2201)
        - go for 'ofss' if defined, otherwise check the first item in the collection !
        - other solutions like doing anylysis of next and next object from collection would cause the effect of 'C/C++ memory leak' in some serious scenarios ! 
 - TEST #19 - DPR #42:&nbsp;2020-12-19 &nbsp;&nbsp;3:06 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found since TEST #18
      - testing the whole interface
        - the interface of query methods was tested up to 'defaultIfEmpty' query methods (line 1656) !
 - TEST #18 - DPR #41:&nbsp;2020-12-17 &nbsp;&nbsp;10:57 AM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found since TEST #17
      - testing the whole interface
        - the interface of query methods was tested up to 'order-*' family of query methods (line 1311) !
 - TEST #17 - DPR #40:&nbsp;2020-12-13 &nbsp;&nbsp;8:17 PM Local Time, &nbsp;2020-12-14 &nbsp;&nbsp;11:23 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found since TEST #16
        - added encapsulation of error handling - while displaying partial query state - to prevent from runtime program termination !
      - testing the whole interface
        - the interface of query methods was tested up to 'skip' query method !
 - TEST #16 - DPR #39:&nbsp;2020-12-10 &nbsp;&nbsp;4:39 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found since TEST #15
 - TEST #15 - DPR #38:&nbsp;2020-12-08 &nbsp;&nbsp;3:00 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found since TEST #14
 - TEST #14 - DPR #37:&nbsp;2020-12-06 &nbsp;&nbsp;12:31 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
        - added sorting by any nested object !
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #13 - DPR #36:&nbsp;2020-12-04 &nbsp;&nbsp;11:48 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #12 - DPR #35:&nbsp;2020-11-27, 2020-12-03 &nbsp;&nbsp;12:30 AM Local Time, 1:15 PM Local Time&nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
 - TEST #11 - DPR #34:&nbsp;2020-11-26 &nbsp;&nbsp;4:15 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
 - TEST #10 - DPR #33:&nbsp;2020-11-25 &nbsp;&nbsp;11:31 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
      - adding some further code perf optimizations (removing code redundancy & execution speed improvements)
 - TEST #9 - DPR #32:&nbsp;2020-11-20 &nbsp;&nbsp;11:25 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
      - I switched back 'reverseAllOrSubset' to be partial method in JavaScript ! (I misunderstood something in C#)
      - due to design approach and JavaScript nature JLC's query methods called 'join' had to be renamed to 'innerJoin'
 - TEST #8 - DPR #31:&nbsp;2020-11-18 &nbsp;&nbsp;6:50 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #7 - DPR #30:&nbsp;2020-11-17 &nbsp;&nbsp;4:08 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
      - due to design approach, JavaScript nature and for optimization purposes JLC's query methods called 'reverse' and 'reverseExt' had to be renamed to 'reverseAllOrSubset'. One method that serves the same purpose as the previous two ones.
      - I chose 'reverseAllOrSubset' to be final method in JavaScript that returns new collection in contrast to what it does in C#, because IMHO it better fits the purpose of JavaScript nature !
 - TEST #6 - DPR #29:&nbsp;2020-11-16 &nbsp;&nbsp;5:08 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - bugs found while testing up to a point called [ // CODE WAS TESTED UNTIL HERE ! ]
      - due to [design approach & JavaScript nature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable "") JLC's query method called 'concat' had to be renamed to 'concatenate'
 - TEST #5 - DPR #28:&nbsp;2020-11-14 &nbsp;&nbsp;11:25 AM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - syntax checking of a query flow
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #4 - DPR #27:&nbsp;2020-11-08 &nbsp;&nbsp;1:19 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - viewing partial results during query flow
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #3 - DPR #26:&nbsp;2020-11-01 &nbsp;&nbsp;11:53 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - adding some further code perf optimizations (removing code redundancy)
 - TEST #2 - DPR #25:&nbsp;2020-10-27 &nbsp;&nbsp;12:54 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - maximum call stack size exceeded error, adding some code perf optimizations
 - TEST #1 - DPR #24:&nbsp;2020-10-13 &nbsp;&nbsp;11:42 PM Local Time &nbsp;:heavy_check_mark:
    - FIXED:
      - handling rsc_syntax in _LINQ_CONTEXT when you have multimple values, i.e. rsc_syntax: 'outerSelectorArray, innerSelectorArray'
#
 - DPR #23:&nbsp;2020-10-12 &nbsp;&nbsp;5:42 PM Local Time &nbsp;:heavy_check_mark:
    - done (what has changed since DPR #22):
      - development of the following methods:
		- adding defs of 'groupJoin' & 'groupLeftJoin' methods for _LINQ_CONTEXT / udlm
		- adding some code perf optimizations
    - pending (what is left to be done in the next DPRs):
      - testing whole library: all query methods
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
    - future feature implementation (in the JavaScript LINQ & JavaScript PLINQ - aka Parallel JavaScript LINQ)
      - intersect, union, sequenceEqual, count, sum, cast&nbsp;:zap:&nbsp;:bell:
      - JavaScript PLINQ version to be available as of 01-06-2021&nbsp;:zap:&nbsp;:bell:
 - DPR #22:&nbsp;2020-10-11 &nbsp;&nbsp;10:29 AM Local Time &nbsp;:heavy_check_mark:
    - done (what has changed since DPR #21):
      - development of the following methods: finishing defs of 'groupJoin' & 'groupLeftJoin' methods for _PHYSICAL_FILTER / executeJoinFilter 
    - pending (what is left to be done in the next DPRs):
      - adding defs of 'groupJoin' & 'groupLeftJoin' methods for _LINQ_CONTEXT / udlm
      - testing whole library: all query methods
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #21:&nbsp;2020-10-09 &nbsp;&nbsp;10:32 AM Local Time &nbsp;:heavy_check_mark:
    - done (what has changed since DPR #20):
      - development of the following methods: added defs of 'groupJoin' & 'groupLeftJoin' methods for _PHYSICAL_FILTER / executeJoinFilter 
    - pending (what is left to be done in the next DPRs):
      - finishing defs of 'groupJoin' & 'groupLeftJoin' methods for _PHYSICAL_FILTER / executeJoinFilter
      - adding defs of 'groupJoin' & 'groupLeftJoin' methods for _LINQ_CONTEXT / udlm
      - testing whole library: all query methods
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #20:&nbsp;2020-10-09 &nbsp;&nbsp;12:41 AM Local Time &nbsp;:heavy_check_mark:
    - done (what has changed since DPR #19):
      - development of the following methods: added defs for 'reverse', 'reverseExt', 'select', 'selectMany', 'join' & 'leftJoin'
    - pending (what is left to be done in the next DPRs):
      - testing whole library: all query methods
      - adding 'groupJoin' & 'groupLeftJoin'
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #19:&nbsp;2020-10-06 &nbsp;&nbsp;5:00 PM Local Time &nbsp;:heavy_check_mark:
    - features (what has changed since DPR #18):
      - development of the following methods: join, leftJoin -> to tested !
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #18:&nbsp;2020-10-01 &nbsp;&nbsp;10:48 PM Local Time &nbsp;:heavy_check_mark:
    - features (what has changed since DPR #17):
      - development of the following methods: join, leftJoin
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #17:&nbsp;2020-09-30 &nbsp;&nbsp;8:45 AM Local Time &nbsp;:heavy_check_mark:
    - features (what has changed since DPR #16):
      - development of the following methods: join, leftJoin
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #16:&nbsp;2020-09-28 &nbsp;&nbsp;6:12 PM Local Time &nbsp;:heavy_check_mark:
    - features:
      - orderBy, orderByDescending, thenBy, thenByDescending are RC methods (sorting data with preserved dependency relationship between 1st & 2nd level sorting methods) !
      - development of the following methods: select, selectMany, join, leftJoin
    - methods left to be implemented before releasing RC version are :
        - reverse, reverseExt, select, selectMany, join, leftJoin, intersect ?, union ?
    - architecture [ DynamicAPI Layer ]
        - see DPR #15
 - DPR #15:&nbsp;2020-06-22 &nbsp;&nbsp;4:09 PM Local Time &nbsp;:heavy_check_mark:
    - features:
      - architecture [ DynamicAPI Layer ]
        - each new - not present yet in the flow chain - query method being invoked on API object is being built dynamically and on demand, aka on-the-fly
        - subsequent invocation of such already-invoked-method in the flow chain is retrieved directly from the API object
        - there are two levels of method cache - L1 & L2 - to boost the execution speed
      - 3-Tier architecture
        - DynamicAPI Layer
        - Logical Operations Layer
        - Physical Operations Layer
    - [Watch JavaScript LINQ in action](https://drive.google.com/drive/folders/1puGA_zuvLC-z9w93ajHtQepa8-PEl1-2 "How impossible was made possible.").
 - DPR #14:&nbsp;2020-05-15 &nbsp;&nbsp;6:18 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( GA architecture - API Layer redesign v2 RC)&nbsp;:heavy_check_mark:
    - features:
      - enabling creating partial queries with preserved dependency relationship between 1st & 2nd level sorting methods by introducing action constraints !
      - enabling defining new methods in a declarative way !
        - JavaScript LINQ API is being built dynamically from methods' metadata (you declare method behaviour - that why it's called 'declarative way', AFAIK !)
      - decoupling layers from each other, i.e. API Layer (AL), Logical Operations Layer (LOL) & Physical Operations Layer (POL) !
  	    - moving syntax checking to LOL (all checks are being done over metadata, not physical data !)
	    - physical data operations are happening only in POL (final methods - the ones that produce output are the only methods that touch physical data !)
 - DPR #13:&nbsp;2020-05-04 &nbsp;&nbsp;11:05 AM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture* &nbsp; ~~Enhancement 1~~ &nbsp;:bell: )&nbsp;*Enhancement 5*&nbsp;:heavy_check_mark:
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy, orderByDescending, thenBy, thenByDescending are RC methods (sorting data with preserved dependency relationship between 1st & 2nd level sorting methods) !
      - introducing syntax checking
      - declaring action constraints
    - methods left to be implemented before releasing RC version are :
        - reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #12:&nbsp;2020-04-26 &nbsp;&nbsp;8:31 AM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 4*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy, orderByDescending, thenBy, thenByDescending are UAD methods !
    - methods left to be implemented before releasing RC version are :
        - reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #11:&nbsp;2020-04-23 &nbsp;&nbsp;6:19 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 3*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy && orderByDescending are UAD methods !
    - methods left to be implemented before releasing RC version are :
        - thenBy, thenByDescending, reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #10:&nbsp;2020-04-19 &nbsp;&nbsp;4:35 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 2*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy && orderByDescending are UAD methods ! 
    - methods left to be implemented before releasing RC version are :
        - thenBy, thenByDescending, reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #9:&nbsp;2020-04-14 &nbsp;&nbsp;5:04 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 1*
    - the-already implemented methods are GA methods !&nbsp;:bell:

 - DPR #8:&nbsp;2020-04-13 &nbsp;&nbsp;6:54 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α v3*


 - DPR #7:&nbsp;2020-04-12 &nbsp;&nbsp;8:02 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α v2*


 - DPR #6:&nbsp;2020-04-11 &nbsp;&nbsp;7:25 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α*


 - DPR #5:&nbsp;2020-04-10 &nbsp;&nbsp;2:15 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*β*


 - DPR #4:&nbsp;2020-04-05 &nbsp;&nbsp;2:29 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v2* )


 - DPR #3:&nbsp;2020-03-28 &nbsp;&nbsp;5:01 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes* )


 - DPR #2:&nbsp;2020-03-21 &nbsp;&nbsp;2:15 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *major design changes* )


 - DPR #1:&nbsp;2020-03-14 12:19 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *initial version* )
## GA Version (available to download): ASAP &nbsp;:heavy_check_mark:

#
## Download&nbsp;:lock:
#
## Dropbox MP4s:&nbsp; [How it works ?]&nbsp;:lock:
## License:&nbsp;:free:&nbsp;:heavy_check_mark:
#
## All stuff is developed under exclusive control from C4B Solutions Lab &nbsp;:tm:
## No any conflict of interests involved. 
##
## Developer:&nbsp; Łukasz Dąbrowski &nbsp;&nbsp;:poland:
### Title:&nbsp; [Engineer](https://medium.com/engineering-leadership/what-does-a-lead-engineer-do-ec8cdc119ff7 "What does an engineer do ?")
#
###### :information_source: &nbsp;&nbsp; [C4B Solutions](https://c4b-solutions.github.io)
