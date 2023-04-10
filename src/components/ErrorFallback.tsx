import { Alert, Button } from "@mantine/core";
import { AlertCircle, Refresh } from "tabler-icons-react";
import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <>
      <Alert
        icon={<AlertCircle />}
        title="Something went wrong"
        color="red"
        mb="lg"
      >
        {error.message}
      </Alert>
      <Button
        leftIcon={<Refresh size="1rem" />}
        variant="light"
        compact
        onClick={resetErrorBoundary}
      >
        Reset the page
      </Button>
    </>
  );
}
