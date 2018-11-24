using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces {
    public interface IScrabble {
        //Task<ScrabbleGame> GetGame();
        //Task<SimpleResult> SaveGame();
        Task<ScrabbleGame> StartNewGame(SrabbleGameInput input);
        Task<UserPoco[]> GetAllPlayers();
        Task<dynamic[]> GetGames();
    }
}
