import { useRef } from 'react';
import { useAuth } from "./Api.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const BASE_URL = "http://127.0.0.1:8000";


const BlogCreate = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const detailRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const detail = detailRef.current.value;
    const text = descRef.current.value;
    const image = imageRef.current.files;


    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("text", text);
    formData.append("image", image[0]);

    try {
      const response = await axios.post(`${BASE_URL}/site/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${cookies.token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <p>Başlık;</p>
      <input type="text" placeholder="title" ref={titleRef} />
      <p>Açıklama;</p>
      <input type="text" placeholder="desc" ref={descRef} />
      <p>Detaylar;</p>
      <input type="text" placeholder="detail" ref={detailRef} />
      <p>Fotoğraf;</p>
      <input type="file" placeholder="image" ref={imageRef} />
      <button type="submit">Oluştur</button>
    </form>
  );
};

export default BlogCreate;