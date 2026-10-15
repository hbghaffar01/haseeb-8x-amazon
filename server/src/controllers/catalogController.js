import { catalogService } from "../services/catalogService.js";

export const catalogController = {
  listCategories(req, res) {
    res.json({ data: catalogService.getCategories() });
  },

  listProducts(req, res) {
    const { category, search, sort } = req.validated?.query ?? req.query;
    const data = catalogService.getProducts({ category, search, sort });
    res.json({ data, count: data.length });
  },

  getProduct(req, res) {
    const id = req.validated?.params?.id ?? req.params.id;
    const product = catalogService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ data: product });
  },
};
