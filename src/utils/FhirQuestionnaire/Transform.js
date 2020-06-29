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

const ParseItems = (items, parent) => items.map((item) => {
  if (item.item !== undefined) {
    const pannel = ChildrenToPannel(item);
    if (item.type !== 'group') {
      pannel.elements = [ItemToQuestion(item, parent), ...pannel.elements];
    }
    return pannel;
  }
  return ItemToQuestion(item, parent);
});

const ChildrenToPannel = (item) => ({
  name: item.linkId,
  title: item.text,
  type: 'panel',
  elements: ParseItems(item.item, item),
});

const NewPage = (item) => {
  const page = {
    name: item.linkId,
    title: item.text,
    elements: [],
  };
  return page;
};

const ItemToQuestion = (item, parent) => {
  let question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
  question.name = item.linkId;
  question.title = item.text;
  question.required = !!item.required;
  question = AddChoices(item, question);
  question = AddDisplayLogic(parent, question);
  return question;
};

const AddChoices = (item, question) => {
  if (item.type === 'choice' || item.type === 'open-choice') {
    item.answerOption.forEach((answer) => {
      question.choices.push(NewChoice(answer));
    });
  }
  return question;
};

const AddDisplayLogic = (parent, question) => {
  let quest = question;
  if (parent !== undefined) {
    if (parent.type === 'boolean') {
      quest = AddCondionalBooleanQuestion(parent, quest);
    }
  }
  return quest;
};

const AddCondionalBooleanQuestion = (parent, question) => ({
  ...question,
  visibleIf: `{${parent.linkId}} = 'true'`,
});

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
