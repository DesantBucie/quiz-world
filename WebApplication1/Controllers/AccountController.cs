using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using AntilaWebApp.Models.AccountModels;
using System.Threading;
using System.Security.Policy;

namespace AntilaWebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<AccountController> _logger;
        private readonly IEmailSender _emailSender;

        public AccountController(SignInManager<IdentityUser> signInManager,
            ILogger<AccountController> logger,
            UserManager<IdentityUser> userManager,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }
        [TempData]
        public string ErrorMessage { get; set; }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl = returnUrl ?? Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        // GET: /Account/Login
        [HttpGet("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> IsLogged()
        {
            bool isSingned = _signInManager.IsSignedIn(User);

            //Sprawdź to
            if(!isSingned)
               await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            return Ok(isSingned);
        }

        // POST: /Account/Login
        [HttpPost("Login")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)//, string returnUrl = null)
        {      
            string returnUrl =  Url.Content("~/");
            string invalidLogin = Url.Content("~/InvalidLogin");

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                return Ok(returnUrl);   
            }
            //if (result.RequiresTwoFactor)
            //{
            //    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
            //}
            //if (result.IsLockedOut)
            //{
            //    _logger.LogWarning("User account locked out.");
            //    return RedirectToPage("./Lockout");
            //}
            else
            {
                _logger.LogWarning("Couldn't sign in.");
                return Ok(invalidLogin);
            }
            
            // If we got this far, something failed, redisplay form
            //return Ok();
        }

        //public async Task OnGetAsync(string returnUrl = null)
        //{
        //    ReturnUrl = returnUrl;
        //    ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        //}


        // POST: /Account/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            List<IdentityError> errorList = new List<IdentityError>();
            string returnUrl = Url.Content("~/");

            //ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

         
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                //var callbackUrl = Url.Page(
                //    "/Account/ConfirmEmail",
                //    pageHandler: null,
                //    values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                //    protocol: Request.Scheme);

                //await _emailSender.SendEmailAsync(model.Email, "Confirm your email",
                //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                //{
                //    return RedirectToPage("RegisterConfirmation", new { email = model.Email, returnUrl = returnUrl });
                //}
                //else
                //{
                    await _signInManager.SignInAsync(user, isPersistent: false);
                //return LocalRedirect(returnUrl);
                return Ok(returnUrl);
                // }
                }

            foreach (var error in result.Errors)
            {
                errorList.Add(error);
                //ModelState.AddModelError(string.Empty, error.Description);
                _logger.LogWarning("Registration failed.");
            }
            return Ok(errorList);
      

            // If we got this far, something failed, redisplay form
        }

        // POST: /Account/Logout
        [HttpPost("Logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout()//string returnUrl = null)
        {
            string returnUrl = Url.Content("~/");
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            //if (returnUrl != null)
            //{
            //    return LocalRedirect(returnUrl);
            //}
            //else
            //{
            //    //return RedirectToPage();
            //    return LocalRedirect(returnUrl);
            //}
            return Ok(returnUrl);
        }

        // GET: /Account/Username
        [HttpGet("Username")]
        public List<string> GetUserName()
        {
            List<string> list = new List<string>
            {
                _userManager.GetUserName(User),
                Url.Content("~/")
            };

            return list;
        }
    }
}

