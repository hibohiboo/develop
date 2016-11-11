" 文字コード
set encoding=utf-8                            " ファイル読み込み時の文字コードの設定
scriptencoding utf-8                          " Vim script内でマルチバイト文字を使う場合の設定
set fileencoding=utf-8                        " 保存時の文字コード
set fileencodings=ucs-boms,utf-8,euc-jp,cp932 " 読み込み時の文字コードの自動判別. 左側が優先される
set fileformats=unix,dos,mac                  " 改行コードの自動判別. 左側が優先される
set ambiwidth=double                          " □や○文字が崩れる問題を解決

" タブ・インデント
set expandtab     " タブ入力を複数の空白入力に置き換える
set tabstop=2     " 画面上でタブ文字が占める幅
set softtabstop=2 " 連続した空白に対してタブキーやバックスペースキーでカーソルが動く幅
set autoindent    " 改行時に前の行のインデントを継続する
set smartindent   " 改行時に前の行の構文をチェックし次の行のインデントを増減する
set shiftwidth=2  " smartindentで増減する幅

" 文字列検索
set incsearch  " インクリメンタルサーチ. １文字入力毎に検索を行う
set ignorecase " 検索パターンに大文字小文字を区別しない
set smartcase  " 検索パターンに大文字を含んでいたら大文字小文字を区別する
set hlsearch   " 検索結果をハイライト
" ESCキー2度押しでハイライトの切り替え
nnoremap <silent><Esc><Esc> :<C-u>set nohlsearch!<CR>

" カーソル
" set whichwrap=b,s,h,l,<,>,[,],~  " カーソルの左右移動で行末から次の行の行頭への移動が可能になる
set number                       " 行番号を表示
set cursorline                   " カーソルラインをハイライト
" 行が折り返し表示されていた場合、行単位ではなく表示行単位でカーソルを移動する
nnoremap j gj
nnoremap k gk
nnoremap <down> gj
nnoremap <up> gk
" バックスペースキーの有効化
set backspace=indent,eol,start

" カッコ・タグジャンプ
set showmatch                         " 括弧の対応関係を一瞬表示する
source $VIMRUNTIME/macros/matchit.vim " Vimの「%」を拡張する

" コマンド補完
set wildmenu     " コマンドモードの補完
set history=5000 " 保存するコマンド履歴の数

" マウスの有功化
if has('mouse')
    set mouse=a
    if has('mouse_sgr')
        set ttymouse=sgr
    elseif v:version > 703 || v:version is 703 && has('patch632')
        set ttymouse=sgr
    else
        set ttymouse=xterm2
    endif
endif

" クリップボードからペーストする時だけインデントしないようにする
if &term =~ "xterm"
    let &t_SI .= "\e[?2004h"
    let &t_EI .= "\e[?2004l"
    let &pastetoggle = "\e[201~"

    function XTermPasteBegin(ret)
        set paste
        return a:ret
    endfunction

    inoremap <special> <expr> <Esc>[200~ XTermPasteBegin("")
endif

"----------------------------------------------------------
" インストール
"----------------------------------------------------------
" 末尾の全角と半角の空白文字を赤くハイライト
:packadd vim-trailing-whitespace
