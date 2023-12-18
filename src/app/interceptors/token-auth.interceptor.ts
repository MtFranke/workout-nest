import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const httpTokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor works!');
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  }else{
    console.log('No token found.')
  }
    return next(req);
};
