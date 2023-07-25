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
  let showItem = showhide.nextElementSibling;
  let curData = onoff.dataset;
  if (curData.onoff == 0) {
    curData.onoff = 1;
    showItem.style.display = "";
    onoff.style.background = "white";
    onoff.style.color = "black";
    onoff.innerHTML = onoff.innerHTML.replace("Show", "Hide");
  } else {
    curData.onoff = 0;
    showItem.style.display = "none";
    onoff.style.background = "";
    onoff.style.color = "";
    onoff.innerHTML = onoff.innerHTML.replace("Hide", "Show");
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
      if (this.innerHTML.indexOf(",") > -1 || this.innerHTML.indexOf("&lt;") > -1) {
        if (this.innerHTML.indexOf(",") > -1 && this.innerHTML.indexOf("&lt;") > -1) {
          this.href = "#" + this.innerHTML.substr(0, this.innerHTML.indexOf(","));
         } else {
          if (this.innerHTML.indexOf(",") > -1 && this.innerHTML.indexOf("&lt;") == -1) {
            this.href = "#" + this.innerHTML.substr(0, this.innerHTML.indexOf(","));
          } else {
            this.href = "#" + this.innerHTML.substr(0,this.innerHTML.indexOf("&lt;"));
          }
        }
        hValue = this.href;
      } else {
        this.href = "#" + this.innerHTML;
        hValue = this.href;
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
          hValue = hValue.replace("#-#", "#--hash");
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