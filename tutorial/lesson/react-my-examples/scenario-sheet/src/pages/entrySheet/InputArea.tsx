import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import entrySheetModule, {
  useEntrySheet,
  EntrySheet
} from '../../store/modules/entrySheetModule'

const InputField: React.FC<{
  entrySheet: EntrySheet
  type: string
  prop: string
  labelText: string
  changeHandler: any
}> = ({ entrySheet, type, prop, labelText, changeHandler }) => (
  <label>
    {labelText}
    <input type={type} value={entrySheet[prop]} onChange={changeHandler} />
  </label>
)

const InputArea: React.FC = () => {
  const entrySheet = useEntrySheet()
  const dispatch = useDispatch()
  const { update } = entrySheetModule.actions

  if (!entrySheet) {
    return <div>読込失敗</div>
  }
  return (
    <>
      <InputField
        entrySheet={entrySheet}
        type="text"
        prop="system"
        labelText="システム"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, system: e.target.value }))
        }
      />
      <InputField
        entrySheet={entrySheet}
        type="text"
        prop="title"
        labelText="シナリオタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, title: e.target.value }))
        }
      />
      <InputField
        entrySheet={entrySheet}
        type="text"
        prop="theme1"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme1: e.target.value }))
        }
      />
      <InputField
        entrySheet={entrySheet}
        type="text"
        prop="theme2"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme2: e.target.value }))
        }
      />
      <InputField
        entrySheet={entrySheet}
        type="text"
        prop="theme3"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme3: e.target.value }))
        }
      />

      <InputField
        entrySheet={entrySheet}
        type="number"
        prop="pcNumberMin"
        labelText="最小PC人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, pcNumberMin: Number(e.target.value) })
          )
        }
      />
      <InputField
        entrySheet={entrySheet}
        type="number"
        prop="pcNumberBest"
        labelText="最適PC人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, pcNumberBest: Number(e.target.value) })
          )
        }
      />
    </>
  )
}

export default InputArea
