import { toast } from "react-toastify";

export async function addOrderNoUser(req) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/addordernouser`, {
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

export async function addOrderUser(req) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/addorderuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization : `Bearer ${localStorage.getItem('token')}`
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

export async function getPendingOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getpendingorders`, {
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

export async function getCancelledOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getcancelledorders`, {
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

export async function getConfirmedOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getconfirmedorders`, {
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

export async function getShippedOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getshippedorders`, {
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

export async function getReturnedOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getreturnedorders`, {
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

export async function getDeliveredOrders() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getdeliveredorders`, {
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

export async function updateStatus(id,status) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/updatestatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({status:status})
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

export async function getUserOrders(id){
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/getuserorders/${id}`, {
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
