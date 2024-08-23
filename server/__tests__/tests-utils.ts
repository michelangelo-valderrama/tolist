import cookie from 'cookie'

export function getCookiesFromHeader(
  header: string[] | undefined,
  options?: cookie.CookieParseOptions
) {
  let cookies = Object.create(null)

  if (!header) return cookies

  for (const cookieStr of header) {
    cookies = { ...cookies, ...cookie.parse(cookieStr, options) }
  }

  return cookies
}
