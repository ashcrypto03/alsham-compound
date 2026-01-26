import React, { useState } from 'react';
import { ArrowUpLeft } from 'lucide-react';

export const PreviousWork: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const projects = [
    { 
      id: 1, 
      title: 'مشروع الروابي', 
      type: 'residential', 
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'برج النخبة', 
      type: 'commercial', 
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      title: 'فيلات الياسمين', 
      type: 'residential', 
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      title: 'مجمع السعادة', 
      type: 'residential', 
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      title: 'سنتر المدينة', 
      type: 'commercial', 
      image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 6, 
      title: 'شقق العقيق', 
      type: 'residential', 
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80' 
    },
  ];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">أعمالنا السابقة</h2>
            <p className="text-gray-600 dark:text-gray-400">سجل حافل من المشاريع الناجحة</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'residential', label: 'سكني' },
              { id: 'commercial', label: 'تجاري' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === f.id 
                    ? 'bg-gray-900 dark:bg-primary-600 text-white shadow' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg">
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${
                  project.type === 'residential' ? 'text-accent-400' : 'text-primary-400'
                }`}>
                  {project.type === 'residential' ? 'سكني' : 'تجاري'}
                </span>
                <h3 className="text-white text-xl font-bold flex items-center justify-between">
                  {project.title}
                  <ArrowUpLeft size={20} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};