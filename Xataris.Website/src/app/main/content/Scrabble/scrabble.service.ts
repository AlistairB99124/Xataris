import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as models from './scrabble.models';
import { ApiResult } from '../../../core/models/sharedModels';

@Injectable()
export class ScrabbleApiService {

    constructor(private http: HttpClient) {

    }

    saveBoard = (input) => this.http.post<models.SimpleResult>('https://api.xataris.co.uk/api/Scrabble/SaveBoard', input).toPromise();

    getBoard = () => this.http.post<any>('https://api.xataris.co.uk/api/Scrabble/GetBoard', null).toPromise();

    saveGame = (input) => this.http.post<any>('https://api.xataris.co.uk/api/Scrabble/SaveGame', input).toPromise();

    getGames = () => this.http.post<ApiResult<Array<models.ScrabbleGame>>>('https://api.xataris.co.uk/api/Scrabble/GetGames', null).toPromise();

    startNewGame = (input) => this.http.post<ApiResult<models.ScrabbleGame>>('https://api.xataris.co.uk/api/Scrabble/StartNewGame', input).toPromise();

    getAllPlayers = () => this.http.post<any>('https://api.xataris.co.uk/api/Scrabble/GetAllPlayers', null).toPromise();
}
