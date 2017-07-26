'use strict';
var learnjs = {};

learnjs.problems = [
  {
    description : "What is truth?",
    code :  "function problem() { return __; }"
  },
  {
    description: "Simple Math",
    code: "function problem(){return 42 === 6 * __ ;}"
  }
];

learnjs.applyObject = (obj, elem)=>{
  for(let key in obj){
    elem.find('[data-name="' + key + '"]').text(obj[key]);
  }
}

learnjs.problemView = (data)=>{
  let problemNumber = parseInt(data, 10);
  let title = 'Problem #' + problemNumber;
  let view = $('.templates .problem-view').clone();

  view.find('.title').text(title);
  learnjs.applyObject(learnjs.problems[problemNumber], view);

  return view;
}

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
};

