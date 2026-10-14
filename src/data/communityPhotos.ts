// Approved HealthX photographs, saved in Supabase Storage.
const base = 'https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/community-photos/home';

export const communityPhotos = [
  { src: `${base}/l1000039.jpg`, caption: 'Students watching a medical robotics demonstration at Collab Novena', position: '60% center' },
  { src: `${base}/l1000054.jpg`, caption: 'HealthX students and hosts at Collab Novena', position: 'center 65%' },
  { src: `${base}/l1020381.jpg`, caption: 'HealthX students discussing ideas around a table', position: 'center' },
];

export const communityGallery = [
  { src: `${base}/photo_2026-10-03_01-06-33.jpg`, label: 'HealthX seminar community' },
  { src: `${base}/l1000043.jpg`, label: 'Learning about medical robotics' },
  { src: `${base}/photo_2026-10-07_21-31-59.jpg`, label: 'Our student community' },
  { src: `${base}/l1000054.jpg`, label: 'Visiting Collab Novena' },
];

const aboutBase = 'https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/community-photos/about';
export const aboutPhoto = {
  src: `${aboutBase}/l1020184-800.webp`,
  srcSet: `${aboutBase}/l1020184-800.webp 800w, ${aboutBase}/l1020184-1600.webp 1600w`,
  caption: 'NUS HealthX members gathered in a classroom',
};
