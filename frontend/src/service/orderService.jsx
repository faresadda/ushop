import { toast } from "react-toastify";

export async function addOrder(req) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
      },
      body: JSON.stringify(req),
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

export async function getOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
