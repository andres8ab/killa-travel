import { Skeleton } from '@/components/ui/skeleton'

export default function Homepageloading() {
  return (
    <div className="w-2/3 mx-auto mt-10">
      <Skeleton className="h-8 w-28 mb-6" />
      <Skeleton className="w-36 h-6 mb-4" />

      <Skeleton className="h-8 w-24 ml-96" />
      <div className="mt-8 flex justify-between gap-x-24">
        <div className="w-2/3 mt-6">
          <Skeleton className="h-4 w-80 my-12" />
          <Skeleton className="h-4 w-80 my-12" />
          <Skeleton className="h-4 w-80 my-12" />
          <Skeleton className="h-4 w-80 my-12" />
        </div>
      </div>
    </div>
  )
}
