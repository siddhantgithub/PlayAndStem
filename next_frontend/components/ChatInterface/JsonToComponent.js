import {QuestionBlock, TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons,PythonCodeComponent,ShowImage, ShowCelebration,SendTextToAIComponent} from './MessageTypeComponentsWithAnimation'
import Fade from '@mui/material/Fade';
//import LayoutForCodeCheck from './CodeCheckLayout';

function replaceTextInMessage (arrayElem,session)
{
    switch (arrayElem.type)
    {
        case "TMR":
            return arrayElem.message.replace("<learnername>",session.user.username);
    }
}

//Problem: clicking option changes component structure conditionally 
//Problme: What to do?
//There are two options: a) one component with conditions
//second change dom only after clicked -- how to do it?? have a callback from original class
//Need to decide
export function ConvertJsonToComponent (arrayElem,clickHandler,session,key,onChangePythonCode = null)
{
    var reactElement;
    switch (arrayElem.type)
    {
        case "TM":
        case "TMR":
            {
                if (clickHandler == null)
                    return <ChatBotMessage message = {arrayElem.type == "TM"? arrayElem.message:replaceTextInMessage(arrayElem,session) } key={key} onComplete={null}/>
                    
                const onComplete = () =>    {clickHandler(null,"TMCOMPLETE")};
                return <ChatBotMessage message = {arrayElem.type == "TM"? arrayElem.message:replaceTextInMessage(arrayElem,session) } key={key} onComplete={onComplete}/>;
                break;
            }

        case "QWBO":
            var optionsArray = arrayElem.options.map( (option) =>  {return {
                        text:option.text, 
                        onClick:(e) => {clickHandler(e,option.text,option.onClickResponse)}
                    }}
                );  
                reactElement = <OptionsWithButtons options = {optionsArray} key={key}/>  
            return  reactElement;
        break; 
        case "QWBOL":
            var optionsArray = arrayElem.options.map( (option) =>  {return {
                        text:option.text, 
                        onClick:(e) => {clickHandler(e,option.text,option.onClickResponse)}
                    }}
                );  
                reactElement = <Fade in={true} key={key}><LongOptionsWithButtons options = {optionsArray} /></Fade>   
            return  reactElement;
        break; 
        case "QUESTION":
            var optionsArray = arrayElem.options.map( (option) =>  {return {
                        text:option.text, 
                        onClick:(e) => {clickHandler(e,option.text,option.onClickResponse)}
                    }}
                );  
                var codeBlock = null;
                //console.log ("Array elem is", arrayElem);
                if (arrayElem.codeblock.length > 0)
                {
                    codeBlock = arrayElem.codeblock.join ("\n");
                    //console.log ("Value of codeblock is",codeBlock);
                }
                reactElement = <Fade in={true} key={key}><QuestionBlock question = {arrayElem.question} options = {optionsArray} codeBlock = {codeBlock}/></Fade>   
            return  reactElement;
        break; 
        case "ack":
            {
                
            const onClick = (e) => {clickHandler(e,"ackclick")} ;
            var buttonText;
            if (arrayElem.buttonText === undefined)
                buttonText = "Next";
            else
                buttonText = arrayElem.buttonText;
                
            return <AcknowledgementQuestion buttonText = {buttonText} message = {arrayElem.message} onClick = {onClick} key={key}/>; 
            break;
            }

        case "acksp":
            {
                if (arrayElem.buttonText === undefined)
                    buttonText = "Next";
                else
                    buttonText = arrayElem.buttonText;
                const onClick = (e) => {clickHandler(e,"ackspclick",arrayElem.data)} ;
                return <AcknowledgementQuestion buttonText = {buttonText} message = {arrayElem.message} onClick = {onClick} key={key}/>; 
                break;
            }
        case "chpyco":
            {
                const onClick = (e) => {clickHandler(e,"chpyco",arrayElem)} ;
                return <AcknowledgementQuestion message = {arrayElem.message} onClick = {onClick} key={key}/>; 
                break;
            }

            case "chpycon":
                {
                    const onClick = (e) => {clickHandler(e,"chpycon",arrayElem)} ;
                    //setMaxWidth("lg");
                    return <LayoutForCodeCheck blockToExecute={arrayElem} onDone={onClick}/>; 
                    break;
                }

        case "block":
            lessonBlock.current = arrayElem.block;

        case "pycb":
            return <PythonCodeComponent onChange={onChangePythonCode} value={arrayElem.value}  key={key}/>;

        case "image":
            return <ShowImage imagePath={arrayElem.path} altText = {arrayElem.altText} key={key}/>;
            break;
        case "missionendcelebration":
            return <ShowCelebration/>;
            break;

        case "askquestion":
            {
                return <SendTextToAIComponent clickHandler={clickHandler} interactiontype="askquestion" key={key}/>;
            }

        case "sharetext":
        {
            return <SendTextToAIComponent clickHandler={clickHandler} interactiontype="sharetext" context={arrayElem.context} key={key}/>;
        }
    }
}