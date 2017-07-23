describe('LearnJs', function(){
  it('can show a problem view', function(){
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
  it('shows the landing page view when there is no hash', function(){
    // デフォルトケース
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });
})