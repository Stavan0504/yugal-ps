import Header from "@/components/header";
import Footer from "@/components/footer";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import HelpsandSupport from "@/components/HelpsandSupport";

export default async function Index() {
  const data = await client.fetch(query.groqQuery, { slug: "contact-us" });

  const { label, logo } = data.layoutProps.header;

  return (
    <div className="">
      <Header variant={data.variant} logo={logo} label={label} />
      <HelpsandSupport data={data?.pageBuilder || []} />
      {/* <Footer /> */}
      <Footer />
    </div>
  );
}
