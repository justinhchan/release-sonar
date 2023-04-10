import { Skeleton } from "@mantine/core";

export default function ReleaseSkeleton() {
  return (
    <>
      <Skeleton height={150} width={150} mb="md" />
      <Skeleton height={8} mt={6} width={150 * 0.8} radius="lg" />
      <Skeleton height={8} mt={6} width={150 * 0.8} radius="lg" />
      <Skeleton height={8} mt={6} width={150 * 0.8} radius="lg" />
    </>
  );
}
