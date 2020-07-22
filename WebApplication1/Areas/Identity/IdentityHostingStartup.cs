using System;
using AntilaWebApp.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(AntilaWebApp.Areas.Identity.IdentityHostingStartup))]
namespace AntilaWebApp.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<AntilaWebAppContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("AntilaWebAppContextConnection")));

                services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
                    .AddEntityFrameworkStores<AntilaWebAppContext>();
            });
        }
    }
}