using System;

namespace DotNetCore.API.Common1.API.DataContracts.Requests {
    public class UserCreationRequest {
        public DateTime Date { get; set; }

        public User User { get; set; }
    }
}
