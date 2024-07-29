import axios from 'axios';
import { useEffect, useState } from 'react';

// Make a request for a user with a given ID

const baseURL = 'http://localhost/school1//wp-json/wp/v2/wyjazd_zimowy?acf_format=standard'
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

    console.log(post)
    const listItems = post.map(product =>
        <li key={product.id}>
            {/* <p> {product.id} </p> */}
            <div className='row'>
                <h1 id='wpis_title'> {product.title.rendered}</h1>
                <p>{product.date.substring(0, 10)}</p>
            </div>
            <div className='row'>
                <div className='col'>
                    <img alt={product.acf.zdj.id}
                        src={product.acf.zdj.url}
                        width="500" height="300"

                    />
                </div>
                <div className='col' id='opis'>
                    <p> {product.acf.opis}</p>
                </div>





                {/* <p>{product.acf.zdj}</p> */}
                {/* <div dangerouslySetInnerHTML={{ __html: product.acf.opis_extra }} /> */}
            </div>
        </li>
    );

    //console.log(post)
    if (!post) return null;
    return (

        <div className='container pt-3'>
            <div className='row' >
                <div className='col'>
                    {/* <h1>{post[0].id}</h1>
            <p>{post[0].title.rendered}</p>
            <p>{post[0].acf.op>is}</p>
            <p>opublikowano: {post[0].date}</p>
            <div dangerouslySetInnerHTML={{ __html: post[0].acf.opis_extra }} /> */}


                    <ul>{listItems}</ul>
                </div>
            </div>
        </div>
    );

}