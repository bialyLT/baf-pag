'use client';

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Error interno del servidor</h2>
            <p className="text-muted-foreground mb-4">
              Ha ocurrido un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Recargar página
          </button>
        </div>
      </body>
    </html>
  );
}
