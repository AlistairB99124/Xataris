using AutoMapper;
using DotNetCore.API.Common1.API.Common.Attributes;
using DotNetCore.API.Common1.API.Common.Extensions;
using DotNetCore.API.Common1.API.Common.Settings;
using DotNetCore.API.Common1.IoC.Configuration.Profiles;
using DotNetCore.API.Common1.Services;
using DotNetCore.API.Common1.Services.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.Reflection;
using System.IO;
using DotNetCore.API.Common1.API.Controllers;
using Microsoft.AspNetCore.Mvc.Versioning.Conventions;
using DotNetCore.API.Common1.API.Swagger;

namespace DotNetCore.API.Common1.API {
    public class Startup {
        public IConfiguration Configuration { get; private set; }
        public IHostingEnvironment HostingEnvironment { get; private set; }

        private AppSettings _appSettings;

        public Startup(IConfiguration configuration, IHostingEnvironment env) {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            //API Explorer (for API Versioning)
            // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service
            // note: the specified format code will format the version as "'v'major[.minor][-status]"
            services.AddMvcCore().AddVersionedApiExplorer(
                options =>
                {
                    options.GroupNameFormat = "'v'VVV";

                    // note: this option is only necessary when versioning by url segment. the SubstitutionFormat
                    // can also be used to control the format of the API version in route templates
                    options.SubstituteApiVersionInUrl = true;
                });


            services.AddMvc(
                opt => opt.Filters.Add(typeof(CustomFilterAttribute))
                )
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            //API Version
            services.AddApiVersioning(
                o =>
                {
                    //o.Conventions.Controller<UserController>().HasApiVersion(1, 0);
                    o.ReportApiVersions = true;
                    o.AssumeDefaultVersionWhenUnspecified = true;
                    o.DefaultApiVersion = new ApiVersion(1, 0);
                    o.ApiVersionReader = new UrlSegmentApiVersionReader();
                }
                );

            //App settings
            var appSettingsSection = Configuration.GetSection("AppSettings");
            if (appSettingsSection == null)
                throw new System.Exception("No appsettings section has been found");

            services.Configure<AppSettings>(appSettingsSection);

            _appSettings = appSettingsSection.Get<AppSettings>();

            if (_appSettings.IsValid())
            {
                if (_appSettings.Swagger.Enabled)
                {
                    // Register the Swagger generator, defining 1 or more Swagger documents
                    services.AddSwaggerGen(options =>
                    {
                        // resolve the IApiVersionDescriptionProvider service
                        // note: that we have to build a temporary service provider here because one has not been created yet
                        var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

                        // add a swagger document for each discovered API version
                        // note: you might choose to skip or document deprecated API versions differently
                        foreach (var description in provider.ApiVersionDescriptions)
                        {
                            options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
                        }

                        // add a custom operation filter which sets default values
                        options.OperationFilter<SwaggerDefaultValues>();

                        // integrate xml comments
                        //options.IncludeXmlComments(XmlCommentsFilePath);

                    });
                }
            }

            //Automap settings
            services.AddAutoMapper();
            ConfigureMaps();

            //Custom services (.NET CORE 2.1)
            services.AddTransient<IUserService, UserService>();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApiVersionDescriptionProvider provider) {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                loggerFactory.AddConsole(Configuration.GetSection("Logging"));
                loggerFactory.AddDebug();
            } else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            //Swagger section
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            if (_appSettings.IsValid())
            {
                if (_appSettings.Swagger.Enabled)
                {
                    app.UseSwagger();

                    // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
                    // specifying the Swagger JSON endpoint.
                    app.UseSwaggerUI(options =>
                    {
                        // build a swagger endpoint for each discovered API version
                        foreach (var description in provider.ApiVersionDescriptions)
                        {
                            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                        }
                    });
                }
            }

            app.UseMvc();
        }

        private void ConfigureMaps() {
            //Mapping settings
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<APIMappingProfile>();
                cfg.AddProfile<ServicesMappingProfile>();
            }
                );
        }

        string XmlCommentsFilePath {
            get {
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var fileName = typeof(Startup).GetTypeInfo().Assembly.GetName().Name + ".xml";
                return Path.Combine(basePath, fileName);
            }
        }

        Info CreateInfoForApiVersion(ApiVersionDescription description) {
            var info = new Info()
            {
                Title = $"{_appSettings.API.Title} {description.ApiVersion}",
                Version = description.ApiVersion.ToString(),
                Description = _appSettings.API.Description
                //Contact = new Contact() { Name = "Bill Mei", Email = "bill.mei@somewhere.com" },
                //TermsOfService = "Shareware",
                //License = new License() { Name = "MIT", Url = "https://opensource.org/licenses/MIT" }
            };

            if (description.IsDeprecated)
            {
                info.Description += " This API version has been deprecated.";
            }

            return info;
        }
    }
}
