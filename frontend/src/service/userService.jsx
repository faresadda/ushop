import { toast } from "react-toastify";

export async function register(userData) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function login(userData) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function verifyEmail(verificationCode, id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/verifyemail/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
        },
        body: JSON.stringify({
          verificationCode: verificationCode,
          type: localStorage.getItem("type"),
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function forgotPassword(email) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/forgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
        },
        body: JSON.stringify(email),
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function resetPassword(password, id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/resetpassword/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
        },
        body: JSON.stringify({
          password: password,
          verificationCode: localStorage.getItem("verificationCode"),
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function resendCode(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/resendcode/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/user/${id}`, {
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
    console.error("Login error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function deleteUser(id, password) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password: password }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Delete user error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function updateUser(id, body) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Delete user error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function updatePassword(id, currentPassword, newPassword) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/updatepassword/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: currentPassword,
          newPassword: newPassword,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Delete user error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function addPhone(id, phone) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/addphone/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phone: phone }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
  }
}

export async function addAddress(id, address) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/addaddress/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_MY_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ address: address }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Try again");
  }
}

export async function getUsers() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/users`, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Get users error:", err);
    toast.error("Try again");
    return null;
  }
}

export async function getAdmins() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL_API}/admins`, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_MY_API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Get users error:", err);
    toast.error("Try again");
    return null;
  }
}
