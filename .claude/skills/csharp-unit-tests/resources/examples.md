# Unit Test Examples — In-Memory Database + xUnit + Moq

## 1. Test Project Setup

`.csproj` for the test project:

```xml
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<TargetFramework>net10.0</TargetFramework>
		<Nullable>disable</Nullable>
		<ImplicitUsings>enable</ImplicitUsings>
		<IsPackable>false</IsPackable>
		<IsTestProject>true</IsTestProject>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
		<PackageReference Include="xunit.v3" Version="3.2.2" />
		<PackageReference Include="xunit.runner.visualstudio" Version="3.1.5">
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
		</PackageReference>
		<PackageReference Include="Moq" Version="4.20.71" />
		<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="10.0.9" />
	</ItemGroup>

	<ItemGroup>
		<ProjectReference Include="..\Project\Project.csproj" />
	</ItemGroup>

</Project>
```

Register it in the solution and run with `dotnet test`.

## 2. In-Memory Database Factory

Each test class instance gets its own isolated database (unique name per call) — xUnit creates a new test class instance per test method, so this alone guarantees no shared state between tests.

```csharp
using Microsoft.EntityFrameworkCore;

namespace ProjectAPI.Tests.Fixtures;

public static class InMemoryDbContextFactory
{
	public static ProjectDbContext Create()
	{
		var options = new DbContextOptionsBuilder<ProjectDbContext>()
			.UseInMemoryDatabase($"TestDb_{Guid.NewGuid()}")
			.Options;

		return new ProjectDbContext(options);
	}
}
```

Usage in a test class:

```csharp
public class CategoryServiceTests : IDisposable
{
	private readonly ProjectDbContext _db;

	public CategoryServiceTests()
	{
		_db = InMemoryDbContextFactory.Create();
	}

	public void Dispose() => _db.Dispose();
}
```

## 3. Builder Pattern for Test Data

All builder method names are in English (`With...`, `Build`, `Default`), regardless of the domain language of the entity being built.

```csharp
using ProjectAPI.Models;

namespace ProjectAPI.Tests.Builders;

public class CategoryBuilder
{
	private int _id = 1;
	private string _code = "CAT001";
	private string _description = "Test category";
	private int _measureType = 1;

	public CategoryBuilder WithId(int id) { _id = id; return this; }
	public CategoryBuilder WithCode(string code) { _code = code; return this; }
	public CategoryBuilder WithDescription(string description) { _description = description; return this; }
	public CategoryBuilder WithMeasureType(int measureType) { _measureType = measureType; return this; }

	public Category Build() => new()
	{
		Id = _id,
		Code = _code,
		Description = _description,
		MeasureType = _measureType
	};

	public static CategoryBuilder Default() => new();
}
```

## 4. Service/Repository Tests (AAA pattern, English-Spanish test names)

The method under test (`CreateCategory`, `GetById`, ...) is English and matches the real method name. Everything after the first `_` is Spanish.

```csharp
using Xunit;
using ProjectAPI.Services;
using ProjectAPI.Repositories;
using ProjectAPI.Tests.Builders;
using ProjectAPI.Tests.Fixtures;

namespace ProjectAPI.Tests.Categories;

public class CategoryServiceTests : IDisposable
{
	private readonly ProjectDbContext _db;
	private readonly CategoryService _service;

	public CategoryServiceTests()
	{
		_db = InMemoryDbContextFactory.Create();
		var repository = new CategoryRepository(_db);
		_service = new CategoryService(repository);
	}

	public void Dispose() => _db.Dispose();

	[Fact]
	public async Task CreateCategory_ConDatosValidos_DebeInsertarEnLaBaseDatos()
	{
		// Arrange
		var category = CategoryBuilder.Default()
			.WithCode("CAT-001")
			.Build();

		// Act
		var result = await _service.CreateAsync(category);

		// Assert
		Assert.NotNull(result);
		Assert.Equal(category.Code, result.Code);

		var stored = await _db.Categories.FindAsync(result.Id);
		Assert.NotNull(stored);
	}

	[Theory]
	[InlineData("")]
	[InlineData("   ")]
	[InlineData(null)]
	public async Task CreateCategory_ConCodigoInvalido_DebeLanzarArgumentException(string invalidCode)
	{
		// Arrange
		var category = CategoryBuilder.Default()
			.WithCode(invalidCode)
			.Build();

		// Act & Assert
		await Assert.ThrowsAsync<ArgumentException>(() => _service.CreateAsync(category));
	}

	[Fact]
	public async Task GetById_ConIdExistente_DebeRetornarLaCategoria()
	{
		// Arrange
		var category = CategoryBuilder.Default().Build();
		await _service.CreateAsync(category);

		// Act
		var result = await _service.GetByIdAsync(category.Id);

		// Assert
		Assert.NotNull(result);
		Assert.Equal(category.Id, result.Id);
	}

	[Fact]
	public async Task GetById_ConIdNoExistente_DebeRetornarNulo()
	{
		// Act
		var result = await _service.GetByIdAsync(99999);

		// Assert
		Assert.Null(result);
	}

	[Fact]
	public async Task UpdateCategory_ConDatosValidos_DebeGuardarLosCambios()
	{
		// Arrange
		var original = CategoryBuilder.Default().Build();
		await _service.CreateAsync(original);

		var updated = CategoryBuilder.Default()
			.WithId(original.Id)
			.WithDescription("Nueva descripción")
			.Build();

		// Act
		var result = await _service.UpdateAsync(updated);

		// Assert
		Assert.Equal("Nueva descripción", result.Description);
	}

	[Fact]
	public async Task DeleteCategory_ConIdExistente_DebeEliminarDeLaBaseDatos()
	{
		// Arrange
		var category = CategoryBuilder.Default().Build();
		await _service.CreateAsync(category);

		// Act
		await _service.DeleteAsync(category.Id);

		// Assert
		var stored = await _db.Categories.FindAsync(category.Id);
		Assert.Null(stored);
	}

	[Fact]
	public async Task ListCategories_DebeRetornarTodasLasCategoriasCreadas()
	{
		// Arrange
		await _service.CreateAsync(CategoryBuilder.Default().WithId(1).WithCode("A").Build());
		await _service.CreateAsync(CategoryBuilder.Default().WithId(2).WithCode("B").Build());

		// Act
		var result = await _service.ListAsync();

		// Assert
		Assert.Equal(2, result.Count);
	}
}
```

## 5. Tests with Mocked External Dependencies

Mock only true external boundaries (email/SMS providers, HTTP clients) — never the in-memory `DbContext`.

```csharp
using Xunit;
using Moq;
using ProjectAPI.Services;
using ProjectAPI.External;

namespace ProjectAPI.Tests.Notifications;

public class NotificationServiceTests
{
	private readonly Mock<IEmailProvider> _mockEmail = new();
	private readonly Mock<ISmsProvider> _mockSms = new();
	private readonly NotificationService _service;

	public NotificationServiceTests()
	{
		_service = new NotificationService(_mockEmail.Object, _mockSms.Object);
	}

	[Fact]
	public async Task SendEmail_ConDatosValidos_DebeInvocarAlProveedorDeEmail()
	{
		// Arrange
		const string email = "user@example.com";

		// Act
		await _service.SendEmailAsync(email, "Subject", "Body");

		// Assert
		_mockEmail.Verify(x => x.SendAsync(email, "Subject", "Body"), Times.Once);
	}

	[Fact]
	public async Task SendNotification_SiElEmailFalla_DebeUsarSmsComoAlternativa()
	{
		// Arrange
		_mockEmail
			.Setup(x => x.SendAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
			.ThrowsAsync(new Exception("Email provider failure"));

		// Act
		await _service.SendNotificationAsync("user@example.com", "600123456", "Aviso");

		// Assert
		_mockSms.Verify(x => x.SendAsync(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
	}
}
```

## Running Tests

```bash
dotnet test Project.Tests.csproj --verbosity normal
dotnet test Project.Tests.csproj --collect:"XPlat Code Coverage"
```
