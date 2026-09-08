import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;       // ms stagger
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function FadeIn({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('in-view'), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    // @ts-ignore: dynamic tag
    <Tag ref={ref} className={`fade-up ${className}`}>
      {children}
    </Tag>
  );
}
