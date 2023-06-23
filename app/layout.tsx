import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import Analytics from "@/components/Analytics";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "ForGePT",
  description: "Solve your Foundry related queries with this AI bot!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
