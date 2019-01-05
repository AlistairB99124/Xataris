using System.Collections.Generic;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace Xataris.DBService
{
    public class ProcedureService : IProcedureService
    {
        private readonly IConfiguration _configuration;
        public ProcedureService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<List<T1>> CallProcedureAsync<T1>(string procName, object parameters)
        {
            List<SqlParameter> sqlParameters = new List<SqlParameter>();
            string name;
            object value;
            foreach (PropertyInfo prop in parameters.GetType().GetProperties())
            {
                name = prop.Name;
                value = parameters.GetType().GetProperty(name).GetValue(parameters, null);
                sqlParameters.Add(new SqlParameter
                {
                    ParameterName = name,
                    Value = value,
                    Direction = ParameterDirection.Input
                });
            }
            StringBuilder jsonResult = new StringBuilder();
            using (SqlConnection sqlConnection = new SqlConnection(_configuration["database:connection"]))
            {
                await sqlConnection.OpenAsync();
                using (SqlCommand sqlCommand = new SqlCommand(procName, sqlConnection) { CommandType = CommandType.StoredProcedure })
                {
                    sqlCommand.Parameters.AddRange(sqlParameters.ToArray());
                    SqlDataReader reader = await sqlCommand.ExecuteReaderAsync();
                    if (!reader.HasRows)
                    {
                        jsonResult.Append("[]");
                    }
                    else
                    {
                        while (await reader.ReadAsync())
                        {
                            jsonResult.Append(reader.GetValue(0).ToString());
                        }
                    }
                }
                sqlConnection.Close();
            }
            return JsonConvert.DeserializeObject<List<T1>>(jsonResult.ToString());
        }
    }
}
