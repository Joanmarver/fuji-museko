// Generic reference example — copy the SHAPE (where logs go, LogHelper calls, exception logging),
// not the literal names. Swap ClassName/DoSomethingAsync/etc. for real ones.

using IQInvoiceAPI.Helper;

namespace ProjectNamespace.Solutions.Example
{
	public class ClassName : IClassName
	{
		private readonly ILogger<ClassName> _logger;
		private readonly DbContextType _db;

		public ClassName(ILogger<ClassName> logger, DbContextType db)
		{
			_logger = logger;
			_db = db;
		}

		public async Task<ResponseHelper<ResultType>> DoSomethingAsync(RequestType request)
		{
			var response = new ResultType();

			LogHelper.LogInfo(_logger, new List<string> { $"Inicio DoSomethingAsync. Id: {request.Id}" });

			try
			{
				var entity = await _db.Entities.FirstOrDefaultAsync(x => x.IdentifierGuid.ToString() == request.Id);

				if (entity == null)
				{
					LogHelper.LogInfo(_logger, new List<string> { $"Registro no encontrado. Id: {request.Id}" });
					return ResponseHelper<ResultType>.Incorrect("No se ha encontrado el registro solicitado");
				}

				if (entity.Status == StatusEnum.Closed)
				{
					LogHelper.LogInfo(_logger, new List<string> { $"Registro cerrado, no se puede modificar. EntityId: {entity.Id}" });
					return ResponseHelper<ResultType>.Incorrect("El registro indicado ya está cerrado y no puede ser modificado");
				}

				entity.Processed = true;
				await _db.SaveChangesAsync();

				LogHelper.LogInfo(_logger, new List<string> { $"Registro procesado correctamente. EntityId: {entity.Id}" });

				response = new ResultType
				{
					Id = entity.IdentifierGuid.ToString(),
					Status = entity.Status.ToString()
				};

				return ResponseHelper<ResultType>.Success(response);
			}
			catch (Exception ex)
			{
				LogHelper.LogException(_logger, ex, new List<string> { $"Error al procesar el registro. Id: {request.Id}" });
				return ResponseHelper<ResultType>.Conflict($"Error al procesar el registro: {ex.Message}");
			}
		}
	}
}
