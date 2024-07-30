

// eslint-disable-next-line react/prop-types
export function MyButton({ opis, onClick, znacznik }) {

    return (
        <button className={znacznik} id="button_display" onClick={onClick}>
            {opis}
        </button>
    )
}