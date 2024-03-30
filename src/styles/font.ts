import { Inter, Rubik_Mono_One, League_Spartan, Bungee, Quicksand } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-title",
});

export const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-title",
  weight: "400",
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
});