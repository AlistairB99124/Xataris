namespace Xataris.Infrastructure.ViewModels
{
    public class StackedGraphResult
    {
        public Column[] Columns { get; set; }
    }

    public class Column
    {
        public string Name { get; set; }
        public Series[] Series { get; set; }
    }

    public class Series
    {
        public string Name { get; set; }
        public decimal Value { get; set; }
    }
}
