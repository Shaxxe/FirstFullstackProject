import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const ProfileChange = () => {
    const [cookies] = useCookies(["token"]);
    const [formData, setFormData] = useState({
        bio: "",
        date_of_birth: "",
        profile_picture: null,
    });

    useEffect(() => {
        // Profil verilerini çekme işlemi burada yapılabilir
        fetch("/auth/profilevalues/me/", {
            method: "GET",
            headers: {
                Authorization: `Token ${cookies.token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setFormData({
                bio: data.bio,
                date_of_birth: data.date_of_birth,
                profile_picture: data.profile_picture,
            });
        })
        .catch((error) => {
            console.error("Profil Verileri Alınırken Hata:", error);
        });
    }, [cookies.token]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataUpload = new FormData();
        formDataUpload.append("bio", formData.bio);
        formDataUpload.append("date_of_birth", formData.date_of_birth);
        formDataUpload.append("profile_picture", formData.profile_picture);

        try {
            const response = await fetch("/auth/profilevalues/me/", {
                method: "PUT",
                headers: {
                    Authorization: `Token ${cookies.token}`,
                },
                body: formDataUpload,
            });
            // İşlem tamamlandığında bir bildirim veya yönlendirme yapılabilir
        } catch (error) {
            console.error("Profil Güncellenirken Hata ile Karşılaşıldı:", error);
        }
    };

    return (
        <div>
            <h2>Profil Bilgilerini Değiştir</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Biografi:
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Doğum Tarihi:
                        <input
                            type="text"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Profil Resmi:
                        <input
                            type="file"
                            name="profile_picture"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Değişiklikleri Kaydet</button>
            </form>
        </div>
    );
};

export default ProfileChange;
