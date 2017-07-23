'use strict';
var learnjs = {};
learnjs.problemView = (problemNumber)=>{
  var title = 'Problem #' + problemNumber + ' Comming Soon!';
  return $('<div class="problem-view">').text(title);
};
learnjs.showView = function(hash){
  var routes = {
    '#problem' : learnjs.problemView
  };
  var hashParts = hash.split('-');
  var viewFn = routes[hashParts[0]];
  if(!viewFn){
    return;
  }
  $('.view-container').empty().append(viewFn(hashParts[1]));
}
learnjs.appOnReady = ()=>{
  learnjs.showView(window.location.hash);
}