import React from "react";
import {useQuery,} from 'react-query'
import { useCookies } from "react-cookie";


const Profile = ({username}) => {

    const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

    const token = cookies.token;
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        },
    };


    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('/auth/profilevalues/me/                                                                                                                                                                                             ', {
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then(
            (res) => res.json(),
          ),
          refetchOnWindowFocus:false,
      })
      
  if (error) {
    return <div>Profiliniz Yüklenirken Hatayla Karşılaşıldı: {error} </div>;
  }

  if (isLoading) {
    return <div> Profiliniz Yükleniyor.. </div>;
  }

    return(
        <div>
            {console.log(data)}
            <h2>Profil Bilgileriniz;</h2>
            <>
                <h5>Kullanıcı Adı: {username}</h5>
                <p>Profil Resmi:</p>
                <img src={data.profile_picture} width="120px" alt="Profil Resmi"/>
                <p>Biografi: {data.bio} </p>
                <p>Doğum Tarihi: {data.date_of_birth}</p>

                <a href="/Profile/change">
                  <p>Degiştirmek İçin Tıkla</p>
                </a>
            </>
        </div>
        
    )
}

export default Profile;

