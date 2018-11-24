using System;

namespace Xataris.Infrastructure.ViewModels
{
    public class ByteInput : UserIdInput
    {
        public string Data { get; set; }
        public byte[] Bytes {
            get {
                return Convert.FromBase64String(Data);
            }
        }
        public string Filename { get; set; }
        public string Message { get; set; }
    }
}
