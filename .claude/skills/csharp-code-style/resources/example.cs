// Generic reference example — copy the SHAPE (braces, spacing, blank lines, guard clauses,
// object initializers, naming), not the literal names. Swap ClassName/MethodAsync/etc. for real ones.

using Microsoft.EntityFrameworkCore;

namespace ProjectNamespace.Solutions.Example
{
	public class ClassName : IClassName
	{
		private readonly DbContextType _db;
		private readonly IDependencyOne _dependencyOne;
		private readonly IDependencyTwo _dependencyTwo;
		private readonly string configValue;
		private readonly bool testingMode;

		public ClassName(DbContextType db, IDependencyOne dependencyOne, IDependencyTwo dependencyTwo, IConfiguration configuration, IWebHostEnvironment env)
		{
			_db = db;
			_dependencyOne = dependencyOne;
			_dependencyTwo = dependencyTwo;
			configValue = configuration["Some:Key"];
			testingMode = env.IsProduction() ? false : true;
		}

		public async Task<ResponseHelper<ResultType>> DoSomethingAsync(RequestType request)
		{
			var response = new ResultType();

			try
			{
				var entity = await _db.Entities.FirstOrDefaultAsync(x => x.IdentifierGuid.ToString() == request.Id);

				if (entity == null)
					return ResponseHelper<ResultType>.Incorrect("No se ha encontrado el registro solicitado");

				if (entity.Status == StatusEnum.Closed)
					return ResponseHelper<ResultType>.Incorrect("El registro indicado ya está cerrado y no puede ser modificado");

				var related = await _db.RelatedEntities.Where(x => x.EntityId == entity.Id).ToListAsync();

				// Explica el porqué de una decisión no obvia, no lo que hace la línea siguiente
				if (related?.Count > 0)
				{
					foreach (var item in related)
					{
						item.Processed = true;
						_db.Update(item);
					}
				}
				else
					entity.Processed = true;

				var log = new LogEntity
				{
					CreationDate = DateTime.Now,
					EntityId = entity.Id,
					Action = "Process",
					Detail = request.Detail,
				};

				_db.Logs.Add(log);
				await _db.SaveChangesAsync();

				response = new ResultType
				{
					Id = entity.IdentifierGuid.ToString(),
					Status = entity.Status.ToString()
				};

				return ResponseHelper<ResultType>.Success(response);
			}
			catch (Exception ex)
			{
				return ResponseHelper<ResultType>.Conflict($"Error al procesar el registro: {ex.Message}");
			}
		}
	}
}
