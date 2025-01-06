import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await client.fetch(query.layoutProps);
  const { logo, label } = headerData.header;
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center">
        <Header logo={logo} label={label} />
        <div className="w-full">{children}</div>
        <Toaster richColors />
        <Footer />
      </div>
    </>
  );
}
