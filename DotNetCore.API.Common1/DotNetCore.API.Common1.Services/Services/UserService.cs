using AutoMapper;
using DotNetCore.API.Common1.API.Common.Settings;
using DotNetCore.API.Common1.Services.Contracts;
using DotNetCore.API.Common1.Services.Model;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace DotNetCore.API.Common1.Services {
    public class UserService : IUserService {
        private string _connectionString = string.Empty;
        private readonly IMapper _mapper;

        public UserService(IOptions<AppSettings> settings, IMapper mapper) {
            _connectionString = settings?.Value?.ConnectionString;
            _mapper = mapper;
        }

        public Task<string> CreateAsync(User user) {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(User user) {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(string id) {
            throw new NotImplementedException();
        }

        public Task<User> GetAsync(string id) {
            throw new NotImplementedException();
        }
    }
}
