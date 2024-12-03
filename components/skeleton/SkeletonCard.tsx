
import { Skeleton } from 'primereact/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function SkeletonCard ()  {

    return(
        <>
        <Card >
        <CardHeader>
          <Skeleton width="70%" height="1.5rem" className="mb-2" />
          <Skeleton width="40%" height="1rem" />
        </CardHeader>
        <CardContent>
          <Skeleton height="1.5rem" className="mb-2" />
          <Skeleton height="1.5rem" className="mb-2" />
          <Skeleton height="1.5rem" className="mb-2" />
          <Skeleton width="50%" height="1rem" />
        </CardContent>
      </Card>
      </>
    )

}

