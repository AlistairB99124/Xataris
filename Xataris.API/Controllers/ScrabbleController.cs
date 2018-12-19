using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers {
    [Produces("application/json")]
    [Route("api/Scrabble")]
    [Authorize]
    public class ScrabbleController : BaseController
    {

        private readonly IScrabble _scrabble;
        private readonly IUserSettings _userSettings;

        public ScrabbleController(IScrabble scrabble, IUserSettings userSettings) {
            _scrabble = scrabble;
            _userSettings = userSettings;
        }

        [HttpPost("GetBoard")]
        public async Task<JsonResult> GetBoard() => await GenerateResult(new { Board = "" }, _userSettings);

        [HttpPost("StartNewGame")]
        public async Task<JsonResult> StartNewGame([FromBody] SrabbleGameInput input) {
            var result = await _scrabble.StartNewGame(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetAllPlayers")]
        public async Task<JsonResult> GetAllPlayers() {
            var result = await _scrabble.GetAllPlayers();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetGames")]
        public async Task<JsonResult> GetGames() {
            var result = await _scrabble.GetGames();
            return await GenerateResult(result, _userSettings);
        }
        //[HttpPost("SaveGame")]
        //public async Task<JsonResult> SaveGame() {
        //    var result = await _scrabble.SaveGame();
        //    return await GenerateResult(result);
        //}
    }

}