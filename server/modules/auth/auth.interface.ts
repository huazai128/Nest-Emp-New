export interface TokenInfo {
  access_token: string
  expires_in: number
}

export type LoginInfo = TokenInfo & any
