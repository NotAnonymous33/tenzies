export default function Dice(props) {

    return (
        // eslint-disable-next-line react/prop-types
        <div className={props.held ? "dice held" : "dice"} onClick={props.dieClick}>
            <h1 className="dice-num">{props.value}</h1>
        </div>
    )

}