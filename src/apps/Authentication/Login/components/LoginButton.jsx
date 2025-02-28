import LoginButtonStyle from "../scss/LoginButton.module.scss"
function LoginButton({ title, handleAction }) {
    return ( 
        <div className={LoginButtonStyle.loginButtonWrapper}>
            <button onClick={() => handleAction()} type="button">
                {title}
            </button>
        </div>
     );
}

export default LoginButton;