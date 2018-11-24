namespace Xataris.Infrastructure.ViewModels
{
    public class DropdownModel
    {
        public long Value { get; set; }
        public string Text { get; set; }
        public bool Selected { get; set; }
    }

    public class IDropdownModel<T>
    {
        public T Value { get; set; }
        public string Text { get; set; }
        public bool Selected { get; set; }
    }
}
