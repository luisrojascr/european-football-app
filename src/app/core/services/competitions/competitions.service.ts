import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../../../config/api-config';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  private readonly getCompetitionsPath = `${API_CONFIG.basePath}/competitions`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': API_CONFIG.xAuthToken,
      'X-Response-Control': API_CONFIG.xResponseControl
    })
  };

  constructor(private readonly http: HttpClient) {}

  public getCompetitions(params?: number): Observable<any> {
    const urlPath = params ? `${this.getCompetitionsPath}/${params}` : this.getCompetitionsPath;

    return this.http.get(urlPath, this.httpOptions).pipe(
      timeout(API_CONFIG.httpTimeout),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getCompetitionStandings(params: number): Observable<any> {
    return this.http.get(`${this.getCompetitionsPath}/${params}/standings`, this.httpOptions).pipe(
      timeout(API_CONFIG.httpTimeout),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getCompetitionTeams(params: number): Observable<any> {
    return this.http.get(`${this.getCompetitionsPath}/${params}/teams`, this.httpOptions).pipe(
      timeout(API_CONFIG.httpTimeout),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getTeam(params: number): Observable<any> {
    return this.http.get(`${API_CONFIG.basePath}/teams/${params}`, this.httpOptions).pipe(
      timeout(API_CONFIG.httpTimeout),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getTeamMatches(params: number): Observable<any> {
    return this.http.get(`${API_CONFIG.basePath}/teams/${params}/matches`, this.httpOptions).pipe(
      timeout(API_CONFIG.httpTimeout),
      catchError((ex) => throwError('error: ', ex))
    );
  }
}
