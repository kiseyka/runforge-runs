import { BackLink } from "../../components/BackLink/BackLink";
import { StateMessage } from "../../components/StateMessage/StateMessage";

export function NotFoundPage() {
  return (
    <StateMessage
      title="Page not found"
      description="The page you're looking for doesn't exist."
      action={<BackLink />}
    />
  );
}
