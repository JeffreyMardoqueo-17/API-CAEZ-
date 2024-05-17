import { Direccion, Sexo, Role, Enfermedad, TipoDocumento, Grado,Mes, Turno } from './TablasIndependientes';
// Usuario
export interface User {
  id: number;
  name: string;
  lastName: string;
  login?: string; // nullable
  password: string;
  status: number;
  registrationDate: Date;
  roleId: number;
  role?: Role; // optional property referencing Role interface
}

// Padrino
export interface Padrino {
  id: number;
  nombre: string;
  apellido: string;
  sexoId: number;
  sexo?: Sexo; // optional property referencing Sexo interface
  roleId: number;
  role?: Role; // optional property referencing Role interface
  telefono: string;
  correo: string;
  direccionId: number;
  direccion?: Direccion; // optional property referencing Direccion interface
  administradorId: number;
  administrador?: User; // optional property referencing User interface
  fechaRegistro: Date;
}

// Encargado
export interface Encargado {
  id: number;
  nombre: string;
  apellido: string;
  sexoId: number;
  sexo?: Sexo; // optional property referencing Sexo interface
  roleId: number;
  role?: Role; // optional property referencing Role interface
  telefono: string;
  telEmergencia: string;
  correo: string;
  direccionId: number;
  direccion?: Direccion; // optional property referencing Direccion interface
  tipoDocumentoId: number;
  tipoDocumento?: TipoDocumento; // optional property referencing TipoDocumento interface
  numDocumento: string;
  administradorId: number;
  administrador?: User; // optional property referencing User interface
  fechaRegistro: Date;
}

// Alumno
export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  sexoId: number;
  sexo?: Sexo; // optional property referencing Sexo interface
  roleId: number;
  role?: Role; // optional property referencing Role interface
  encargadoId: number;
  encargado?: Encargado; // optional property referencing Encargado interface
  enfermedadId?: number; // nullable foreign key
  enfermedad?: Enfermedad; // optional property referencing Enfermedad interface
  tipoDocumentoId: number;
  tipoDocumento?: TipoDocumento; // optional property referencing TipoDocumento interface
  numDocumento: string;
  gradoId: number;
  grado?: Grado; // optional property referencing Grado interface
  grupoId?: number; // nullable foreign key
  grupo?: Grupo; // optional property referencing Grupo interface (defined later)
  turnoId: number;
  turno?: Turno; // optional property referencing Turno interface
  administradorId: number;
  administrador?: User; // optional property referencing User interface
  padrinoId?: number; // nullable foreign key
  padrino?: Padrino; // optional property referencing Padrino interface
  fechaRegistro: Date;
  esBecado: boolean;
}

// Grupo (separate interface since it references Alumno)
export interface Grupo {
  id: number;
  nombre: string;
  alumnoId?: number; // nullable foreign key
  alumno?: Alumno; // optional property referencing Alumno interface (circular reference handled)
}

// Pago
export interface Pago {
  id: number;
  alumnoId: number;
  alumno?: Alumno; // optional property referencing Alumno interface
  multa?: number; // nullable
  tipoPagoId?: number; // nullable foreign key
  tipoPago?: any; // could be another interface or type depending on your implementation
  descuento?: number; // nullable
  totalPagado: number;
  fechaRegistro: Date;
  administradorId: number;
  administrador?: User; // optional property referencing User interface
  descripcion: string;
}

// PagoMes
export interface PagoMes {
  id: number;
  pagoId: number;
  pago?: Pago; // optional property referencing Pago interface
  mesId: number;
  mes?: Mes; // optional property referencing Mes interface (assuming Mes interface exists)
}

// Factura
export interface Factura {
  id: number;
  pagoId?: number; // nullable foreign key
  pago?: Pago; // optional property referencing Pago interface
  alumnoId: number;
  alumno?: Alumno; // optional property referencing Alumno
}