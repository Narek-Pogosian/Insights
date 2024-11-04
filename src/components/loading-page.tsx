import { Loader2 } from "lucide-react";

function LoadingPage() {
  return (
    <div className="grid place-content-center pt-28">
      <Loader2 className="size-20 animate-spin" />
    </div>
  );
}

export default LoadingPage;
