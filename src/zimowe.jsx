import axios from 'axios';
import { useEffect, useState } from 'react';

// Make a request for a user with a given ID

const baseURL = 'http://localhost/school1//wp-json/wp/v2/wyjazd_zimowy'
export default function InfoZimowe() {

    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getInfo() {
            await axios.get(baseURL).then((response) => {
                setPost(response.data);
                console.log(response.data)
            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
        getInfo()
    }, [])
    //console.log(post)
    if (!post) return null;
    return (
        <div>
            <h1>{post[0].id}</h1>
            <p>{post[0].title.rendered}</p>
            <p>{post[0].acf.opis}</p>
            <p>opublikowano: {post[0].date}</p>
            <div dangerouslySetInnerHTML={{ __html: post[0].acf.opis_extra }} />


        </div>
    );

}