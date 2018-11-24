using System.Net.Mail;
using System.Threading.Tasks;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IEmailSender
    {
        Task<SimpleResult> SendEmailAsync(string email, string subject, string message, Attachment attachment, bool? Html = false);
        Task<SimpleResult> SendEmailAsync(string email, string subject, string message, bool? Html = false);
    }
}
