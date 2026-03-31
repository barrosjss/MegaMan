import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos | Jesús Barros",
  description: "Línea de tiempo cronológica de los proyectos que he diseñado, programado y lanzado.",
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
