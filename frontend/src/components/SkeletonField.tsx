import { ReactNode } from "react";

type SkeletonFieldProps = {
  loading: boolean;
  skeletonClassName?: string;
  children: ReactNode;
};

export function ProfileSkeletonField({
  loading,
  skeletonClassName,
  children,
}: SkeletonFieldProps) {
  const resolvedSkeletonClassName =
    skeletonClassName ?? "h-4 w-36 align-middle";

  if (loading) {
    return (
      <span
        aria-hidden
        className={`inline-block animate-pulse rounded bg-white/20 ${resolvedSkeletonClassName}`}
      />
    );
  }

  return <>{children}</>;
}
