import useSWR from 'swr';
import apiStrapiService from '..';

export const useProductsGet = () => useSWR('/products', apiStrapiService.productsGet);
export const useProductsGetPage = ({ page, rowsPerPage }: { page: number; rowsPerPage: number }) =>
  useSWR(`/products?pagination[page]=${page}&pagination[pageSize]=${rowsPerPage}`, async () => {
    const products = await apiStrapiService.productsGet({
      paramsUrl: {
        'pagination[pageSize]': rowsPerPage,
        'pagination[page]': page,
      },
    });
    return products.data;
  });

export const useProductDetailGet = (productId: string) =>
  useSWR(
    {
      productId,
    },
    ({ productId }) => {
      return apiStrapiService.productDetailGet({
        paramsUrl: { id: productId },
      });
    }
  );
