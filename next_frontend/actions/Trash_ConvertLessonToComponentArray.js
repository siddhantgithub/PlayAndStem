import {ChatBotMessage,OptionsWithButtons} from "../components/ChatInterface/MessageTypeComponents"

//Problem: Need to convert options into callback functions
//What you send is: button text with a call back function
//One option - just populate everything and then render. 
//Other option - just go through one by one and keep on populating

//Algorithm: Start reading an array till you encounter a question
//When you see a question, pause
//For now just read all the messages together till you encounter a question
export default function ConvertLessonToArrayComponent (lessonArray)
{
}

export function GetComponentArrayForNextBlock(lessonArray,clickHandler)
{
    var arrayElem;
    //console.log ("The whole lesson array is " + lessonArray);
    const componentArray = [];
    do {
        arrayElem = lessonArray.shift();
       // console.log ("Individual array element is " + JSON.stringify(arrayElem));
        componentArray.push(ConvertJsonToComponent(arrayElem,clickHandler));
    } while ((arrayElem.type == "TM" || arrayElem.type == "TMR") && lessonArray.length > 0);
    //console.log ("Returned array is ", componentArray);

    return componentArray;
}


export function ConvertJsonToComponent (arrayElem,clickHandler)
{
    switch (arrayElem.type)
    {
        case "TM":
            return <ChatBotMessage message = {arrayElem.message}/>;
         break;

        case "TMR":
            return <ChatBotMessage message = {replaceTextInMessage(arrayElem)}/>;
        break;

        case "QWBO":
             var optionsArray = arrayElem.options.map( (option) =>  {return {
                                                    text:option.text, 
                                                    onClick:(e) => {clickHandler(e,option.onClickResponse)}
                                                }}
                                 );     
            return  <OptionsWithButtons options = {optionsArray}/>;
        break; 
    }
}

function replaceTextInMessage (arrayElem)
{
    switch (arrayElem.type)
    {
        case "TMR":
            return arrayElem.message.replace("<learnername>","Daksh");

            break;
    }
}