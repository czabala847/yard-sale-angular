interface CategoryInterface {
  id: number;
  name: string;
  typeImg: string;
}

export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryInterface;
  images: string[];
}
