namespace Xataris.Infrastructure.ViewModels
{
    public class MaterialViewModel : UserIdInput
    {
        public long Id { get; set; }
        public string StockCode { get; set; }
        public string StockDescription { get; set; }
        public decimal UnitCostPrice { get; set; }
        public long WarehouseId { get; set; }
        public decimal Level { get; set; }
    }
}
