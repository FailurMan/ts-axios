import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  test('is Cookie', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })
  test('Cookie name is not exist should return null', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
