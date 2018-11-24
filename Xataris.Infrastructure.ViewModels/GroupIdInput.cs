namespace Xataris.Infrastructure.ViewModels
{
    public class GroupIdInput : UserIdInput
    {
        public long GroupsId { get; set; }
    }

    public class GroupInput : UserIdInput
    {
        public GroupIdInput[] GroupsIds { get; set; }
    }
}
