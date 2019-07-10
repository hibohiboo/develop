document.addEventListener("DOMContentLoaded", () => {
  // formのsubmit時の動作を定義する
  document.getElementById("comment-form").onsubmit = () => {
    // コメントを入力するinputを取得する
    const commentInput = document.getElementById("comment-input");

    if (commentInput.value === "") {
      // コメントが入力されていない場合は何もしない
      return false;
    }

    // 入力されたコメントを元に、li要素を作成
    const newComment = document.createElement("li");

    // 作成したli要素をDOMに挿入する
    newComment.innerText = commentInput.value;
    document.getElementById("comments").appendChild(newComment);

    // コメント入力のinputは空にしておく
    commentInput.value = "";
    return false;
  };
});
