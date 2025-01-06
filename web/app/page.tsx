import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SanityDocument } from "next-sanity";
import { PageBuilderType } from "@/lib/sanity/types";
import SectionView from "@/components/commons/sectionView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Perfect Match | Matrimony",
  description:
    "Join our matrimonial platform to create your profile, browse matches, and connect with potential partners. Start your journey towards a happy life today!",
  openGraph: {
    title: "Find Your Perfect Match | Matrimony",
    description:
      "Join our matrimonial platform to create your profile, browse matches, and connect with potential partners. Start your journey towards a happy life today!",
    siteName: "Yugal Matrimony",
  },
  robots: "follow, index",
};

export interface Page extends SanityDocument {
  slug: string;
  _id: string;
  // layoutProps: LayoutPropsType;
  pageBuilder?: PageBuilderType[];
}

export default async function Index() {
  const data = await client.fetch<Page>(query.groqQuery, { slug: "/" });

  const { label, logo } = data?.layoutProps?.header;

  return (
    <div key={data?._id}>
      <Header variant={data?.variant} label={label} logo={logo} />
      {/* <div className="py-10 max-h-max">
        <div className="w-full max-w-5xl mx-auto px-5">
          <h2 className="font-semibold text-2xl text-gray-700 mb-6">
            Next Steps
          </h2>

          <Link href={"/sign-in"}>Sign-in</Link>
        </div>
      </div> */}
      {Array.isArray(data?.pageBuilder) && data?.pageBuilder?.length > 0 ? (
        data?.pageBuilder?.map((block, index) => (
          <SectionView block={block} key={index} />
        ))
      ) : (
        <p>No content available</p>
      )}

      <Footer />
    </div>
  );
}
