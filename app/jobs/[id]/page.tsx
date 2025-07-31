import JobDetail from "@/views/JobDetailsPage";
import { indianJobsData } from "@/lib/constants/jobs";

export async function generateStaticParams() {
  return indianJobsData.map((job) => ({
    id: job.id,
  }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetail jobId={id} />;
}
