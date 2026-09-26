import HomeExperience from "@/components/HomeExperience";
import { getHomepageContent } from "@/lib/cms";

export default async function HomePage() {
  const content = await getHomepageContent();
  return <HomeExperience {...content} />;
}
