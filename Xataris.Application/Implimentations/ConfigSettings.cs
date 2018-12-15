using Xataris.Application.Interfaces;

namespace Xataris.Application.Implimentations
{
    public class ConfigSettings : IConfigSettings
    {
        public string ConnectionString { get; set; }
    }
}
