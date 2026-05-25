import { Menu, Sun, Moon, UserCircle } from 'lucide-react';

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/8">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden text-white hover:text-white/80 transition-colors">
            <Menu size={18} />
          </button>
          <h1 className="text-base font-semibold text-white font-display">
            {title}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="text-white/50 hover:text-white transition-colors">
            <Sun size={18} className="hidden" />
            <Moon size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
            <UserCircle size={20} className="text-white/70" />
          </div>
        </div>
      </div>
    </header>
  );
}
