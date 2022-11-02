// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-namespace
declare namespace API {
  type LoginRequest = {
    username: string,
    password: string,
  }

  type UserInfo = {
    id: bigint,
    username: string,
    menu: any
  }
}
