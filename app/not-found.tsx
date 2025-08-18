import { NotFoundPage } from '@/components/home';
import { notFoundMetadata } from '@/config/site';

export const metadata = notFoundMetadata;

export default function NotFound() {
  return (
    <NotFoundPage 
      title="404"
      description="Página no encontrada, vuelve a la página de inicio"
      imageSrc="/_static/illustrations/rocket-crashed.svg"
      imageAlt="404 - Página no encontrada"
      linkText="página de inicio"
      linkHref="/"
    />
  );
}
