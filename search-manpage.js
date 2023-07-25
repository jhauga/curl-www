/***********************************************************************************
*  COPYRIGHT AND PERMISSION NOTICE
*
*  Copyright (C) Daniel Stenberg, <daniel@haxx.se>, and many
*  contributors, see the THANKS file.
*
*  All rights reserved.
*
*  Permission to use, copy, modify, and distribute this software for any purpose
*  with or without fee is hereby granted, provided that the above copyright
*  notice and this permission notice appear in all copies.
*
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. IN
*  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
*  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
*  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
*  OR OTHER DEALINGS IN THE SOFTWARE.
*
*  Except as contained in this notice, the name of a copyright holder shall not
*  be used in advertising or otherwise to promote the sale, use or other dealings
*  in this Software without prior written authorization of the copyright holder.
**********************************************************************************/

var setScroll = 0;

// Show to top button.
function showTop(clicked) {
  if (clicked == undefined) clicked = 0;
  let toTop = document.getElementById("toTop");
  if (clicked == 1) toTop.style.display = "inline-block";
  if (setScroll == 0) {
    setScroll = 1;
    document.addEventListener('scroll', function() {
      if (document.documentElement.scrollTop > 500) {
       toTop.style.display = 'inline-block';
      } else {
       toTop.style.display = 'none';
      }
    });
  }
}

// Search for options in dropdown.
function searchOptions(txt) {
  let optionMenu = document.getElementById("optionMenu");
  let optionMenuLi = optionMenu.getElementsByTagName("li");
  for (i = 0; i < optionMenuLi.length; i++) {
    let curLI = optionMenuLi[i].innerText;
    if (curLI.indexOf(txt) > -1) {
      optionMenuLi[i].style.display = "";
    } else {
      optionMenuLi[i].style.display = "none";
    }
  }
}

// Show and hide table of contents
function toggleSearchButton(showhide, onoff) {
  let manpageDiv = document.getElementsByClassName("manpage")[0];
  let manpageMenu = document.getElementsByClassName("menu")[0];
  let showItem = showhide.nextElementSibling;
  let curData = onoff.dataset;
  if (curData.onoff == 0) {
    curData.onoff = 1;
    showItem.style.display = "";
    onoff.style.background = "white";
    onoff.style.color = "black";
    onoff.innerHTML = onoff.innerHTML.replace("Show", "Hide");
    // responsive margin to page if screen below 770
    if (!manpageDiv.id) { manpageDiv.id = "activeManDiv"; }
    if (!manpageMenu.id) { manpageMenu.id = "activeManMenu"; }
  } else {
    curData.onoff = 0;
    showItem.style.display = "none";
    onoff.style.background = "";
    onoff.style.color = "";
    onoff.innerHTML = onoff.innerHTML.replace("Hide", "Show");
    // remove id from div.manpage
    if (manpageDiv.id) { manpageDiv.removeAttribute("id");}
    if (manpageMenu.id) { manpageMenu.removeAttribute("id");}
  }
}

// Add anchor when clicked.
function addOptionLinks() {
  let optionMenu = document.getElementById("optionMenu");
  let optionMenuLi = optionMenu.getElementsByTagName("li");
  let fullOptionList = document.getElementById("fullOptionList");
  fullOptionList.style.display = "";
  optionMenuLi = fullOptionList.getElementsByTagName("li");
  for (i = 0; i < optionMenuLi.length; i++) {
    optionMenuLi[i].getElementsByTagName("a")[0].addEventListener("click", function() {
      var hValue;
      if (
          this.innerHTML.indexOf(",") > -1 || 
          this.innerHTML.indexOf("&lt;") > -1 ||
        ( this.innerHTML.indexOf("[") > -1 && this.innerHTML.indexOf("]") > -1 )
       ) {
        if (this.innerHTML.indexOf(",") > -1 && this.innerHTML.indexOf("&lt;") > -1) {
          if (this.innerHTML.indexOf(", --") == -1) {
            this.href = "#" + this.innerHTML.substr(0, this.innerHTML.indexOf(" "));          
          } else {
            this.href = "#" + this.innerHTML.substr(0, this.innerHTML.indexOf(","));          
          }
         } else {
          if (this.innerHTML.indexOf(",") > -1 && this.innerHTML.indexOf("&lt;") == -1) {
            this.href = "#" + this.innerHTML.substr(0, this.innerHTML.indexOf(","));
          } 
          else if (this.innerHTML.indexOf("[") > -1 && this.innerHTML.indexOf("]") > -1) {
            this.href = "#" + this.innerHTML.substr(0,this.innerHTML.indexOf(" "));
          } else {
            this.href = "#" + this.innerHTML.substr(0,this.innerHTML.indexOf("&lt;"));
          }
        }
        hValue = this.href;
        
        // remove any periods
        if (hValue.match(/\w\d[.]/g)) {
          let lastDec = hValue.lastIndexOf(".");
          hValue = 
           hValue.substr(0, lastDec) + hValue.substr(Number(lastDec + 1));
         } 
      } else {
        if (this.innerHTML.match(/\w\d[.]/g)) {
          this.href = "#" + this.innerHTML.replace(".", "");
          hValue = this.href;
        } else {
          this.href = "#" + this.innerHTML;
          hValue = this.href;        
        }
      }
      let hasSpace = 1;

      while (hasSpace == 1) {
        if (hValue.indexOf(" ") > -1) {
          hValue = hValue.replace(" ", "");
        } else {
          hasSpace = 0;
        }
      }
      if (hValue.indexOf("#-#") > -1 || hValue.indexOf("#-:") > -1) {
        if (hValue.indexOf("#-#") > -1) {
          hValue = hValue.replace("#-#", "#-hash");
        }
        else {
          //hValue = hValue.replace("#-:", "#--next");
          let skip;
        }
        this.href = hValue;
      } else {
        this.href = hValue;
      }
    });
  }
}
showTop();
addOptionLinks();


/***********************************************************************************
******************* Check console output to see results of test ********************
After build open manpage.html and change the variable "testOptionAnchors" to 1 
to turn on tests. In order to test the browser must support console.log. 
   Test Instructions: 
     1. Change variable "testOptionAnchors" to 1. 
     2. Reload manpage.html 
     3. Open browser console tool. 
     4. The results will be as such: 
       A. Anchor Count = number of options in menu 
       B. Option Anchors = array with name of options in menu 
       C. Invert Count = number of otions that have invert or "no-opt-name" call. 
       D. Option Inverts = options in menu that have an invert call.
       E. Total Options = total number of options.
     5. Delete or set variable "testOptionAnchors" back to 0 to turn off test.
***********************************************************************************/
var testOptionAnchors = 0;

function testTheOptionAnchors() {
  var logSplit = function(x) {
    if (x == undefined) { x = 0; }
    if (x == 2) { 
      console.log("\n"); 
      console.log("*****************************************************************"); 
    } else { 
      console.log("*****************************************************************"); 
    }
  };
  console.log(" -----------------------STARTING TEST----------------------- ");
  
  var theUnorderdOptionList = document.getElementById("optionMenu");
  var theOptionListItems = theUnorderdOptionList.getElementsByTagName("li");  
  var optionAnchors = [];
  // Get option names
  for (i = 0; i < theOptionListItems.length; i++) {
    let curItem = theOptionListItems[i].getElementsByTagName("a")[0];
    optionAnchors.push(curItem.innerHTML);
  }
  // output anchors
  logSplit(2); 
  console.log("A. Anchor Count - " + theOptionListItems.length);  
  console.log("B. Option Anchors:");
  console.log(optionAnchors);  
  logSplit(); 
  
  // Copy contents
  var manpageDiv = document.getElementsByClassName("manpage")[0];
  var manpageInnerHTML = manpageDiv.innerHTML;
  var invertCheck = document.createElement("div");
  invertCheck.id = "iCheckForOptionsWithNo";
  invertCheck.style.display = "none";
  invertCheck.innerHTML = manpageInnerHTML;
  document.body.insertAdjacentElement("afterend", invertCheck);
  var iCheckForOptionsWithNo = document.getElementById("iCheckForOptionsWithNo");
  var noTextContents = iCheckForOptionsWithNo.innerText;
  let hasNo = 1; let noArray = []; let curNo;
  while(hasNo == 1) {
   if (noTextContents.indexOf("-no") > -1) {
    noTextContents = noTextContents.substr(noTextContents.indexOf("-no"));
    if (noTextContents.indexOf(" ") < noTextContents.indexOf(".")) {
      curNo = noTextContents.substr(noTextContents.indexOf("-no"), noTextContents.indexOf(" "));
    } else {
      curNo = noTextContents.substr(noTextContents.indexOf("-no"), noTextContents.indexOf("."));
    }
    let hasNoArray = 1;
    while (hasNoArray == 1) {
     if (noTextContents.indexOf(curNo) > -1) {
      noTextContents = noTextContents.replace(curNo, "");
     } else {
       hasNoArray = 0;
     }
    }
    noArray.push(curNo);
   } else {
    hasNo = 0;
   }
  }
  // output nos
  logSplit(2); 
  console.log("C. Invert Count - " + noArray.length);
  console.log("D. Option Inverts:");  
  console.log(noArray.sort());
  logSplit(); 
  
  var totalOptions = Number(noArray.length + theOptionListItems.length);
  // output total and remove test text
  logSplit(2); 
  console.log("E. Total Options - " + totalOptions);
  logSplit(); 
  console.log(" -----------------------FINISHED TEST----------------------- ");
  
  iCheckForOptionsWithNo.remove(); // delete duplicate element used to extract nos.
}

if (testOptionAnchors == 1) { testTheOptionAnchors(); }