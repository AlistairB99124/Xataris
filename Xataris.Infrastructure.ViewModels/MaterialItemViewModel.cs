namespace Xataris.Infrastructure.ViewModels
{
    public class MaterialItemViewModel
    {
        public long Id { get; set; }
        public string BOM_No { get; set; }
        public decimal Quantity { get; set; }
        public string StockDescription { get; set; }
        public string StockCode { get; set; }
        public long TimeSheetId { get; set; }
    }
}
