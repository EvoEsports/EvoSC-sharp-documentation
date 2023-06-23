# Migrations
Modules can add their own database migrations. To do so, we use the [FluentMigrator](https://fluentmigrator.github.io/) library.

There is nothing special or any extra thing to pay attention to other than the naming convention which we will go over. Create the migration class with the attribute which inherits the `Migration` class.

For example:

```csharp
[Migration(1672217440)]
public class AddMyTable : Migration
{
    public override void Up()
    {
        Create.Table("MyTable");
    }

    public override void Down()
    {
        Delete.Table("MyTable");
    }
}
```

The important part here is the naming convention. For the `Migration` attribute, we want to use the UNIX Timestamp in seconds as the version. The name of the file should be YYYYMMDDHHmm_MigrationName, where YY is the 4-digit year, MM is the 2-digit month, D is the 2-digit day of the month, HH is the 2-digit hour and mm is the 2-digit minute.

The time and date for the version and file name must be set to creation time of the migration.
