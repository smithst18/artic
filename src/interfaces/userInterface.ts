import type { OfficeI } from './officeI'
import type { PositionI } from './positionI'
import type { RoleI } from './roleI'

export interface userI {
  id: number
  name: string
  ci: string
  role: RoleI
  email: string
  office: OfficeI
  position: PositionI
}
export interface userPayloadI {
  id: number
  name: string
  ci: string
  role: string
  email: string
}
