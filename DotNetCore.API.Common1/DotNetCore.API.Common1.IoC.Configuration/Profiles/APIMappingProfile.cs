using AutoMapper;
using DC = DotNetCore.API.Common1.API.DataContracts;
using S = DotNetCore.API.Common1.Services.Model;

namespace DotNetCore.API.Common1.IoC.Configuration.Profiles {
    public class APIMappingProfile : Profile {
        public APIMappingProfile() {
            CreateMap<S.User, DC.User>();
            CreateMap<S.Adress, DC.Adress>();
        }
    }
}
