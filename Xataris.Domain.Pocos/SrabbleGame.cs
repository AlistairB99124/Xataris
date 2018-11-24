using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Xataris.Domain.Pocos {
    public class ScrabbleGame {
        readonly Random random;

        public ScrabbleGame() {

        }

        public ScrabbleGame(Player playerOne, Player playerTwo, string _Board, string Blocks, string _Name) {
            PlayerOne = playerOne;
            PlayerTwo = playerTwo;
            LastPLayed = DateTime.Now;
            Name = _Name;
            AvailableBlocks = JsonConvert.DeserializeObject<List<Block>>(Blocks, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            Board = JsonConvert.DeserializeObject<List<List<Board>>>(_Board, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            UsedBlocks = new List<Block>();
            random = new Random();
            var playerOneTray = new List<Block>();
            var playerTwoTray = new List<Block>();
            for (int i = 0; i < 7; i++)
            {
                int randInt = random.Next(AvailableBlocks.Count);
                UsedBlocks.Add(AvailableBlocks[randInt]);
                playerOneTray.Add(AvailableBlocks[randInt]);
                AvailableBlocks.RemoveAt(randInt);
            }
            for (int i = 0; i < 7; i++)
            {
                int randInt = random.Next(AvailableBlocks.Count);
                UsedBlocks.Add(AvailableBlocks[randInt]);
                playerTwoTray.Add(AvailableBlocks[randInt]);
                AvailableBlocks.RemoveAt(randInt);
            }
            PlayerOne.Tray = JsonConvert.SerializeObject(playerOneTray, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            PlayerTwo.Tray = JsonConvert.SerializeObject(playerTwoTray, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }

        public long Id { get; set; }
        public Player PlayerOne { get; set; }
        public Player PlayerTwo { get; set; }
        public List<List<Board>> Board { get; set; }
        public List<Block> AvailableBlocks { get; set; }
        public List<Block> UsedBlocks { get; set; }
        public DateTime LastPLayed { get; set; }
        public string Name { get; set; }
        public bool Finished { get; set; }
    }

    public class Game {
        public long Id { get; set; }
        public string PlayerOne { get; set; }
        public string PlayerTwo { get; set; }
        public string Board { get; set; }
        public string AvailableBlocks { get; set; }
        public string UsedBlocks { get; set; }
        public bool Finished { get; set; }
        public DateTime LastPLayed { get; set; }
        public string Name { get; set; }
    }

    public class Player {
        public long Id { get; set; }
        public string UserId { get; set; }
        public int Points { get; set; }
        public long GameId { get; set; }
        public string Tray { get; set; }
    }

    public class Block {
        public string Letter { get; set; }
        public string Id { get; set; }
        public bool Wild { get; set; }
        public bool Used { get; set; }
        public bool IsSelected { get; set; }
        public int Value { get; set; }
    }

    public class Board {
        public TileType Type { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int? Value { get; set; }
        public string DisplayValue { get; set; }
        public string Text { get; set; }
        public string Colour { get; set; }
    }

    public enum TileType {
        None = 0,
        TripleWord = 1,
        DoubleWord = 2,
        DoubleLetter = 3,
        TripleLetter = 4,
        Start = 5
    }
}
