import 'moment/locale/ja'
import moment from 'moment'
// 初回時にロケールの背帝が必要となる。全体では一度読み込んだものを使いまわす。
moment.locale('ja')
export default moment
