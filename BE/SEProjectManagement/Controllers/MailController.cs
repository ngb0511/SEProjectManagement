using Entity;
using MailKit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit.Text;
using MimeKit;
using Org.BouncyCastle.Asn1.Pkcs;
using Repository.MailService;
using System.Net.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServiceRepository _mailService;

        public MailController(IMailServiceRepository _MailService)
        {
            _mailService = _MailService;
        }


        [HttpPost("SendEmail")]
        public async Task<ActionResult<bool>> SendEmail(MailData mailData)
        {
            //mailData.EmailSubject = "Topic registrant " + mailData.EmailSubject + "!";
            //mailData.EmailBody =  "<b>Your registrant to topic [ " + mailData.EmailBody + " ] has been " + mailData.EmailSubject + "!</b>";

            return _mailService.SendMail(mailData);
        }
    }
}
