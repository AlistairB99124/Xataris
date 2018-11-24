using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class UserGroupPoco : TrackedEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<UserPoco> Users { get; set; }
        public string Modules { get; set; }
        public AccessLevel AccessLevel { get; set; }
    }

    public enum AccessLevel
    {
        Read = 0,
        Write = 1,
        Design = 2,
        Admin = 3
    }

    public enum Module
    {
        Users,
        PTM,
        Inventory,
        Data,
        Sites,
        Warehouses,
        Material
    }

    public class ModulePoco : TrackedEntity
    {
        public ModulePoco()
        {

        }
        public ModulePoco(string name, string description)
        {
            this.Name = name;
            this.Description = description;
        }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
