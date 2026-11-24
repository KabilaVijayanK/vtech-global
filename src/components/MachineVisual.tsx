import { useState } from 'react';
import { Cog } from 'lucide-react';

interface MachineVisualProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export default function MachineVisual({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  priority = false,
}: MachineVisualProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#f5f7fa] ${aspectClass} ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a2a4e] to-[#1a2a8c] p-6 text-center text-white">
          <Cog className="mb-3 h-10 w-10 text-white/75" aria-hidden="true" />
          <span className="max-w-xs text-sm font-medium text-white/90">{alt}</span>
        </div>
      )}
    </div>
  );
}
