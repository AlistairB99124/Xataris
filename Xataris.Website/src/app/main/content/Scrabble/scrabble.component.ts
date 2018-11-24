import { Component, OnInit, EventEmitter } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { ScrabbleApiService } from './scrabble.service';
import { MatSelectionListChange } from '@angular/material';

import { Board, Tile, Type, Block, Player, InitialBoard } from './scrabble.models';
import { ScrabbleWords  } from './scrabble.words';

import * as models from './scrabble.models';

import { TranslateService } from '@ngx-translate/core';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

import * as _ from 'lodash';

@Component({
    selector   : 'fuse-scrabble',
    templateUrl: './scrabble.component.html',
    styleUrls  : ['./scrabble.component.scss']
})
export class ScrabbleComponent implements OnInit
{
    data: Board;
    constructor(
        private scrabbleApiService: ScrabbleApiService,
        private translationLoader: FuseTranslationLoaderService,
        private translateService: TranslateService) {
        this.translationLoader.loadTranslations(english, french);
        this.setupVariables();
    }

    startNewGame = async (drawer) => {
        this.data.gameActive = false;
        this.data.loading = true;
        const game = await this.scrabbleApiService.startNewGame({
            name: this.data.name,
            playerOne: this.data.selectedPlayers[0].id,
            playerTwo: this.data.selectedPlayers[1].id,
            board: JSON.stringify(new models.InitialBoard().board),
            blocks: JSON.stringify(new models.InitialBlocks().blocks)
        });
        this.data.gameActive = true; 
        this.data.loading = false;      
        this.data.board = game.data.board;
        this.data.playerOne = <Player>{
                tray: JSON.parse(game.data.playerOne.tray),
                userId: game.data.playerOne.userId,
                id: game.data.playerOne.id,
                points: 0,
                gameId: game.data.playerOne.gameId,                
            };
        this.data.playerTwo = <Player>{
            tray: JSON.parse(game.data.playerTwo.tray),
            userId: game.data.playerTwo.userId,
            id: game.data.playerTwo.id,
            points: 0,
            gameId: game.data.playerTwo.gameId,                
        };
        const gamesData = await this.scrabbleApiService.getGames();
        this.data.games = gamesData.data;
        drawer.toggle();
    }

    setSelectedPlayers = (data, $event: EventEmitter<any>) => {
        const Id = $event["option"]["value"];
        const player = _.find(this.data.players, x => x.id === Id);
        this.data.selectedPlayers.push(player);
    }

    setupVariables = async () => {
        this.data = {} as Board;
        this.data.isFirstMove = true;
        this.data.availableBlocks = this.getAllBlocks();
        this.data.gameActive = false;

        this.data.acceptedWords = new ScrabbleWords().acceptedWords;

        const players = await this.scrabbleApiService.getAllPlayers();

        this.data.players = players.data;

        this.data.playerOne = <models.Player>{
            userId: '',
            tray: []
        };
        this.data.playerTwo = <models.Player>{
            userId: '',
            tray: []
        };

        this.data.selectedPlayers = [];
        const result = await this.scrabbleApiService.getGames();
        this.data.games = result.data;
        _.forEach(this.data.games, x => {
            x.playerOne = JSON.parse(x.playerOne);
            x.playerTwo = JSON.parse(x.playerTwo);
        });
    }

    runGame = (game: models.ScrabbleGame) => {
        this.data.gameActive = false;
        this.data.selectedGame = game;
        this.data.loading = true;
        this.data.board = game.board;
        this.data.playerOne = game.playerOne;
        this.data.playerTwo = game.playerTwo;
        this.data.playerOne.tray = JSON.parse((<any>this.data.playerOne).Tray);
        this.data.playerTwo.tray = JSON.parse((<any>this.data.playerTwo).Tray);
        this.data.availableBlocks = game.availableBlocks;
        this.data.gameActive = true;
        this.data.loading = false;
    }

    updateTile = (tile: Tile) => {
        if (tile.value) {
            const block = _.find(this.getAllBlocks(), x => x.id === tile.value.toString());
            this.data.playerOne.tray.push(block);
            tile.colour = null;
            tile.value = null;
            tile.displayValue = '';
            tile.isNewAnswer = false;
        } else {
            const block = _.find(this.data.playerOne.tray, x => x.isSelected === true);
            tile.value = block.id;
            tile.displayValue = block.letter;
            tile.colour = 'yellow';
            tile.isNewAnswer = true;
            _.remove(this.data.playerOne.tray, block);
        }        
    }

    saveAnswer(){
        if (this.data.isFirstMove) {
            let word = '';
            _.forEach(this.data.board, (row, i) => {
                _.forEach(row, (column, o) => {
                    if (column.isNewAnswer) {
                        word += column.displayValue;
                    }
                });
            });
            if (this.data.acceptedWords.indexOf(word.toLowerCase()) !== -1) {
                this.data.selectedGame.playerOne.tray = JSON.parse(this.data.selectedGame.playerOne.tray);
                this.data.selectedGame.playerTwo.tray = JSON.parse(this.data.selectedGame.playerTwo.tray);
                this.scrabbleApiService.saveGame(this.data.selectedGame).then((result) => {
                    const blocks = [] as Array<Block>;
                    for (let i = 0; i < word.length; i++) {
                        const block = this.data.availableBlocks[Math.floor(Math.random() * this.data.availableBlocks.length)];
                        block.used = true;
                        blocks.push(block);
                    }
                    this.data.availableBlocks = _.filter(this.data.availableBlocks, x => x.used === false);
                    this.data.playerOne = <Player>{
                        tray: this.data.playerOne.tray.concat(blocks)
                    };
                    _.forEach(this.data.board, row => {
                        _.forEach(row, column => {
                            column.isNewAnswer = false;
                        });
                    });
                });
            } else {
                console.log('fuck off');
            }
        }
    }

    selectBlock = (block: Block) => {
        _.forEach(this.data.playerOne.tray, x => {
            x.isSelected = false;
        });
        block.isSelected = !block.isSelected;
    }

    getAllBlocks(){
        return [    
            {
                "letter": "A",
                "id": "A1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A7",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A8",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "A",
                "id": "A9",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "B",
                "id": "B1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "B",
                "id": "B2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "C",
                "id": "C1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "C",
                "id": "C2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "D",
                "id": "D1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },
            {
                "letter": "D",
                "id": "D2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "D",
                "id": "D3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "D",
                "id": "D4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "E",
                "id": "E1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E7",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E8",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "E",
                "id": "E9",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "F",
                "id": "F1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "F",
                "id": "F2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "G",
                "id": "G1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "G",
                "id": "G2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "G",
                "id": "G3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 2
            },            
            {
                "letter": "H",
                "id": "H1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "H",
                "id": "H2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "I",
                "id": "I1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I7",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I8",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "I",
                "id": "I9",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "J",
                "id": "J1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 8
            },            
            {
                "letter": "K",
                "id": "K1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 5
            },            
            {
                "letter": "L",
                "id": "L1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "L",
                "id": "L2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "L",
                "id": "L3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "L",
                "id": "L4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },
            {
                "letter": "M",
                "id": "M1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "M",
                "id": "M2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "N",
                "id": "N1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "N",
                "id": "N2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },
            {
                "letter": "N",
                "id": "N3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "N",
                "id": "N4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "N",
                "id": "N5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "N",
                "id": "N6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O7",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "O",
                "id": "O8",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "P",
                "id": "P1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "P",
                "id": "P2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 3
            },            
            {
                "letter": "Q",
                "id": "Q1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 10
            },            
            {
                "letter": "R",
                "id": "R1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "R",
                "id": "R2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "R",
                "id": "R3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "R",
                "id": "R4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "R",
                "id": "R5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "S",
                "id": "S1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "S",
                "id": "S2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "S",
                "id": "S3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "S",
                "id": "S4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T5",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "T",
                "id": "T6",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "U",
                "id": "U1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "U",
                "id": "U2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "U",
                "id": "U3",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "U",
                "id": "U4",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 1
            },            
            {
                "letter": "V",
                "id": "V1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "W",
                "id": "W1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "W",
                "id": "W2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "X",
                "id": "X1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 8
            },            
            {
                "letter": "Y",
                "id": "Y1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "Y",
                "id": "Y2",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 4
            },            
            {
                "letter": "Z",
                "id": "Z1",
                "wild": false,
                "used": false,
                "isSelected": false,
                "value": 10
            }
        ];
    }

    public ngOnInit = () => {
        
    }
}
