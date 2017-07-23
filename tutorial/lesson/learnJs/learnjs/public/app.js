'use strict';
var learnjs = {};
learnjs.problemView = (problemNumber)=>{
  var title = 'Problem #' + problemNumber + ' Comming Soon!';

  var view = $('.templates .problem-view').clone();
  view.find('.title').text(title);

  return view;
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
  // イベントハンドラの登録
  window.onhashchange = ()=>{
    learnjs.showView(window.location.hash);
  }
  learnjs.showView(window.location.hash);
}