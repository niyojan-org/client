'use client';
import { useUserStore } from "@/store/userStore";
import React, { useState } from "react";

function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useUserStore();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    try {
      const res = await login(formData);
      if (res) {
        console.log("done");
      }else{
        console.log("not done");
      }
    } catch (error) {}
  };
  return (
    <div className="mt-30">
      <form action="" onSubmit={handelSubmit}>
        <input type="text" onChange={handelChange} name="email" />
        <input type="password" onChange={handelChange} name="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default page;
