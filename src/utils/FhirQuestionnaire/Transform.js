import FhirQuestionTypes from './Mapping';

const Transform = (fhirQuestionnair) => parseToPages(fhirQuestionnair);

const parseToPages = (fhirQuestionnair) => {
  const survey = {
    pages: [],
  };

  survey.pages = fhirQuestionnair.item.map((item) => {
    const page = newPage(item);
    page.elements = item.type === 'group'
      ? parseItems(item.item)
      : parseItems([item]);
    return page;
  });

  return survey;
};

const parseItems = (items, parent) => items.map((item) => {
  if (item.item !== undefined) {
    const pannel = childrenToPannel(item);
    if (item.type !== 'group') {
      pannel.elements = [itemToQuestion(item, parent), ...pannel.elements];
    }
    return pannel;
  }
  return itemToQuestion(item, parent);
});

const childrenToPannel = (item) => ({
  name: `${item.linkId}-panel`,
  title: item.text,
  type: 'panel',
  elements: parseItems(item.item, item),
});

const newPage = (item) => {
  const page = {
    name: `${item.linkId}-page`,
    title: item.text,
    elements: [],
  };
  return page;
};

const itemToQuestion = (item, parent) => {
  let question = JSON.parse(JSON.stringify(FhirQuestionTypes[item.type]));
  question.name = item.linkId;
  question.title = item.text;
  question.required = !!item.required;
  question = addChoices(item, question);
  question = transformDisplayLogic(parent, question);
  return question;
};

const addChoices = (item, question) => {
  if (item.type === 'choice' || item.type === 'open-choice') {
    item.answerOption.forEach((answer) => {
      question.choices.push(newChoice(answer));
    });
  }
  return question;
};

const transformDisplayLogic = (parent, question) => {
  let quest = question;
  if (parent !== undefined) {
    if (parent.type === 'boolean') {
      quest = transformCondionalBooleanQuestion(parent, quest);
    } else if (parent.enableWhen !== undefined) {
      quest = transformEnableWhenLogic(parent, quest);
    }
  }
  return quest;
};

const transformCondionalBooleanQuestion = (parent, question) => ({
  ...question,
  visibleIf: `{${parent.linkId}} = 'true'`,
});

const transformEnableWhenLogic = (parent, question) => {
  let logic = transformOperatorLogic(parent);
  logic = transformBehaviorLogic(parent, logic);

  return {
    ...question,
    visibleIf: logic,
  };
};

const transformOperatorLogic = (parent) => parent.enableWhen.map((condition) => {
  if (condition.operator === 'exists') {
    return `{${condition.question}} notempty`;
  }
  const answer = Object.keys(condition).filter((key) => key.includes('answer'));
  return `{${condition.question}} ${condition.operator} ${condition[answer]}`;
});

const transformBehaviorLogic = (parent, logic) => {
  const behavior = { any: 'or', all: 'and' };
  if (parent.enableBehavior) {
    return logic.join(` ${behavior[parent.enableBehavior]} `);
  } if (logic.length === 1) {
    return logic[0];
  }
  throw new Error('Must have enableBehavior');
};

const newChoice = (answer) => {
  if ('valueCoding' in answer) {
    return {
      value: answer.valueCoding.code,
      text: answer.valueCoding.code,
    };
  }
  return {};
};

export const Transformer = {
  parseToPages,
  parseItems,
  newPage,
  childrenToPannel,
  transformDisplayLogic,
  transformCondionalBooleanQuestion,
  transformEnableWhenLogic,
  newChoice,
};

export default Transform;
