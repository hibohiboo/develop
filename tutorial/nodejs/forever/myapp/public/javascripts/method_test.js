(function(){
  const message = document.getElementById('message');
  // イベント設定
  document.getElementById('get'   ).addEventListener('click', ()=>{httpTest('GET')});
  document.getElementById('post'  ).addEventListener('click', ()=>{httpTest('POST')});
  document.getElementById('put'   ).addEventListener('click', ()=>{httpTest('PUT')});
  document.getElementById('delete').addEventListener('click', ()=>{httpTest('DELETE')});
  ['head',     'trace',     'copy',        'lock',   'mkcol',     'move', 
   'purge',    'propfind',  'proppatch',   'unlock', 'report',    'mkactivity',
   'checkout', 'merge',     'm-search',    'notify', 'subscribe', 'unsubscribe', 
   'patch',    'search',    'connect'
  ].forEach(_method=>{
		  // ※ HEAD以外はXMLHttpRequestで非サポート
      document.getElementById(_method).addEventListener('click', ()=>{httpTest(_method)});
  });

	function httpTest(method){
		const request = new XMLHttpRequest();
		request.open(method, 'method_test', false);
		request.send();
		if (request.status === 200) {
			console.log(request);
			message.textContent = request.responseText;
		}
	}
})();