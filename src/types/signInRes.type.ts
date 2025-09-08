
export interface signInResponseType {
  error: string | null
  status: number
  ok: boolean
  url: string | null
}
export interface User {
  name: string
  email: string
  role: string
}