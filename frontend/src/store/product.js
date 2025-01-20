import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProducts: async (newProducts) => {
    if (!newProducts.name || !newProducts.price || !newProducts.image) {
      return {
        success: false,
        message: "Please fill all the fields.",
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProducts),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create product.",
      };
    }

    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.product],
    }));

    return {
      success: true,
      message: "Successfully created product.",
    };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");

    if (!res.ok) {
      console.error("Failed to fetch products.");
      return;
    }

    const data = await res.json();
    set({ products: data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to delete product.",
      };
    }

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update product.",
      };
    }

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.product : product
      ),
    }));

    return { success: true, message: "Product updated successfully." };
  },
}));
