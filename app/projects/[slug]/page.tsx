import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function LegacyProjectRoute({ params }: Props) {
  const { slug } = await params;
  redirect(`/work/${slug}`);
}
