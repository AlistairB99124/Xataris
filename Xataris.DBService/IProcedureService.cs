using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Xataris.DBService
{
    public interface IProcedureService
    {
        Task<List<T1>> CallProcedureAsync<T1>(string procName, object parameters);
    }
}
