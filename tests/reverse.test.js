const reverse = require('../utils/for_testing').reverse

describe('reverse', () => {
  test('reverse of a', () => {
    const result = reverse('a')
    expect(result).toBe('a')
  })

  test('reverse of react', () => {
    const result = reverse('react')
    expect(result).toBe('tcaer')
  })

  test('reverse of releveler', () => {
    const result = reverse('releveler')
    expect(result).toBe('releveler')
  })

  test('reverse of I like react!', () => {
    const result = reverse('I like react!')
    expect(result).toBe('!tcaer ekil I')
  })
})

/**
 * From https://jestjs.io/docs/api#1-testeachtablename-fn-timeout
 */
describe('reverse with ".each"', () => {
  test.each([
    ['be', 'eb'],
    ['', ''],
    ['ZZZ', 'ZZZ'],
    ['12345', '54321']
  ])('reverse of "%s"', (str, expected) => {
    expect(reverse(str)).toBe(expected)
  })
  // Or more readable (wrapped in an object)
  test.each([
    { str: '', expected: '' },
    { str: 'aa', expected: 'aa' },
    { str: 'Awesome!', expected: '!emosewA' },
  ])('reverse of "$str"', ({ str, expected }) => {
    expect(reverse(str)).toBe(expected)
  })
})
