import {QuestionBlock, TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons,PythonCodeComponent} from './MessageTypeComponentsWithAnimation'
import Fade from '@mui/material/Fade';
import LayoutForCodeCheck from './CodeCheckLayout';

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
            return <ChatBotMessage message = {arrayElem.message} key={key}/>;
        break;

        case "TMR":
            return <ChatBotMessage message = {replaceTextInMessage(arrayElem,session) }  key={key}/>;
        break;

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
                reactElement = <Fade in={true} key={key}><QuestionBlock question = {arrayElem.question} options = {optionsArray} /></Fade>   
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
                const onClick = (e) => {clickHandler(e,"ackspclick",arrayElem.data)} ;
                return <AcknowledgementQuestion message = {arrayElem.message} onClick = {onClick} key={key}/>; 
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
            //we need to replace the current block with 
    }
}