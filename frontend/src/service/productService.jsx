import { toast } from "react-toastify";

export async function addProduct(formData, calculateDiscount) {
  // Create FormData object
  const newData = new FormData();
  if (
    formData.image &&
    formData.name &&
    formData.description &&
    formData.price &&
    formData.stock &&
    formData.category
  ) {
    newData.append("image", formData.image);
    newData.append("name", formData.name);
    newData.append("description", formData.description);
    newData.append("price", formData.price);
    newData.append("stock", formData.stock);
    newData.append("category", formData.category);
  } else {
    toast.error("Fill in all required fields");
    return;
  }

  // Add other fields
  newData.append("oldPrice", formData.oldPrice);
  newData.append("attributes", JSON.stringify(formData.attributes));
  newData.append(
    "discount",
    calculateDiscount(formData.price, formData.oldPrice)
  );
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/product`, {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: newData,
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    return data;
  } catch (error) {
    console.error("Add product error:", error);
    toast.error("Try again");
    return null;
  }
}

export async function getProducts() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/product`, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Try again");
    return null;
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/product/${id}`,
      {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Try again");
    return null;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    toast.error("Try again");
    return null;
  }
}

export async function updateProduct(productID, formData, calculateDiscount) {
  // Create FormData object
  const newData = new FormData();

  if (
    formData.image &&
    formData.name &&
    formData.description &&
    formData.price &&
    formData.stock &&
    formData.category
  ) {
    newData.append("image", formData.image);
    newData.append("name", formData.name);
    newData.append("description", formData.description);
    newData.append("price", formData.price);
    newData.append("stock", formData.stock);
    newData.append("category", formData.category);
  } else {
    toast.error("Fill in all required fields");
    return;
  }

  // Add other fields
  newData.append("oldPrice", formData.oldPrice);
  newData.append("attributes", JSON.stringify(formData.attributes));
  newData.append(
    "discount",
    calculateDiscount(formData.price, formData.oldPrice)
  );

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/product/${productID}`,
      {
        method: "PUT",
        headers: {
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: newData,
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Update product error:", error);
    toast.error("Try again");
    return null;
  }
}
