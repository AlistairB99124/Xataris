namespace Xataris.Infrastructure.ViewModels
{
    public class AddWarehouseInput : UserIdInput
    {
        public string Name { get; set; }
        public string UserId { get; set; }
    }

    public class WarehousesIdInput : UserIdInput
    {
        public long WarehouseId { get; set; }
    }
}
