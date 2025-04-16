import { Portfolio } from '../types/supabase';
import Image from 'next/image';

interface PortfolioGridProps {
  items: Portfolio[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-90">{item.description}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-pink-500 rounded-full text-xs">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 