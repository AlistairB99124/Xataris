using System;

namespace Xataris.Domain.Pocos {
    public class LookupValue {
        public long LookupValuesId { get; set; }
        public long Id { get; set; }
        public string DataValue { get; set; }
        public DataType DataType { get; set; }
        public DateTime Updated { get; set; }
    }

    public enum DataType : int {
        Decimal,
        Integer,
        String,
        DateTime
    }
}
