import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miriam Rodrigues Santos — Advocacia Trabalhista",
  description: "Advogada especializada em Direito do Trabalho. Rescisões, horas extras, assédio e FGTS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
