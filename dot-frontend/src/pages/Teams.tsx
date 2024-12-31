import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Teams = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);
  return <div>HELLO</div>;
};
