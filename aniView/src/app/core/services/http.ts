import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { appConfig } from './../../app.config';
import { Subject } from 'rxjs/Subject';
import { CryptoService } from './crypto.service';

@Injectable()
export class HttpService extends Http {
  public loading = new Subject<{ loading: boolean, hasError: boolean, hasMsg: string }>();
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, public crypto: CryptoService) { super(backend, defaultOptions); }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: any) => {
        this.onSubscribeSuccess(res);
        var body: any = JSON.parse(res._body);
        var data: any = this.crypto.decryptData(body.data);
        body.data = data;
        res._body = { "result": body };
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    // const data = body;
    const data = this.crypto.encryptData(body);
    return super.post(this.getFullUrl(url), { data }, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: any) => {
        this.onSubscribeSuccess(res);
        var body: any = JSON.parse(res._body);
        var data: any = this.crypto.decryptData(body.data);
        body.data = data;
        res._body = { "result": body };

      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    // const data = body;
    const data = this.crypto.encryptData(body);
    return super.patch(this.getFullUrl(url), { data }, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: any) => {
        this.onSubscribeSuccess(res);
        var body: any = JSON.parse(res._body);
        var data: any = this.crypto.decryptData(body.data);
        body.data = data;
        res._body = { "result": body };

      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    // const data = body;
    const data = this.crypto.encryptData(body);
    return super.put(this.getFullUrl(url), { data }, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: any) => {
        this.onSubscribeSuccess(res);
        var body: any = JSON.parse(res._body);
        var data: any = this.crypto.decryptData(body.data);
        body.data = data;
        res._body = { "result": body };
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: any) => {
        this.onSubscribeSuccess(res);
        var body: any = JSON.parse(res._body);
        var data: any = this.crypto.decryptData(body.data);
        body.data = data;
        res._body = { "result": body };
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions({ withCredentials: true });
    }
    if (options.headers == null) {
      options.headers = new Headers({
        'Content-Type': 'application/json',
        // 'Authorization': 'JWT ' + user.token,
      });
    }
    return options;
  }

  public checkCookie(key) {
    let returnData: any;
    returnData = this.getCookie(key);
    if (returnData == false || Object.keys(returnData).length == 0) {
      return false;
    }
    return true;
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '/') {

    value = this.crypto.encryptData(value);
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;
    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        let c_data = c.substring(cookieName.length, c.length)
        return this.crypto.decryptData(c_data);
      }
    }
    return '';
  }
  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }
  private getFullUrl(url: string): string {
    return appConfig.apiUrl + url;
  }
  private requestInterceptor(): void {
    this.loading.next({
      loading: true, hasError: false, hasMsg: ''
    });
  }
  private responseInterceptor(): void {
    this.loading.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.of(error);
  }
  private onSubscribeSuccess(res: any): void {
    this.loading.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }
  private onSubscribeError(error: any): void {
    this.loading.next({
      loading: false, hasError: true, hasMsg: 'Something went wrong'
    });
  }
  private onFinally(): void {
    this.responseInterceptor();
  }
  public localStorageUserdata() {
    if (localStorage.getItem('user')) {
      return localStorage.getItem('user');
    }
    return false;
  }

}
