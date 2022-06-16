import { CategoryInterface } from './category.model';

export interface ProductInterface {
  id: string;
  title: string;
  price: number;
  description: string;
  category: CategoryInterface;
  images: string[];
}

export interface ProductCreateDTOInterface
  extends Omit<ProductInterface, 'id' | 'category'> {
  categoryId: number;
}

export interface ProductUpdateDTOInterface
  extends Partial<ProductCreateDTOInterface> {}
