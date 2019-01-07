using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Xataris.Application.Implimentations;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Implimentations;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Xataris.API
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
            services.AddCors(options => options.AddPolicy("Cors", builder =>
            {
                builder.WithOrigins("https://www.xataris.co.uk", "http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
            }));
            services.AddDbContext<XatarisContext>(options =>
                options.UseSqlServer(Configuration["database:connection"]));

            services.AddIdentity<UserPoco, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<XatarisContext>().AddDefaultTokenProviders();
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });
            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
                options.AutomaticAuthentication = false;
            });
            services.AddSingleton(Configuration);
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddTransient<IMaterial, Material>();
            services.AddTransient<IMaterialDomain, MaterialDomain>();
            services.AddTransient<IUsers, Users>();
            services.AddTransient<IUserDomain, UserDomain>();
            services.AddTransient<ITimesheetDomain, TimesheetDomain>();
            services.AddTransient<ITimesheet, Timesheet>();
            services.AddTransient<ISite, Site>();
            services.AddTransient<ISiteDomain, SiteDomain>();
            services.AddTransient<IWarehouse, Warehouse>();
            services.AddTransient<IWarehouseDomain, WarehouseDomain>();
            services.AddTransient<IOrders, Orders>();
            services.AddTransient<IOrderDomain, OrderDomain>();
            services.AddTransient<IDashboard, Dashboard>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IProcedureService, ProcedureService>();
            services.AddSingleton<IUserSettings, UserSettings>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseCors("Cors");
            app.UseMvcWithDefaultRoute();
        }
    }
}
