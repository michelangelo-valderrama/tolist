import { env } from '@/config/env.config'

type FecthInput = RequestInfo
type FecthBody = object | undefined

const API_URL = env.API_URL
const headers = {
  'Content-Type': 'application/json'
}

export interface FecthResponse<T extends object> {
  message: string
  data: T
}

const fecthInput = (input: FecthInput) => `${API_URL}${input}`

export async function GET<T extends object>(
  input: FecthInput
): Promise<FecthResponse<T>> {
  const resp = await fetch(fecthInput(input), {
    method: 'GET'
  })
  const data: FecthResponse<T> = await resp.json()
  if (!resp.ok) throw new Error(data.message ?? resp.statusText)
  return data
}

export async function POST<T extends object>(
  input: FecthInput,
  body: FecthBody
): Promise<FecthResponse<T>> {
  const resp = await fetch(fecthInput(input), {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  const data: FecthResponse<T> = await resp.json()
  if (!resp.ok) throw new Error(data.message ?? resp.statusText)
  return data
}

export async function PUT<T extends object>(
  input: FecthInput,
  body: FecthBody
): Promise<FecthResponse<T>> {
  const resp = await fetch(fecthInput(input), {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  })
  const data: FecthResponse<T> = await resp.json()
  if (!resp.ok) throw new Error(data.message ?? resp.statusText)
  return data
}

export async function DELETE<T extends object>(
  input: FecthInput
): Promise<FecthResponse<T>> {
  const resp = await fetch(fecthInput(input), {
    method: 'DELETE'
  })
  const data: FecthResponse<T> = await resp.json()
  if (!resp.ok) throw new Error(data.message ?? resp.statusText)
  return data
}
