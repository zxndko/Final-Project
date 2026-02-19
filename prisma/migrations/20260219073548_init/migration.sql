/*
  Warnings:

  - You are about to drop the column `specialty` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Doctor` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Doctor] ALTER COLUMN [name] NVARCHAR(1000) NULL;
-- Drop default constraint for `status` if it exists (SQL Server requires removing constraint first)
DECLARE @defName NVARCHAR(256);
SELECT @defName = dc.name
FROM sys.default_constraints dc
JOIN sys.columns c ON c.default_object_id = dc.object_id
WHERE OBJECT_NAME(c.object_id) = 'Doctor' AND c.name = 'status';
IF @defName IS NOT NULL
BEGIN
  EXEC('ALTER TABLE [dbo].[Doctor] DROP CONSTRAINT ' + @defName);
END;

ALTER TABLE [dbo].[Doctor] DROP COLUMN [specialty], [status];
ALTER TABLE [dbo].[Doctor] ADD [expertise] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
