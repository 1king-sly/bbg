import React from "react";
import { PackageOpen } from "lucide-react";


export default function EmptyState({ message }:{message:string}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 text-center gap-10">
      <PackageOpen className="w-24 h-24 text-primary" />
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
}
