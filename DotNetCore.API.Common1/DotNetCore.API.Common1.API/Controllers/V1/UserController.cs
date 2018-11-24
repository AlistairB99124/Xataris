using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetCore.API.Common1.API.DataContracts.Requests;
using DotNetCore.API.Common1.API.DataContracts;
using DotNetCore.API.Common1.Services;
using AutoMapper;
using S = DotNetCore.API.Common1.Services.Model;
using DotNetCore.API.Common1.Services.Contracts;

namespace DotNetCore.API.Common1.API.Controllers {
    [ApiVersion("1.0")]
    [Route("api/users")]//required for default versioning
    [Route("api/v{version:apiVersion}/users")]
    public class UserController : Controller {
        private readonly IUserService _service;
        private readonly IMapper _mapper;

        public UserController(IUserService service, IMapper mapper) {
            _service = service;
            _mapper = mapper;
        }

        #region GET
        [HttpGet("{id}")]
        public async Task<User> Get(string id) {
            var data = await _service.GetAsync(id);

            if (data != null)
                return _mapper.Map<User>(data);
            else
                return null;
        }
        #endregion

        #region POST
        [HttpPost]
        public async Task<User> CreateUser([FromBody]UserCreationRequest value) {

            //TODO: include exception management policy according to technical specifications
            if (value == null)
                throw new ArgumentNullException("value");


            var data = await _service.CreateAsync(Mapper.Map<S.User>(value));

            if (data != null)
                return _mapper.Map<User>(data);
            else
                return null;

        }
        #endregion

        #region PUT
        [HttpPut()]
        public async Task<bool> UpdateUser(User parameter) {
            if (parameter == null)
                throw new ArgumentNullException("parameter");

            return await _service.UpdateAsync(Mapper.Map<S.User>(parameter));
        }
        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public async Task<bool> DeleteDevice(string id) {
            return await _service.DeleteAsync(id);
        }
        #endregion
    }
}
