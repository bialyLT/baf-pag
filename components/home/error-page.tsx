import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export function ErrorPage({ 
  title = "Algo no anduvo como se esperaba!",
  description,
  actionText = "Inténtalo de nuevo.",
  onAction
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
      </div>
      
      {onAction && (
        <Button
          type="submit"
          variant="default"
          onClick={onAction}
          className="mt-4"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
