using Antila.AnswerService;
using Antila.Data;
using AntilaWebApp.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AntilaWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AntilaDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("AntilaDb"));
            });
            
            services.AddControllersWithViews();
            services.AddScoped<ITestData, SqlTestData/*InMemoryTestData*/>();
            services.AddScoped<IAnswerService, AnswerService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<IdentityUser> userManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();   
            }
            else
            {
               app.UseExceptionHandler("/Error");
               //The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
               app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            SeedDatabase();
            SeedIdenity();
            ApplicationDbInitializer.SeedUsers(userManager);
        }
        
        //Jeœli baza danych nie instnieje, tworzy j¹
        public void SeedDatabase()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AntilaDbContext>();
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("AntilaDb"));
            using var context = new AntilaDbContext(optionsBuilder.Options);
            context.Database.Migrate();
        }
        //CHANGE IT!!!!! Integrate databases
        public void SeedIdenity()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AntilaWebAppContext>();
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("AntilaWebAppContextConnection"));
            using var context = new AntilaWebAppContext(optionsBuilder.Options);
            context.Database.Migrate();
        }

        public static class ApplicationDbInitializer
        {
            public static void SeedUsers(UserManager<IdentityUser> userManager)
            {
                if (userManager.FindByEmailAsync("admin@antila.com").Result == null)
                {
                    IdentityUser user = new IdentityUser
                    {
                        UserName = "admin@antila.com",
                        Email = "admin@antila.com"
                    };

                    userManager.CreateAsync(user, "Antila01@Admin");

                }
            }
        }
    }
}
