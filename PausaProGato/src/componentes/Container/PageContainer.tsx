interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-orange-100 dark:bg-paw-darkBg text-orange-900 dark:text-paw-darkText transition-colors duration-500">
      {children}
    </div>
  );
}
