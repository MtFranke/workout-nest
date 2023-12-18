import {Injectable} from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService
{
  private accessToken: string | null = null;

  constructor(public jwtHelper: JwtHelperService) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    // You might want to persist it to localStorage for page reloads
    localStorage.setItem('access_token', token);
  }

  getAccessToken() {
    // Check if the token is available in memory, otherwise, retrieve it from localStorage
    return this.accessToken || localStorage.getItem('access_token');
  }
}
