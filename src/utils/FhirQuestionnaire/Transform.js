import FhirQuestionTypes from './Mapping';

const Transform = (fhirQuestionnair) => ParseToPages(fhirQuestionnair);

const ParseToPages = (fhirQuestionnair) => {
  const survey = {
    pages: [],
  };

  survey.pages = fhirQuestionnair.item.map((item) => {
    const page = NewPage(item);
    if (item.type === 'group') {
      page.elements = ParseItems(item.item);
    } else {
      page.elements = ParseItems([item]);
    }
    return page;
  });

  return survey;
};

const ParseItems = (items) => items.map((item) => {
  if (item.item !== undefined) {
    const pannel = GroupToPannel(item);
    if (item.type !== 'group') {
      pannel.elements = [ItemToQuestion(item), ...pannel.elements];
    }
    return pannel;
  }
  return ItemToQuestion(item);
});

const NewPage = (item) => {
  const page = {
    name: item.linkId,
    title: item.text,
    elements: [],
  };
  return page;
};

const ItemToQuestion = (item) => {
  let question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
  question.name = item.linkId;
  question.title = item.text;
  question.required = !!item.required;
  if (item.type === 'choice' || item.type === 'open-choice') {
    question = AddChoices(item, question);
  }
  return question;
};

const GroupToPannel = (group) => ({
  name: group.linkId,
  title: group.text,
  type: 'panel',
  elements: ParseItems(group.item),
});

const AddChoices = (item, question) => {
  item.answerOption.forEach((answer) => {
    question.choices.push(NewChoice(answer));
  });
  return question;
};

const NewChoice = (answer) => {
  if ('valueCoding' in answer) {
    return {
      value: answer.valueCoding.code,
      text: answer.valueCoding.code,
    };
  }
  return {};
};

export default Transform;
