import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../../../config/api-config';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  private readonly getCompetitionsPath = `${API_CONFIG.basePath}/competitions`;

  constructor(private readonly http: HttpClient) {}

  public getCompetitions(params?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': 'd9b2c29baac94818a4908116a55d6f08',
        'X-Response-Control': 'full'
      })
    };

    const urlPath = params ? `${this.getCompetitionsPath}/${params}` : this.getCompetitionsPath;

    return this.http.get(urlPath, httpOptions).pipe(
      timeout(60000),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getCompetitionStandings(params?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': 'd9b2c29baac94818a4908116a55d6f08',
        'X-Response-Control': 'full'
      })
    };

    return this.http.get(`${this.getCompetitionsPath}/${params}/standings`, httpOptions).pipe(
      timeout(60000),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getCompetitionTeams(params?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': 'd9b2c29baac94818a4908116a55d6f08',
        'X-Response-Control': 'full'
      })
    };

    return this.http.get(`${this.getCompetitionsPath}/${params}/teams`, httpOptions).pipe(
      timeout(60000),
      catchError((ex) => throwError('error: ', ex))
    );
  }

  public getTeam(params?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': 'd9b2c29baac94818a4908116a55d6f08',
        'X-Response-Control': 'full'
      })
    };

    return this.http.get(`${API_CONFIG.basePath}/teams/${params}`, httpOptions).pipe(
      timeout(60000),
      catchError((ex) => throwError('error: ', ex))
    );
  }
}
