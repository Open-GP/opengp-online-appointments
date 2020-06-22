import {FhirQuestionTypes} from './Mapping'

export const Transform = (fhirQuestionnair) => {

    return ParseToPages(fhirQuestionnair)

}

const ParseToPages = (fhirQuestionnair) => {
    let survey = {
        pages: []
    }

    survey.pages = fhirQuestionnair.item.map((item) => {
        let page = NewPage(item)
        if (item.type === "group") {
            page.elements = ParseItems(item.item);
        } else {
            page.elements = ParseItems([item]);
        }
        return page
    })

    return survey;
}

const ParseItems = (items) => {
    return items.map(item => {
        if(item.item !== undefined){
            let pannel = GroupToPannel(item)
            if(item.type !== "group"){
                pannel.elements = [ItemToQuestion(item), ...pannel.elements];
            }
            return pannel;
        }
        return ItemToQuestion(item);
    })  
}

const NewPage = (item) => {
    let page = {
        name: item.linkId, 
        title: item.text,
        elements: [],
    };
    return page;
}

const ItemToQuestion = (item) => {
    let question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
    question.name = item.linkId;
    question.title = item.text;
    question.required = item.required? true: false;
    if(item.type === "choice" || item.type === "open-choice" ){
        question = AddChoices(item, question);
    }
    return question;
}

const GroupToPannel = (group) => {
    return {
        name: group.linkId,
        title: group.text,
        type: "panel",
        elements: ParseItems(group.item),
    }
}

const AddChoices = (item, question) =>{
    item.answerOption.forEach(answer => {
        question.choices.push(NewChoice(answer));
    })
    return question;
}

const NewChoice = (answer) => {
    if("valueCoding" in answer){
        return {
            value: answer.valueCoding.code,
            text: answer.valueCoding.code,
        }
    }
    return {}
}
