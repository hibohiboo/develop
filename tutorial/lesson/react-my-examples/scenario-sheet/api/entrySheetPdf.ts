import { NextApiRequest, NextApiResponse } from 'next'
import { EntrySheet } from '../src/store/modules/entrySheetModule'
import { createPdfBinary } from './utils/pdf'

const createDocDefinition = (sheet: EntrySheet) => {
  const titleSetting = {
    fillColor: '#000',
    color: '#fff',
    fontSize: 18,
    lineHeight: 1.1,
    bold: true,
  }
  const hdWidth = 130
  return {
    content: [
      {
        text: 'GMエントリーシートVer2.00    TRPGサークル  とらいあど    ',
        margin: [0, 0, 0, 5],
        fontSize: 12,
        alignment: 'right',
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ①システム名',
              },
              sheet.system,
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth, '*'],
          body: [
            [
              {
                ...titleSetting,
                text: ' ②シナリオ名',
              },
              sheet.title,
            ],
          ],
        },
      },
      {
        style: 'tables',
        table: {
          widths: [hdWidth * 2, '*'],
          body: [
            [
              {
                style: 'tables',
                table: {
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ③GM名',
                      },
                      sheet.gmName,
                    ],
                  ],
                },
              },
              {
                rowSpan: 3,
                table: {
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ⑥テーマ',
                        rowSpan: 3,
                      },
                      sheet.theme1,
                    ],
                    ['', sheet.theme2],
                    ['', sheet.theme3],
                  ],
                },
              },
            ],
            [
              {
                table: {
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ④延長',
                      },
                      `${sheet.isExtend === 1 ? '■あり □なし' : '□あり ■なし'}`,
                    ],
                  ],
                },
              },
              '',
            ],
            [
              {
                table: {
                  widths: [hdWidth, '*'],
                  body: [
                    [
                      {
                        ...titleSetting,
                        text: ' ⑤PL人数',
                      },
                      {
                        stack: [
                          { text: '最少  ～最適～ 最大', fontSize: 10 },
                          {
                            text: `${sheet.pcNumberMin}人～    ${sheet.pcNumberBest}人~     ${sheet.pcNumberMax}人`,
                            fontSize: 10,
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
              '',
            ],
          ],
        },
        layout: 'noBorders',
      },
    ],
    styles: {
      tables: {
        margin: [0, 0, 0, 2],
      },
    },
    defaultStyle: {
      font: 'IPAGothic',
      fontSize: 16,
      alignment: 'left',
      // a string or { width: number, height: number }
      pageSize: 'A4',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [5, 5, 5, 5],
    },
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const docDefinition = createDocDefinition(req.body)
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/json')

    res.status(200).send(binary)
  })
}
