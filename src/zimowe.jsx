import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MyButton } from './mybutton.jsx'


const baseURL = 'http://localhost/school1//wp-json/wp/v2/wyjazd_zimowy?acf_format=standard'
export default function InfoZimowe() {

    const [post, setPost] = useState([])
    let elementRef = useRef(null)

    useEffect(() => {
        async function getInfo() {
            await axios.get(baseURL).then((response) => {
                setPost(response.data);

            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
        getInfo()


    }, [])

    function handleClick(number) {
        elementRef.current = post
        setPost(post.filter(item => (item.id == number)))
        for (let n = 0; n <= post.length - 1; n++) {
            const el = document.getElementsByClassName('button_normal')[n]
            const el2 = document.getElementsByClassName('button_wstecz')[n]
            el.style.display = 'none'
            el2.style.display = "inline"
        }

    }

    function handleClickBack() {
        setPost(elementRef.current)
        const el = document.getElementsByClassName('button_normal')[0]
        const el2 = document.getElementsByClassName('button_wstecz')[0]
        el.style.display = 'inline'
        el2.style.display = "none"
    }


    const listItems = post.map(product =>
        <li key={product.id}>
            <div className='row'>
                <h1 className='wpis_title'> {product.title.rendered}</h1>
                <p>{product.date.substring(0, 10)}</p>
            </div>
            <div className='row'>
                <div className='col'>
                    <img alt={product.acf.zdj.id}
                        src={product.acf.zdj.url}
                        width="500" height="300"
                    />
                </div>
                <div className='col opis'>
                    <p> {product.acf.opis}</p>
                    <MyButton znacznik="button_normal" opis='Więciej' onClick={() => handleClick(product.id)} />
                    <MyButton znacznik='button_wstecz' opis="Wstecz" onClick={() => handleClickBack()} />
                </div>
            </div>
        </li>
    );

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