import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin: '50px 0px'
  });

  return [ref, inView] as const;
};

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};