import Header from "@/components/header";
import Footer from "@/components/footer";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import ProfilePageContent from "@/components/ProfilePageContent";

export default async function Index() {
  const data = await client.fetch(query.layoutProps);
  const { label, logo } = data.header;

  return (
    <div className="">
      <Header logo={logo} label={label} />
      {/* <ProfilePage /> */}
      <ProfilePageContent />
      <Footer />
    </div>
  );
}
