import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

// Make a request for a user with a given ID

const baseURL = 'http://localhost/school1//wp-json/wp/v2/wyjazd_zimowy?acf_format=standard'
export default function InfoZimowe() {

    const [post, setPost] = useState([])
    let elementRef = useRef(null)

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



    //console.log(oldPosts)
    function handleClick(number) {
        elementRef.current = post
        setPost(post.filter(item => (item.id == number)))
        const el = document.getElementsByClassName('button_normal')[0]
        const el2 = document.getElementsByClassName('button_wstecz')[0]
        el.style.visibility = 'hidden'
        el2.style.visibility = 'visible'

    }

    function handleClickBack() {
        setPost(elementRef.current)
        console.log(elementRef.current)
        const el = document.getElementsByClassName('button_normal')[0]
        const el2 = document.getElementsByClassName('button_wstecz')[0]
        el.style.visibility = 'visible'
        el2.style.visibility = 'hidden'
    }


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
                    <button className='button_normal' onClick={() => handleClick(product.id)}>Więcej</button>
                    <button className='button_wstecz' onClick={() => handleClickBack()}>Wstecz</button>
                </div>
            </div>
        </li>
    );

    //console.log(post)
    if (!post) return null;
    return (

        <div className='container pt-3'>
            <div className='row' >
                <div className='col'>
                    <ul>{listItems}</ul>
                </div>
            </div>
        </div>
    );

}