using Entity;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmailService;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit.Text;

namespace Repository.MailService
{
    public class MailServiceRepository : IMailServiceRepository
    {
        private readonly MailSettings _mailSettings;

        public MailServiceRepository(IOptions<MailSettings> mailSettingsOptions)
        {
            _mailSettings = mailSettingsOptions.Value;
        }

        public bool SendMail(MailData mailData)
        {
            try
            {
                using (MimeMessage emailMessage = new MimeMessage())
                {
                    emailMessage.From.Add(MailboxAddress.Parse(_mailSettings.SenderEmail));
                    emailMessage.To.Add(MailboxAddress.Parse(mailData.EmailToName));
                    emailMessage.Subject = mailData.EmailSubject;
                    emailMessage.Body = new TextPart(TextFormat.Html) { Text = mailData.EmailBody };

                    using (SmtpClient mailClient = new SmtpClient())
                    {
                        mailClient.Connect(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                        mailClient.Authenticate(_mailSettings.UserName, _mailSettings.Password);
                        mailClient.Send(emailMessage);
                        mailClient.Disconnect(true);
                    }

                    //MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
                    //emailMessage.From.Add(MailboxAddress.Parse(_mailSettings.SenderEmail));
                    //MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
                    //emailMessage.To.Add(MailboxAddress.Parse(mailData.EmailToName));

                    //emailMessage.Cc.Add(new MailboxAddress("Cc Receiver", "cc@example.com"));
                    //emailMessage.Bcc.Add(new MailboxAddress("Bcc Receiver", "bcc@example.com"));

                    //emailMessage.Subject = "Topic registrant accepted!";

                    //emailMessage.Body = new TextPart(TextFormat.Html) { Text = "<b>Your registrant to topic [ " + mailData.EmailBody + " ] has been accepted!</b>" };

                    //BodyBuilder emailBodyBuilder = new BodyBuilder();
                    //emailBodyBuilder.TextBody = mailData.EmailBody;

                    //emailMessage.Body = emailBodyBuilder.ToMessageBody();
                    ////this is the SmtpClient from the Mailkit.Net.Smtp namespace, not the System.Net.Mail one
                    //using (SmtpClient mailClient = new SmtpClient())
                    //{
                    //    mailClient.Connect(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    //    mailClient.Authenticate(_mailSettings.UserName, _mailSettings.Password);
                    //    mailClient.Send(emailMessage);
                    //    mailClient.Disconnect(true);
                    //}
                }

                return true;
            }
            catch (Exception ex)
            {
                // Exception Details
                return false;
            }
        }
    }
}
