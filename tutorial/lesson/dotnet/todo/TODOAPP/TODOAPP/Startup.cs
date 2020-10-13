using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VueCliMiddleware;
using Microsoft.EntityFrameworkCore;
using TODOAPP.Models;

namespace TODOAPP {
  public class Startup {
    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      services.AddDbContext<TestDBContext>(opt => {
        //opt.UseInMemoryDatabase("TodoList");
      });
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

      // https://github.com/EEParker/aspnetcore-vueclimiddleware
      services.AddSpaStaticFiles(configuration => {
        // configuration.RootPath = "hello-ts";// configuration.RootPath = "ClientApp";
        configuration.RootPath = "hello-ts/dist";
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      } else {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseMvc();
      app.UsePathBase("/aaa/view"); // UseSpaStaticFilesより前に宣言 https://qiita.com/miyapei/items/28f1b7360614551e7f15
      app.UseSpaStaticFiles();

      app.UseSpa(spa => {
        spa.Options.SourcePath = "dist";
//        if (env.IsDevelopment())
//          spa.Options.SourcePath = "hello-ts"; // spa.Options.SourcePath = "ClientApp";
//        else
//          spa.Options.SourcePath = "dist";
//#if DEBUG
//        if (env.IsDevelopment()) {
//          spa.UseVueCli(npmScript: "serve");
//        }
//#endif
      });
    }
  }
}
