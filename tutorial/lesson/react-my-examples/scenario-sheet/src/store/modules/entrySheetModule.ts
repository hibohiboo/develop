import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initEntrySheet = {
  system: 'LOSTRPG ～廃墟の森の子供たち～',
  title: '廃ビル断崖の冒険',
  theme1: '廃墟',
  theme2: '友情',
  theme3: 'スリル',
  pcNumberMin: 2,
  pcNumberBest: 4,
  pcNumberMax: 5,
  serious: 3, // 1: 必須、2:必須ではないが重視, 3: あると嬉しい, 4: 不要
  role: 3, // 1: 必須、2:必須ではないが重視, 3: あると嬉しい, 4: 不要
  diceFace: 6,
  diceNumber: 2,
  requiredRule: false,
  other: '',
  charMake: 1, // 1: サンプルキャラあり、2:持ちみ可
  charOther: '', // 備考
  trpgBeginer: 4, // TRPG初心者x人まで
  systemBeginer: 4, // システム初心者x任まで
  ruleBook: 4,
  summary: 4,
  equipOther: '', // 準備その他
  free: '' // 自由記入欄
}
export type EntrySheet = typeof initEntrySheet
const init = { entrySheet: initEntrySheet, pdfBase64: '' }

// actions と reducers の定義
const entrySheetModule = createSlice({
  name: 'entrySheet',
  initialState: init,
  reducers: {
    update: (state, action: PayloadAction<EntrySheet>) => {
      state.entrySheet = action.payload
      state.pdfBase64 = ''
    },
    setPdf: (state, action: PayloadAction<string>) => {
      state.pdfBase64 = action.payload
    }
  }
})

export const useEntrySheet = () => {
  return useSelector(
    (state: { entrySheet: ReturnType<typeof entrySheetModule.reducer> }) =>
      state.entrySheet.entrySheet
  )
}

export const usePdf = () => {
  return useSelector(
    (state: { entrySheet: ReturnType<typeof entrySheetModule.reducer> }) =>
      state.entrySheet.pdfBase64
  )
}

export default entrySheetModule
