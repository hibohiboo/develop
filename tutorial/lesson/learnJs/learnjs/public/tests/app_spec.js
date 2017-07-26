describe('LearnJs', function(){
  it('can show a problem view', function(){
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
  // デフォルトケースのテスト
  it('shows the landing page view when there is no hash', function(){
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });
  // テストダブル
  it('passes the hash view parameter to the view function',()=>{
    // スパイするオブジェクトの関数を設定
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });

  it('invokes the route when loaded', ()=>{
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  })

  // 
  it('subscribes to the hash change event', ()=>{
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  })

  describe('problem view', ()=>{
    it('has a title that includes the problem number', ()=>{
      var view = learnjs.problemView('1');
      expect(view.find('.title').text().trim()).toEqual('Problem #1');
    });
    it('has a description that includes the problem number', ()=>{
      var view = learnjs.problemView('1');
      expect(view.find('[data-name="description"]').text().trim()).toEqual('What is truth?');
    });
    it('has a description that includes the problem number', ()=>{
      var view = learnjs.problemView('1');
      expect(view.find('[data-name="code"]').text().trim()).toEqual('function problem() { return __; }');
    });
  });
  describe('answer section', ()=>{
    var view;
    beforeEach(function() {
        view = learnjs.problemView('1');
    });
    it('can check a correct answer by hitting a button', ()=>{
      console.log(view);
      view.find('.answer').val('true');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Correct!');
    });
    it('reject an incorrect answer', ()=>{
      view.find('.answer').val('false');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Incorrect!');
    })
  })
});