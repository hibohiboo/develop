'use strict';
var learnjs = {};
learnjs.problemView = ()=>{
  return $('<div class="problem-view">').text('Coming soon!');
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