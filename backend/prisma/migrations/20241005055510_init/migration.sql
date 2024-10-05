-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,
    "resumen" VARCHAR(50) NOT NULL,
    "empleadoId" INTEGER NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
