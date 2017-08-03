describe('LearnJs', function(){
  beforeEach(function() {
    learnjs.identity = new $.Deferred();
  });
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

  it('can flash an element while setting the text', function() {
    var elem = $('<p>');
    spyOn(elem, 'fadeOut').and.callThrough();
    spyOn(elem, 'fadeIn');
    learnjs.flashElement(elem, "new text");
    expect(elem.text()).toEqual("new text");
    expect(elem.fadeOut).toHaveBeenCalled();
    expect(elem.fadeIn).toHaveBeenCalled();
  });

  it('can redirect to the main view after the last problem is answered', function() {
    var flash = learnjs.buildCorrectFlash(2);
    expect(flash.find('a').attr('href')).toEqual("");
    expect(flash.find('a').text()).toEqual("You're Finished!");
  });

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
      expect(view.find('.result span').text()).toEqual('Correct!');
    });
    it('reject an incorrect answer', ()=>{
      view.find('.answer').val('false');
      view.find('.check-btn').click();
      expect(view.find('.result').text()).toEqual('Incorrect!');
    });
  });
  describe('awsRefresh', function() {
    var callbackArg, fakeCreds;

    beforeEach(function() {
      fakeCreds = jasmine.createSpyObj('creds', ['refresh']);
      fakeCreds.identityId = 'COGNITO_ID';
      AWS.config.credentials = fakeCreds;
      fakeCreds.refresh.and.callFake(function(cb) { cb(callbackArg); });
    });

    it('returns a promise that resolves on success', function(done) {
      learnjs.awsRefresh().then(function(id) {
        expect(fakeCreds.identityId).toEqual('COGNITO_ID');
      }).then(done, fail);
    });

    it('rejects the promise on a failure', function(done) {
      callbackArg = 'error';
      learnjs.awsRefresh().fail(function(err) {
        expect(err).toEqual("error");
        done();
      });
    });
  });

  describe('profile view', function() {
    var view;
    beforeEach(function() {
      view = learnjs.profileView();
    });

    it('shows the users email address when they log in', function() {
      learnjs.identity.resolve({
        email: 'foo@bar.com'
      });
      expect(view.find('.email').text()).toEqual("foo@bar.com");
    });

    it('shows no email when the user is not logged in yet', function() {
      expect(view.find('.email').text()).toEqual("");
    });
  });

  describe('googleSignIn callback', function() {
    var user, profile;

    beforeEach(function() {
      profile = jasmine.createSpyObj('profile', ['getEmail']);
      var refreshPromise = new $.Deferred().resolve("COGNITO_ID").promise();
      spyOn(learnjs, 'awsRefresh').and.returnValue(refreshPromise);
      spyOn(AWS, 'CognitoIdentityCredentials');
      user = jasmine.createSpyObj('user',
          ['getAuthResponse', 'getBasicProfile']);
      user.getAuthResponse.and.returnValue({id_token: 'GOOGLE_ID'});
      user.getBasicProfile.and.returnValue(profile);
      profile.getEmail.and.returnValue('foo@bar.com');
      googleSignIn(user);
    });

    it('sets the AWS region', function() {
      expect(AWS.config.region).toEqual('us-east-1');
    });

    it('sets the identity pool ID and Google ID token', function() {
      expect(AWS.CognitoIdentityCredentials).toHaveBeenCalledWith({
        IdentityPoolId: learnjs.poolId,
        Logins: {
          'accounts.google.com': 'GOOGLE_ID'
        }
      });
    });

    it('fetches the AWS credentials and resolved the deferred', function(done) {
      learnjs.identity.done(function(identity) {
        expect(identity.email).toEqual('foo@bar.com');
        expect(identity.id).toEqual('COGNITO_ID');
        done();
      });
    });

    describe('refresh', function() {
      var instanceSpy;
      beforeEach(function() {
        AWS.config.credentials = {params: {Logins: {}}};
        var updateSpy = jasmine.createSpyObj('userUpdate', ['getAuthResponse']);
        updateSpy.getAuthResponse.and.returnValue({id_token: "GOOGLE_ID"});
        instanceSpy = jasmine.createSpyObj('instance', ['signIn']);
        instanceSpy.signIn.and.returnValue(Promise.resolve(updateSpy));
        var auth2Spy = jasmine.createSpyObj('auth2', ['getAuthInstance']);
        auth2Spy.getAuthInstance.and.returnValue(instanceSpy);
        window.gapi = { auth2: auth2Spy };
      });

      it('returns a promise when token is refreshed', function(done) {
        learnjs.identity.done(function(identity) {
          identity.refresh().then(function() {
            expect(AWS.config.credentials.params.Logins).toEqual({
              'accounts.google.com': "GOOGLE_ID"
            });
            done();
          });
        });
      });

      it('does not re-prompt for consent when refreshing the token in', function(done) {
        learnjs.identity.done(function(identity) {
          identity.refresh().then(function() {
            expect(instanceSpy.signIn).toHaveBeenCalledWith({prompt: 'login'});
            done();
          });
        });
      });
    });
  });
});