using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MvcMovie.Models;

[assembly: HostingStartup(typeof(MvcMovie.Areas.Identity.IdentityHostingStartup))]
namespace MvcMovie.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<MvcMovieIdentityContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("MvcMovieIdentityContextConnection")));

                services.AddDefaultIdentity<IdentityUser>()
                    .AddEntityFrameworkStores<MvcMovieIdentityContext>();
            });
        }
    }
}