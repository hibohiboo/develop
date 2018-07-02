DROP DATABASE IF EXISTS northwind;

CREATE DATABASE IF NOT EXISTS northwind;

USE northwind;

/*==============================================================*/
/* Table: Customer                                              */
/*==============================================================*/
create table `Customer` (
   `Id` INTEGER NOT NULL AUTO_INCREMENT,
   `FirstName` VARCHAR(15) NOT NULL,
   `LastName`  VARCHAR(15) NOT NULL,
   `City`   VARCHAR(40) NOT NULL,
   `Country`  VARCHAR(40),
   `Phone`    VARCHAR(20),
   constraint `PK_CUSTOMER` primary key (`Id`)
);

/*==============================================================*/
/* Index: IndexCustomerName                                     */
/*==============================================================*/
create index IndexCustomerName on `Customer` (
`LastName`, `FirstName`);

/*==============================================================*/
/* Table: "Order"                                               */
/*==============================================================*/
create table `Order` (
   `Id`  INTEGER NOT NULL AUTO_INCREMENT,
   `OrderDate`  datetime DEFAULT CURRENT_TIMESTAMP,
   `OrderNumber` VARCHAR(10),
   `CustomerId` INTEGER,
   `TotalAmount` DECIMAL(10,4) DEFAULT 0,
   constraint `PK_ORDER` primary key (`Id`)
);

/*==============================================================*/
/* Index: IndexOrderCustomerId                                  */
/*==============================================================*/
create index `IndexOrderCustomerId` on `Order` (
`CustomerId`
);

/*==============================================================*/
/* Index: IndexOrderOrderDate                                   */
/*==============================================================*/
create index `IndexOrderOrderDate` on `Order` (
`OrderDate`
);

/*==============================================================*/
/* Table: OrderItem                                             */
/*==============================================================*/
create table `OrderItem` (
   `Id`  INTEGER NOT NULL AUTO_INCREMENT,
   `OrderId` int,
   `ProductId` int,
   `UnitPrice` decimal(12,2) default 0,
   `Quantity`int default 1,
   constraint `PK_ORDERITEM` primary key (`Id`)
);

/*==============================================================*/
/* Index: IndexOrderItemOrderId                                 */
/*==============================================================*/
create index `IndexOrderItemOrderId` on `OrderItem` (
`OrderId`
);

/*==============================================================*/
/* Index: IndexOrderItemProductId                               */
/*==============================================================*/
create index `IndexOrderItemProductId` on `OrderItem` (
`ProductId`
);

/*==============================================================*/
/* Table: Product                                               */
/*==============================================================*/
create table `Product` (
   `Id` INTEGER NOT NULL AUTO_INCREMENT,
   `ProductName` VARCHAR(50) NOT NULL,
   `SupplierId`           int                  not null,
   `UnitPrice`            decimal(12,2)        default 0,
   `Package`    VARCHAR(30),
   `IsDiscontinued`       bit                  not null default 0,
   constraint `PK_PRODUCT` primary key (`Id`)
)
;

/*==============================================================*/
/* Index: IndexProductSupplierId                                */
/*==============================================================*/
create index `IndexProductSupplierId` on `Product` (
`SupplierId`
);

/*==============================================================*/
/* Index: IndexProductName                                      */
/*==============================================================*/
create index `IndexProductName` on `Product` (
`ProductName`
);

/*==============================================================*/
/* Table: Supplier                                              */
/*==============================================================*/
create table `Supplier` (
   `Id`  INTEGER NOT NULL AUTO_INCREMENT,
   `CompanyName`  VARCHAR(40) NOT NULL,
   `ContactName` VARCHAR(50),
   `ContactTitle` VARCHAR(40),
   `City` VARCHAR(40),
   `Country` VARCHAR(40),
   `Phone` VARCHAR(30),
   `Fax` VARCHAR(30),
   constraint `PK_SUPPLIER` primary key (`Id`)
);

/*==============================================================*/
/* Index: IndexSupplierName                                     */
/*==============================================================*/
create index `IndexSupplierName` on `Supplier` (
`CompanyName`);

/*==============================================================*/
/* Index: IndexSupplierCountry                                  */
/*==============================================================*/
create index `IndexSupplierCountry` on `Supplier` (
`Country`
);

alter table `Order`
   add constraint `FK_ORDER_REFERENCE_CUSTOMER` foreign key (`CustomerId`)
      references `Customer` (`Id`);

alter table `OrderItem`
   add constraint `FK_ORDERITE_REFERENCE_ORDER` foreign key (`OrderId`)
      references `Order` (`Id`)
;

alter table `OrderItem`
   add constraint `FK_ORDERITE_REFERENCE_PRODUCT` foreign key (`ProductId`)
      references `Product` (`Id`)
;

alter table `Product`
   add constraint `FK_PRODUCT_REFERENCE_SUPPLIER` foreign key (`SupplierId`)
      references `Supplier` (`Id`)
;
