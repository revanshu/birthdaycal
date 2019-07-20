EATURES / FUNCTIONALITIES:

JSON manipulation:
The JSON are read through a text area and read as a string.
This is then parse using JSON.parse with try catch around it.

BLOCK Rendering:
The week content is of size: 100*100
Every time if a week has n number of initials. I am calculating the ceiling root of n
Eg: 10 -> root: 3.something -> 4.
Then I am calculating the width and height accordingly for the initials block i.e 100/x*100/x
Blocks are wrapped using flex and flex wrap.

Date Calculations:
Date calculation are done using new Date();
age difference using new Date and .getTime (for sorting)

Sorting and FIltering:
As soon as he clicks on submit. I am filtering json data with year provided and sorting with age.
Then I am pushing corresponding initials to their respective days and then passing on to weekview.js

Error Handling:
I am not allowing to submit until he has entered both field.
If he enter wrong year as a string it will alert error
If he enter number which does not matches in json it will show empty weeks
If he enter wrong JSON. It will alert error
If User name has multiple or one initial. The week box will show it accordingly

Responsive:
The page is responsive that is if you reduce the width of the page. Its content will start shifting down and will still be visible on the screen

Components:
App.js: is the main component which handles the state and passing it to child component
WeekView.js: is the component for week view.
