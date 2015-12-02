// ==UserScript==
// @name         AttentionDefender
// @namespace    http://hupp.org/adam/
// @version      0.1
// @description  Make selected domains load slowly.
// @author       Adam Hupp <adam@hupp.org>
// @grant        none
// configured entirely through user includes, and tampermonkey defaults to "*" if you don't specify something
// @include      http://hupp.org/adam/not-a-path
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
  var hostname = window.location.hostname;
  var key = "__was_delayed_" + hostname;
  if (window.sessionStorage[key]) {
    return;
  }

  console.log("AttentionDefender: delaying", hostname);
  document.body.style.display = 'none';
  setTimeout(function() {
    document.body.style.display = '';
    // don't slow next load in this tab
    window.sessionStorage[key] = 1;
    console.log("AttentionDefender: complete");
  }, 10000);
}());

