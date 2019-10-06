<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  こんにちは
@if (Auth::check())
    {{ \Auth::user()->name }}さん<br />
    <a href="/auth/logout">ログアウト</a>
@else
    ゲストさん<br />
    <a href="/auth/login">ログイン</a><br />
    <a href="/auth/register">会員登録</a>
@endif
</body>
</html>