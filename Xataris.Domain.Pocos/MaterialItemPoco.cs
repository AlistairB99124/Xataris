namespace Xataris.Domain.Pocos
{
    public class MaterialItemPoco : TrackedEntity
    {
        public string BOM_No { get; set; }
        public decimal Quantity { get; set; }
        public string StockDescription { get; set; }
        public string StockCode { get; set; }
        public long TimeSheetId { get; set; }
        public TimeSheetPoco TimeSheet { get; set; }
    }
}
