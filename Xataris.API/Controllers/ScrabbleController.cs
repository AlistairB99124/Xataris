using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers {
    [Produces("application/json")]
    [Route("api/Scrabble")]
    public class ScrabbleController : BaseController
    {

        private readonly IScrabble _scrabble;

        public ScrabbleController(IScrabble scrabble) {
            _scrabble = scrabble;
        }

        [HttpPost("GetBoard")]
        public async Task<JsonResult> GetBoard() => await GenerateResult(new { Board = "" });

        [HttpPost("StartNewGame")]
        public async Task<JsonResult> StartNewGame([FromBody] SrabbleGameInput input) {
            var result = await _scrabble.StartNewGame(input);
            return await GenerateResult(result);
        }

        [HttpPost("GetAllPlayers")]
        public async Task<JsonResult> GetAllPlayers() {
            var result = await _scrabble.GetAllPlayers();
            return await GenerateResult(result);
        }

        [HttpPost("GetGames")]
        public async Task<JsonResult> GetGames() {
            var result = await _scrabble.GetGames();
            return await GenerateResult(result);
        }
        //[HttpPost("SaveGame")]
        //public async Task<JsonResult> SaveGame() {
        //    var result = await _scrabble.SaveGame();
        //    return await GenerateResult(result);
        //}
    }

}