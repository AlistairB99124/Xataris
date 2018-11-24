namespace Xataris.Infrastructure.ViewModels
{
    public class InventoryIdInput : UserIdInput
    {
        public long Id { get; set; }
        public string BomNo { get; set; }
        public decimal Quantity { get; set; }
    }
}
