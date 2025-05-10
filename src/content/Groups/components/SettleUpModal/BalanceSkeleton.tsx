import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceSkeletonProps {
  count?: number;
}

const BalanceSkeleton = ({ count = 3 }: BalanceSkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="bg-[#141414] border-[#2a2a2a] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="mx-2 h-4 w-10" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="ml-3">
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-16 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BalanceSkeleton;
