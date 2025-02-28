import IntroduceStyle from "../scss/Introduce.module.scss"
function Introduce({label, icon}) {
    return ( 
        <div className={IntroduceStyle.introduceContainer}>
            {icon}
            <span>{label}</span>
        </div>
     );
}

export default Introduce;