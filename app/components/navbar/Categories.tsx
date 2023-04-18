'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { categories } from '@/app/Constants';

const Categories = () => {
 

  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        scrollbar-track-transparent
        scrollbar-thumb-gray-700
          scrollbar-thin
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories
