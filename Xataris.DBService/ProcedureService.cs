using System.Collections.Generic;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Newtonsoft.Json;
namespace Xataris.DBService
{
    public class ProcedureService : IProcedureService
    {
        protected string connectionString;
        public ProcedureService()
        {
            connectionString = "Server=sql6005.site4now.net;Initial Catalog=DB_A3F328_xataris;Persist Security Info=False;User ID=DB_A3F328_xataris_admin;Password=iPodu2_2012;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;";
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
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
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
