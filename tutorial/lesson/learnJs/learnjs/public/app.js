'use strict';
const learnjs = {
  poolId: 'us-east-1:6c68560f-6729-4443-b598-c7aadf77d2ca'
};

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

learnjs.flashElement = (elem, content)=>{
  elem.fadeOut('fast', ()=>{
    elem.html(content);
    elem.fadeIn();
  });
}

learnjs.template = (name)=>{
  return $('.templates .'+name).clone();
}

learnjs.trrigerEvent = (name, args)=>{
  $('.view-container>*').trigger(name, args);
}

learnjs.buildCorrectFlash = (problemNum)=>{
  const correctFlash = learnjs.template('correct-flash');
  const link = correctFlash.find('a');
  const view = learnjs.template('problem-view');

  if(problemNum < learnjs.problems.length){
    link.attr('href', '#problem-' + (problemNum + 1));
  }else{
    link.attr('href', '');
    link.text("You're Finished!")
  }
  return correctFlash;
}

learnjs.landingView = ()=>{
  return learnjs.template('landing-view');
}

learnjs.problemView = (data)=>{
  const problemNumber = parseInt(data, 10);
  const title = 'Problem #' + problemNumber;
  const view = learnjs.template('problem-view');
  const problemData = learnjs.problems[problemNumber-1];
  const resultFlash = view.find('.result');

  function checkAnswer(){
    const answer = view.find('.answer').val();
    const test = problemData.code.replace('__', answer) + '; problem();';
    return eval(test);
  }

  function checkAnswerClick(){

    if(checkAnswer()){
      const correctFlash = learnjs.buildCorrectFlash(problemNumber);
      learnjs.flashElement(resultFlash, correctFlash);
      return false;
    }

    learnjs.flashElement( resultFlash, 'Incorrect!');
    return false;
  }

  if(problemNumber < learnjs.problems.length){
    const buttonItem = learnjs.template('skip-btn');
    buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
    $('.nav-list').append(buttonItem);
    view.bind('removingView', function(){
      buttonItem.remove();
    });
  }

  view.find('.check-btn').on('click', checkAnswerClick);
  view.find('.title').text(title);
  learnjs.applyObject(problemData, view);

  return view;
}

learnjs.identity = new $.Deferred();

learnjs.profileView=()=>{
  const view = learnjs.template('profile-view');
  learnjs.identity.done(function(identity){
    view.find('.email').text(identity.email);
  });
  return view;
}

learnjs.showView = function(hash){
  const routes = {
    '#problem' : learnjs.problemView,
    '#':learnjs.landingView,
    '#profile': learnjs.profileView,
    '':learnjs.landingView
  };
  const hashParts = hash.split('-');
  const viewFn = routes[hashParts[0]];
  if(!viewFn){
    return;
  }
  learnjs.trrigerEvent('removingView', []);
  $('.view-container').empty().append(viewFn(hashParts[1]));
}

learnjs.addProfileLink = (profile)=>{
  const link = learnjs.template('profile-link');
  link.find('a').text(profile.email);
  $('.signin-bar').prepend(link);
}

learnjs.appOnReady = ()=>{
  // イベントハンドラの登録
  window.onhashchange = ()=>{
    learnjs.showView(window.location.hash);
  }
  learnjs.showView(window.location.hash);
  learnjs.identity.done(learnjs.addProfileLink)
};

learnjs.awsRefresh = ()=>{
  const defered = new $.Deferred();
  AWS.config.credentials.refresh(function(err){
    if(err){
      defered.reject(err);
      return;
    }

    return defered.resolve(AWS.config.credentials.identityId);
  });
  return defered.promise();
}



function googleSignIn(googleUser){
  console.log(arguments);
  const id_token = googleUser.getAuthResponse().id_token;
  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: learnjs.poolId,
      Logins: {
        'accounts.google.com': id_token
      }
    })
  });
  learnjs.awsRefresh().then(function(id){
    learnjs.identity.resolve({
      id: id,
      email: googleUser.getBasicProfile().getEmail(),
      refresh: refresh
    });
  });
}

function refresh(){
  return gapi.auth2.getAuthInstance().signIn({
    prompt: 'login'
  }).then(function(userUpdate){
    const creds = AWS.config.credentials;
    const newToken = userUpdate.getAuthResponse.id_token;
    creds.params.Logins['accounts.google.com'] = newToken;
    return learnjs.awsRefresh();
  })
}