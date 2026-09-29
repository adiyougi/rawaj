import RawajHome from "@/components/home/RawajHome";
import { getHomepageContent } from "@/lib/cms";

export default async function HomePage() {
  const content = await getHomepageContent();
  return <RawajHome {...content} />;
}
