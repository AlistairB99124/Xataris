using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class EmailSender : IEmailSender
    {
        public async Task<SimpleResult> SendEmailAsync(string email, string subject, string message, Attachment attachment, bool? Html = false)
        {
            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("admin@xataris.com", "Rti?d843");
                client.Port = 25;
                client.Host = "mail.xataris.com";
                client.EnableSsl = false;
                MailMessage mailMessage = new MailMessage("admin@xataris.com", email, subject, message);
                mailMessage.IsBodyHtml = Convert.ToBoolean(Html);
                mailMessage.Attachments.Add(attachment);

                await client.SendMailAsync(mailMessage);
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch(Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }
        public async Task<SimpleResult> SendEmailAsync(string email, string subject, string message, bool? Html = false)
        {
            try
            {
                SmtpClient client = new SmtpClient("mail.xataris.co.uk", 25)
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("admin@xataris.co.uk", "iPodu2_2012"),
                    EnableSsl = false
                };
                MailMessage mailMessage = new MailMessage("admin@xataris.co.uk", email, subject, message)
                {
                    IsBodyHtml = Convert.ToBoolean(Html)
                };

                await client.SendMailAsync(mailMessage);
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }
    }
}
