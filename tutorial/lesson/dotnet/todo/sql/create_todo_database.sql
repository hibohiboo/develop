use TestDB
create Table TodoItems
 (
  Id int identity(1,1) not null,
  Name nvarchar(255),
  IsComplete bit not null,
  CONSTRAINT PK_TodoItem_Id PRIMARY KEY CLUSTERED (Id)
)