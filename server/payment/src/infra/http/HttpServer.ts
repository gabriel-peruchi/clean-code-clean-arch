export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
export type HttpCallback = (params: any, bod: any) => Promise<any>

export interface HttpServer {
  listen(port: number): void
  on(method: HttpMethod, url: string, callback: HttpCallback): void
}