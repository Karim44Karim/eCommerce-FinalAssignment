import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import React, { ReactNode } from 'react';

type AppButtonProps = React.ComponentProps<typeof Button> & {
  children: ReactNode;
  isLoading?: boolean;
};

export default function AppButton({ children, isLoading = false, ...props }: AppButtonProps) {
  return (
    <Button type="submit" {...props}>
      {isLoading && (
        <Spinner
          size="sm"
          aria-label="loading spinner"
          className="me-3"
        />
      )}
      {children}
    </Button>
  );
}
