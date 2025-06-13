import welcomeTextStyle from './WelcomeText.module.css'
const WelcomeText = ({ text, textLetterNumber }) => {
    return (
        <div className={`${welcomeTextStyle.containerOfText} `} dataText={textLetterNumber} >

            <h1 className={`${welcomeTextStyle.text} `}>{text}</h1>

        </div>

    )
}
export default WelcomeText