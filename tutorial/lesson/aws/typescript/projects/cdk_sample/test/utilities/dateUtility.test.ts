import * as dateUtility from '@/lambda/utilities/dateUtility'

describe('format', () => {
  test('日時が正しい場合', () => {
    const date = dateUtility.parseISO('2000-01-01')
    const x = dateUtility.formatISO(date)
    expect(x).toEqual('2000-01-01T00:00:00')
  })
})

