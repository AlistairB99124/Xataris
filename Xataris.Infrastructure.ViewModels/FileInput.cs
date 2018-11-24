using System;

namespace Xataris.Infrastructure.ViewModels
{
    public class FileInput
    {
        public long LastModified { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Type { get; set; }
        public string WebkitRelativePath { get; set; }
    }
}
