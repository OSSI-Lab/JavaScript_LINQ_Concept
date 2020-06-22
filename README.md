# JavaScript LINQ Concept 1.0

![JavaScript LINQ Concept](/JLC_1_0_logo.png)

This library is aimed to work in FCU or in the FrontEnd apps in general and will serve the same purpose as LINQ in C# ! \
The parameters of methods of the same names like C#'s LINQ are exactly the same or as close as possible. \
\
My goal was to:
 - provide the exact functionality from LINQ in C# and transfer it stright into plain JavaScript from the user point of view
 - chose the methods that I considered the JavaScript-logical ones

JavaScript LINQ is the real thing since 2020-06-08 !

If you do not understand the architecture, do not understand what JavaScript LINQ stands for, or you are struggle to get to grips with figuring out engineering of the internal implementation, please request official explanation by making official inquary to \
[**Ms. Angelica Dąbrowska**](https://github.com/C4B-Solutions/The-Family-Blog-Official/blob/master/family/posts/1.bio_of_Angelica.md#who-is-angelica- "Officially the PR Manager of mine.").

I highly encourage reading this amazing article treating about [C# LINQ in detail](https://www.codeproject.com/Articles/383749/How-does-it-work-in-Csharp-Part-3-Csharp-LINQ-in-d "How does it work in C# ?") to better understand inner workings of LINQ ! \
By the way, taking advantage of the occasion there are 3 books that every C#-oriented developer should have on his/her shelf... \
(guess, whether I have them or not ? :smirk:)
 - [Essential C# 7.0 (6th Edition)](https://www.amazon.com/Essential-7-0-Addison-Wesley-Microsoft-Technology/dp/1509303588/ref=olp_product_details?ie=UTF8&me= "The Comprehensive, Expert Guide to C# Language Programming")&nbsp; - good for 0+ years of experience
 - [C# in Depth, Fourth Edition](https://www.manning.com/books/c-sharp-in-depth-fourth-edition "C# in Depth, Fourth Edition is your key to unlocking the powerful new features added to the language in C# 5, 6, and 7")&nbsp; - good for 2+ years of experience
 - [C# Deconstructed](https://www.apress.com/us/book/9781430266709 "Discover how C# works on the .NET Framework")&nbsp; - good for 6+ years of experience

##
## Version:&nbsp;:one:.:zero:
## Status:&nbsp;GA/DEV&nbsp;[ DEV ]&nbsp;:heavy_check_mark:&nbsp; on explicit request by :family: :blush: &nbsp;:exclamation:
## Streamlined:&nbsp;YES
### :sweat_drops:&nbsp; Tak proszę Pani - nie potrafię kłamać - Rodzina, zawsze rodzina !
#
 - DPR #15:&nbsp;2020-06-22 &nbsp;&nbsp;8:09 AM Local Time &nbsp;:heavy_check_mark:
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
 - DPR #14:&nbsp;2020-05-15 &nbsp;&nbsp;5:18 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( GA architecture - API Layer redesign v2 RC)&nbsp;:heavy_check_mark:
    - features:
      - enabling creating partial queries with preserved dependency relationship between 1st & 2nd level sorting methods by introducing action constraints !
      - enabling defining new methods in a declarative way !
        - JavaScript LINQ API is being built dynamically from methods' metadata (you declare method behaviour - that why it's called 'declarative way', AFAIK !)
      - decoupling layers from each other, i.e. API Layer (AL), Logical Operations Layer (LOL) & Physical Operations Layer (POL) !
  	    - moving syntax checking to LOL (all checks are being done over metadata, not physical data !)
	    - physical data operations are happening only in POL (final methods - the ones that produce output are the only methods that touch physical data !)
 - DPR #13:&nbsp;2020-05-04 &nbsp;&nbsp;10:05 AM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture* &nbsp; ~~Enhancement 1~~ &nbsp;:bell: )&nbsp;*Enhancement 5*&nbsp;:heavy_check_mark:
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy, orderByDescending, thenBy, thenByDescending are RC methods (sorting data with preserved dependency relationship between 1st & 2nd level sorting methods) !
      - introducing syntax checking
      - declaring action constraints
    - methods left to be implemented before releasing RC version are :
        - reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #12:&nbsp;2020-04-26 &nbsp;&nbsp;7:31 AM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 4*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy, orderByDescending, thenBy, thenByDescending are UAD methods !
    - methods left to be implemented before releasing RC version are :
        - reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #11:&nbsp;2020-04-23 &nbsp;&nbsp;5:19 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 3*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy && orderByDescending are UAD methods !
    - methods left to be implemented before releasing RC version are :
        - thenBy, thenByDescending, reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #10:&nbsp;2020-04-19 &nbsp;&nbsp;3:35 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 2*
    - the-already implemented methods are GA methods !&nbsp;:bell:
      - orderBy && orderByDescending are UAD methods ! 
    - methods left to be implemented before releasing RC version are :
        - thenBy, thenByDescending, reverse, reverseExt, select, selectMany, join, leftJoin, contains, distinct, except, defaultIfEmpty, min, max, average, intersect ?, union ?
 - DPR #9:&nbsp;2020-04-14 &nbsp;&nbsp;4:04 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA architecture*&nbsp;:bell: )&nbsp;*Enhancement 1*
    - the-already implemented methods are GA methods !&nbsp;:bell:

 - DPR #8:&nbsp;2020-04-13 &nbsp;&nbsp;5:54 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α v3*


 - DPR #7:&nbsp;2020-04-12 &nbsp;&nbsp;7:02 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α v2*


 - DPR #6:&nbsp;2020-04-11 &nbsp;&nbsp;6:25 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*α*


 - DPR #5:&nbsp;2020-04-10 &nbsp;&nbsp;1:15 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v3* )&nbsp;*β*


 - DPR #4:&nbsp;2020-04-05 &nbsp;&nbsp;1:29 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes v2* )


 - DPR #3:&nbsp;2020-03-28 &nbsp;&nbsp;4:01 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *GA-towards design changes* )


 - DPR #2:&nbsp;2020-03-21 &nbsp;&nbsp;1:15 PM Local Time &nbsp;:heavy_check_mark:&nbsp;( *major design changes* )


 - DPR #1:&nbsp;2020-03-14 11:19 AM Local Time &nbsp;:heavy_check_mark:&nbsp;( *initial version* )
## GA Version (available to download): 2020-12-06 || ASAP Local Time &nbsp;:heavy_check_mark:

#
## Download&nbsp;:lock:
#
## Dropbox MP4s:&nbsp; [How it works ?]&nbsp;:lock:
## License:&nbsp;:free:&nbsp;:heavy_check_mark:
#
## All stuff is developed under exclusive control from C4B Solutions Lab &nbsp;:registered:
## No any conflict of interests involved. 
##
## Developer:&nbsp; Łukasz Dąbrowski &nbsp;&nbsp;:poland:
### Title:&nbsp; [Engineer](https://medium.com/engineering-leadership/what-does-a-lead-engineer-do-ec8cdc119ff7 "What does an engineer do ?")
#
###### :information_source: &nbsp;&nbsp; [C4B Solutions](https://c4b-solutions.github.io)
