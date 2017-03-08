(function(){
  const message = document.getElementById('message');
  // イベント設定
  document.getElementById('get'   ).addEventListener('click', ()=>{httpTest('GET')});
  document.getElementById('post'  ).addEventListener('click', ()=>{httpTest('POST')});
  document.getElementById('put'   ).addEventListener('click', ()=>{httpTest('PUT')});
  document.getElementById('delete').addEventListener('click', ()=>{httpTest('DELETE')});

	function httpTest(method){
		const request = new XMLHttpRequest();
		request.open(method, 'method_test', false);
		request.send();
		if (request.status === 200) {
			console.log(request.responseText);
			message.textContent = request.responseText;
		}
	}
})();