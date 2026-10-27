export type AdminFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type AdminFaqGroup = {
  id: string;
  category: string;
  items: AdminFaqItem[];
};
