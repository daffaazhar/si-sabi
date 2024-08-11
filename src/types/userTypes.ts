export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  PENYELIA = 'PENYELIA',
  STAFF = 'STAFF'
}

export type UserType = {
  id?: string
  name?: string
  email?: string
  role?: string
  password?: string
}
