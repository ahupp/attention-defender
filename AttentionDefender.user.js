// ==UserScript==
// @name         AttentionDefender
// @namespace    http://hupp.org/adam/
// @version      0.1
// @description  Make selected domains load slowly.  If you're easily distracted this will give you a chance to decide if you really want to read it.
// @author       Adam Hupp <adam@hupp.org>
// @grant        none
// @run-at       document-body
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function() {
  // don't run for iframes.  shouldn't be a problem either way but it makes logging confusing
  if (self != top) {
     return;
  }

  // state that says whether this session already hit this site
  var key = "__was_delayed_" + window.location.hostname;
  if (window.sessionStorage[key]) {
    return;
  }

  console.log("AttentionDefender: delaying", domain);
  document.body.style.display = 'none';
  setTimeout(function() {
    document.body.style.display = '';
    // don't slow next load in this tab
    window.sessionStorage[key] = 1;
    console.log("AttentionDefender: complete");
  }, 10000);
}());

