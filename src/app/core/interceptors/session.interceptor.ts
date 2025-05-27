import type { HttpInterceptorFn } from "@angular/common/http"

export const sessionInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add the session header for schedule API requests
  if (req.url.includes("/api/schedule")) {
    const timestamp = new Date().getTime()
    const studentId = req.body && (req.body as any).studentId ? (req.body as any).studentId : ""

    // Simple encryption: base64 encode of timestamp + studentId
    const sessionId = btoa(`${timestamp}:${studentId}`)

    const modifiedReq = req.clone({
      setHeaders: {
        sessionID: sessionId,
      },
    })

    return next(modifiedReq)
  }

  return next(req)
}
