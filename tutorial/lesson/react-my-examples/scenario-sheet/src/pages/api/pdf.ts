import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import * as PdfPrinter from 'pdfmake'

type Data = {
  name: string
}
function createPdfBinary(pdfDoc, callback) {
  const gPath = path.join('src', 'pages', 'api', 'fonts', 'ipaexg.ttf')
  const fontDescriptors = {
    Serif: {
      normal: path.join(__dirname, '/fonts/ipaexm.ttf')
    },
    IPAGothic: {
      normal: gPath,
      bold: gPath,
      italics: gPath,
      bolditalics: gPath
    }
  }
  const printer = new PdfPrinter(fontDescriptors)
  const doc = printer.createPdfKitDocument(pdfDoc)

  const chunks = []

  doc.on('data', function(chunk) {
    chunks.push(chunk)
  })
  doc.on('end', function() {
    const result = Buffer.concat(chunks)
    callback('data:application/pdf;base64,' + result.toString('base64'))
  })
  doc.end()
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ name: 'John Doe' })
  const docDefinition = {
    content: 'This is an sample PDF printed with pdfMake 日本語 てすと',
    defaultStyle: {
      font: 'IPAGothic'
    }
  }
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/json')

    res.status(200).send(binary)
  })
}
