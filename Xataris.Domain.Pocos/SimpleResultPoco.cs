namespace Xataris.Domain.Pocos
{
    public class SimpleResultPoco
    {
        public long Id { get; set; }
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
    }
}
