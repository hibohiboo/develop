import React from 'react'
import { useEntrySheet } from '../../store/modules/entrySheetModule'
import { Stage, Layer, Rect, Text, Line, Image } from 'react-konva'
import URLImage from '../components/atoms/URLImage'

const ImageArea: React.FC = () => {
  const entrysheet = useEntrySheet()

  if (!entrysheet) {
    return <div></div>
  }
  const canvasWidth = 800
  const canvasHight = 1130
  const leftPadding = 215
  const inputWidth = canvasWidth - leftPadding
  const fontSize = { system: 25, title: 80, titleRuby: 40, subTitle: 30 }
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
  }

  return (
    <Stage width={canvasWidth} height={canvasHight}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHight}
          fill={'#000'}
        />
        <URLImage src="/images/backgrounds/entrysheet.png" x={0} y={0} />
        <Text
          x={leftPadding}
          y={65}
          width={inputWidth}
          align="left"
          text={entrysheet.system}
          fill="#000"
          fontFamily={family.gothic}
          fontSize={fontSize.system}
        />
        <Text
          x={leftPadding}
          y={120}
          width={inputWidth}
          align="left"
          text={entrysheet.title}
          fill="#000"
          fontFamily={family.gothic}
          fontSize={fontSize.system}
        />
        <Text
          x={leftPadding}
          y={170}
          width={inputWidth}
          align="left"
          text={entrysheet.gmName}
          fill="#000"
          fontFamily={family.gothic}
          fontSize={fontSize.system}
        />
        <Text
          x={leftPadding + (entrysheet.isExtend === 1 ? 0 : 80)}
          y={215}
          width={inputWidth}
          align="left"
          text={'✔'}
          fill="#000"
          fontFamily={family.gothic}
          fontSize={fontSize.system}
        />
      </Layer>
    </Stage>
  )
}

export default ImageArea
