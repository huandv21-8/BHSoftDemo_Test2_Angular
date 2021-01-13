import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, switchMap, take, filter, finalize} from 'rxjs/operators';
import {AuthServiceService} from './service/auth-service.service';
import {LoginResponse} from './dto/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthServiceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken();   //lấy token thằng đang login

    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
       // lỗi 403 là do chúng tôi có mã thông báo đã hết hạn ko có quyền truy cập mà chúng tôi cần làm mới.
        if (error instanceof HttpErrorResponse && error.status === 403) {  //neu bao loi truy cập thì có thể login hoặc làm mới token
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(error);
        }
      }));
    }
    return next.handle(req);
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;

      //Đặt refreshTokenSubject thành null để các lệnh gọi API tiếp theo sẽ đợi cho đến khi mã thông báo mới được truy xuất
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(     // lam moi token
        switchMap((refreshTokenResponse: LoginResponse) => {
          // this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
        }),

        // Khi lệnh gọi refreshToken hoàn tất, chúng tôi đặt lại isTokenRefreshing thành false
        // cho lần tiếp theo mã thông báo cần được làm mới
        finalize(() => this.isTokenRefreshing = false)

      );
    } else {
      // Nếu isTokenRefreshing là true, chúng ta sẽ đợi cho đến khi refreshTokenSubject có giá trị không phải null
      // có nghĩa là mã thông báo mới đã sẵn sàng và chúng tôi có thể thử lại yêu cầu một lần nữa
      return this.refreshTokenSubject.pipe(filter(result => result !== null), take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req, this.authService.getJwtToken()));
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization','Bearer ' + jwtToken)
    });
  }

}
