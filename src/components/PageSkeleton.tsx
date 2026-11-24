import { LoadingRegion, Skeleton, SkeletonCard } from 'flux-ds';

// Skeleton that mirrors the layout of each screen, shown the first time a screen loads.
export function PageSkeleton({ kind }: { kind: string }) {
  const chips = (
    <div className="row">
      <Skeleton width={56} height={36} radius="lg" />
      <Skeleton width={64} height={36} radius="lg" />
      <Skeleton width={72} height={36} radius="lg" />
    </div>
  );
  let body: React.ReactNode;
  switch (kind) {
    case 'installs/home':
      body = (
        <>
          <SkeletonCard lines={2} tags />
          <SkeletonCard lines={4} />
          <Skeleton height={48} radius="sm" />
        </>
      );
      break;
    case 'installs/systems':
    case 'buy/catalogue':
      body = (
        <>
          {chips}
          <Skeleton height={48} radius="sm" />
          <SkeletonCard lines={2} tags />
          <SkeletonCard lines={2} tags />
          <SkeletonCard lines={2} tags />
        </>
      );
      break;
    case 'academy/learn':
      body = (
        <>
          {chips}
          <SkeletonCard media lines={1} />
          <SkeletonCard lines={1} />
          <SkeletonCard lines={1} />
        </>
      );
      break;
    case 'partner/overview':
      body = (
        <>
          <Skeleton height={40} width="50%" />
          <Skeleton height={200} radius="md" />
          <SkeletonCard lines={4} />
        </>
      );
      break;
    default:
      body = (
        <>
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </>
      );
  }
  return (
    <LoadingRegion>
      <div className="page">{body}</div>
    </LoadingRegion>
  );
}
