import axios from 'axios';
import { useEffect, useState } from 'react';

// Make a request for a user with a given ID

const baseURL = 'http://localhost/school1//wp-json/wp/v2/wyjazd_zimowy'
export default function InfoZimowe() {

    const [post, setPost] = useState([]);

    useEffect(() => {
        async function getInfo() {
            await axios.get(baseURL).then((response) => {
                setPost(response.data);
                //console.log(response.data)

            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                    //console.log(post)
                });
        }
        getInfo()


    }, [])


    // const listItems = post.map(product =>
    //     <li key={product.id}>
    //         {product.title}
    //     </li>
    // );

    //console.log(post)
    const listItems = post.map(product =>
        <li key={product.id}>
            <p className='btn btn-primary'> {product.id} </p>
            <p> {product.title.rendered}</p>
            <p> {product.acf.opis}</p>
            <div dangerouslySetInnerHTML={{ __html: product.acf.opis_extra }} />
        </li>
    );

    //console.log(post)
    if (!post) return null;
    return (

        <div className='container-fluid'>
            <div>
                <div className='col'>
                    {/* <h1>{post[0].id}</h1>
            <p>{post[0].title.rendered}</p>
            <p>{post[0].acf.op>is}</p>
            <p>opublikowano: {post[0].date}</p>
            <div dangerouslySetInnerHTML={{ __html: post[0].acf.opis_extra }} /> */}
                    test

                    <ul>{listItems}</ul>
                </div>
            </div>
        </div>
    );

}