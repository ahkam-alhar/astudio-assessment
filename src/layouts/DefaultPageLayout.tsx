import { ReactNode } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

interface DefaultPageLayoutProps {
  isLoading: boolean;
  title: string;
  children: ReactNode;
}

const DefaultPageLayout: React.FC<DefaultPageLayoutProps> = ({
  isLoading,
  title,
  children,
}) => {
  return (
    <div className="container py-8 flex flex-col items-center">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default DefaultPageLayout;
