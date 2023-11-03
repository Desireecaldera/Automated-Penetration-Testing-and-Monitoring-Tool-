FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app

ENV ASPNETCORE_URLS http://+:5000;
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["APTMT/APTMT.csproj", "APTMT/"]
RUN dotnet restore "APTMT/APTMT.csproj"
COPY . .
WORKDIR "/src/APTMT"
RUN dotnet build "APTMT.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "APTMT.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "APTMT.dll"]