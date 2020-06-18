import {FhirQuestionTypes, FhirParentTypes} from './Mapping'

export const Transform = (fhirQuestionnair) => {
    let survey = {
        pages: []
    }

    return ParseItems(fhirQuestionnair.item, survey)
}

const ParseItems = (items, survey, page) =>{
    items.map((item) => {
        if(page === undefined){
            page = NewPage(item);
            survey.pages.push(page)
        }

        if(item.type === "group"){
            ParseItems(item.item, survey, page)
        }else{
            var question = ItemToQuestion(item);
            page.elements.push(question);
        }
    })
    return survey
}


const NewPage = (item) =>{
    return {
        name: item.linkId, 
        title: item.text,
        elements: [],
    };
}

const ItemToQuestion = (item, question) =>{
    var question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
    question.name = item.linkId;
    question.title = item.text;
    question.required = item.required? true: false;

    return question;
}
