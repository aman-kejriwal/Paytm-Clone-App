export function Card({
  // className,
  title,
  children,
  // href,
}: {
  // className?: string;
  title: string;
  children: React.ReactNode;
  // href: string;
}): JSX.Element {
  return (
    <a
      // className={className}
      // href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="bg-white p-8 rounded-md">
      <h2 className="text-sm border-b border-slate-300 pb-2">  
        {title} <span>-&gt;</span>
      </h2>
      <>{children}</>
      </div>
    </a>
  );
}
