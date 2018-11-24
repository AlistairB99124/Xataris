using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations {
    public class Scrabble : IScrabble {

        private XatarisContext _context;

        public Scrabble(XatarisContext context) {
            _context = context;
        }

        public async Task<UserPoco[]> GetAllPlayers() {
            try
            {
                return await Task.Run(() =>
                {
                    var users = _context.Users;
                    return users.Select(s => new UserPoco
                    {
                         FirstName = s.FirstName,
                         LastName = s.LastName,
                         Id = s.Id
                    }).ToArray();
                });
            } catch
            {
                return new List<UserPoco>().ToArray();
            }
        }
        public Task<ScrabbleGame> GetGame() {
            throw new NotImplementedException();
        }

        public async Task<dynamic[]> GetGames() {
            try
            {
                var games = _context.Games;
                return await games.Select(s => new
                {
                    AvailableBlocks = JsonConvert.DeserializeObject<List<Block>>(s.AvailableBlocks),
                    Board = JsonConvert.DeserializeObject<List<List<Board>>>(s.Board),
                    Finished = s.Finished,
                    Id = s.Id,
                    LastPLayed = s.LastPLayed,
                    Name = s.Name,
                    PlayerOne = s.PlayerOne,
                    PlayerTwo = s.PlayerTwo,
                    UsedBlocks = JsonConvert.DeserializeObject<List<Block>>(s.UsedBlocks)
                }).ToArrayAsync();
            } catch
            {
                return new List<ScrabbleGame>().ToArray();
            }
        }

        //public async Task<SimpleResult> SaveGame(input) {
        //    try
        //    {
        //        var result = await _context.Games.Add(input);
        //    } catch
        //    {
        //        return new SimpleResult();
        //    }
        //}

        public async Task<ScrabbleGame> StartNewGame(SrabbleGameInput input) {
            try
            {
                Player playerOne = new Player
                {
                    UserId = input.PlayerOne
                };
                Player playerTwo = new Player
                {
                    UserId = input.PlayerTwo
                };

                ScrabbleGame game = new ScrabbleGame(playerOne, playerTwo, input.Board, input.Blocks, input.Name);
                Game savedGame = new Game
                {
                    AvailableBlocks = JsonConvert.SerializeObject(game.AvailableBlocks),
                    UsedBlocks = JsonConvert.SerializeObject(game.UsedBlocks),
                    Board = JsonConvert.SerializeObject(game.Board),
                    Finished = false,
                    PlayerOne = JsonConvert.SerializeObject(game.PlayerOne),
                    PlayerTwo = JsonConvert.SerializeObject(game.PlayerTwo),
                    LastPLayed = DateTime.Now,
                    Name = input.Name
                };
                await _context.Games.AddAsync(savedGame);
                await _context.SaveChangesAsync();
                game.PlayerOne.GameId = savedGame.Id;
                game.PlayerTwo.GameId = savedGame.Id;
                await _context.SaveChangesAsync();
                var playerOneSave = game.PlayerOne;
                var playerTwoSave = game.PlayerTwo;
                await _context.Players.AddAsync(playerOneSave);
                await _context.Players.AddAsync(playerTwoSave);
                await _context.SaveChangesAsync();
                return game;
            } catch
            {
                throw new NotImplementedException();
            }
        }

        //public async Task<ScrabbleGame> GetGame(long gameId) {
        //    try
        //    {
        //        var result = await _context.Games.FindAsync(gameId);
        //        return new ScrabbleGame
        //        {
        //            AvailableBlocks = JsonConvert.DeserializeObject<List<Block>>(result.AvailableBlocks)
        //        };
        //    } catch
        //    {

        //    }
        //}
    }
}
