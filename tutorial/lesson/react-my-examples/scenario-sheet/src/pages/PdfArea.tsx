import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import scenarioModule, {
  useScenario,
  usePdf
} from '../store/modules/scenarioModule'

const makePdf = async (dispatch) => {
  const pdf = await (await fetch('/api/pdf')).text()
  console.log(pdf)
  dispatch(scenarioModule.actions.setPdf(pdf))
}

const PdfArea: React.FC = () => {
  const scenario = useScenario()
  const pdf = usePdf()
  const dispatch = useDispatch()

  if (!scenario) {
    return <div>読込失敗</div>
  }
  return (
    <>
      <button onClick={(e) => makePdf(dispatch)}>PDFを作る</button>
      {pdf !== '' && (
        <a href={pdf} download="scenario.pdf">
          作成したPDFをダウンロード
        </a>
      )}
    </>
  )
}

export default PdfArea
