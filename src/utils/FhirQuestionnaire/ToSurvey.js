import {FhirQuestionTypes} from './Mapping'

export const Transform = (fhirQuestionnair) => {
    let survey = {
        pages: []
    }
    return ParseItems(fhirQuestionnair.item, survey)
}

const ParseItems = (items, survey, page) =>{
    items.forEach((item) => {
        if(item.type === "group"){
            page = NewPage(item, survey);
            ParseItems(item.item, survey, page)
        }else{
            if(page === undefined){
                page = NewPage(item, survey);
            }
            var question = ItemToQuestion(item);
            page.elements.push(question);
        }
    })
    return survey
}


const NewPage = (item, survey) =>{
    let page = {
        name: item.linkId, 
        title: item.text,
        elements: [],
    };
    survey.pages.push(page)
    return page;
}

const ItemToQuestion = (item) => {
    var question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
    question.name = item.linkId;
    question.title = item.text;
    question.required = item.required? true: false;
    if(item.type === "choice" || item.type === "open-choice" ){
        question = AddChoices(item, question);
    }
    return question;
}

const AddChoices = (item, question) =>{
    item.answerOption.forEach(answer => {
        question.choices.push(NewChoice(answer));
    })
    return question;
}

const NewChoice = (answer) => {
    if(answer["valueCoding"] !== undefined ){
        return {
            value: answer.valueCoding.code,
            text: answer.valueCoding.code,
        }
    }
    return {}
}
