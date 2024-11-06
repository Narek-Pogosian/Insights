import { Loader2 } from "lucide-react";

function LoadingPage() {
  return (
    <div className="grid place-content-center pt-28 lg:pt-44">
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
}

export default LoadingPage;
