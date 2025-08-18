import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <div className="group border rounded-lg overflow-hidden bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CarouselSkeleton() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <div className="relative mx-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-3 h-3 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
