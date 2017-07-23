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
  })
})