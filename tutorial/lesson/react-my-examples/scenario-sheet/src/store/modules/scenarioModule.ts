import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const init = {
  copy1: 'それはすでに回収されたはずの魔法。',
  copy2: 'それはすでに改修されたはずの奇跡。',
  system: '魔導書大戦マギカロギア',
  title: 'その墓碑の名は',
  titleRuby: '                             ぼ    ひ            な',
  subTitle: 'Case of Accedia [cpitaph of XXXX]',
  pcNumber: 2,
  limit: 3,
  type: '協力型'
}
export type Scenario = typeof init

// actions と reducers の定義
const scenarioModule = createSlice({
  name: 'scenario',
  initialState: init,
  reducers: {
    update: (state, action: PayloadAction<Scenario>) => action.payload
  }
})

export const useScenario = () => {
  return useSelector(
    (state: { scenario: ReturnType<typeof scenarioModule.reducer> }) =>
      state.scenario
  )
}

export default scenarioModule
