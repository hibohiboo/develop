import * as dateUtility from '@/lambda/utilities/dateUtility'
import { addHours } from 'date-fns'

describe('format', () => {
  test('日時が正しい場合', () => {
    const date = dateUtility.parseISO('2000-01-01')
    const x = dateUtility.formatISO(date)
    expect(x).toEqual('2000-01-01T00:00:00')
  })
  test('zonedTimeToUtc', () => {
    // UTC環境だと "1999-12-31T15:00:00Z"になってしまう
    // const date = zonedTimeToUtc('2000-01-01', 'Asia/Tokyo')
    const date = dateUtility.parseISO('2000-01-01')
    const x = dateUtility.formatISOUTC(date)
    // formatISO(date)だと、ローカルでは"2000-01-01T00:00:00+09:00"になってしまう
    expect(x).toEqual('2000-01-01T00:00:00Z')
  })
  test('日本時間に変更して表示', () => {
    const date = dateUtility.parseISO('2000-01-01')
    const x = dateUtility.formatISO(addHours(date, 9))

    expect(x).toEqual('2000-01-01T09:00:00')
  })
})

