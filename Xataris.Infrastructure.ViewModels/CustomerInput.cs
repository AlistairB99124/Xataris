namespace Xataris.Infrastructure.ViewModels
{
    public class CustomerInput : UserIdInput
    {
        public long? CustomersId { get; set; }
        public string Company { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
