import Transform, { Transformer } from './Transform';
import TestCases from './Test Cases/AllTestCases';

const { newPage, transformEnableWhenLogic } = Transformer;

describe('Transforms FHIR Questionnair to Survey JS JSON Format', () => {
  test.each(TestCases)('%o', ({ input, output }) => {
    expect(Transform(input)).toEqual(output);
  });
});

describe('Transforms into pages', () => {
  test('Transforms item into page', () => {
    const item = {
      linkId: 'test',
      text: 'Test',
    };

    const output = {
      name: 'test-page',
      title: 'Test',
      elements: [],
    };

    expect(newPage(item)).toEqual(output);
  });
});

describe('Transforms EnableWhen logic', () => {
  test('Transforms a condtional statement', () => {
    const parent = {
      enableWhen: [
        {
          question: 'testQuestionID',
          operator: '=',
          answerBoolean: true,
        },
      ],
    };

    const output = {
      visibleIf: '{testQuestionID} = true',
    };

    expect(transformEnableWhenLogic(parent, {})).toEqual(output);
  });

  test.each`behavior    | expected 
    ${'all'}     | ${'and'}
    ${'any'}     | ${'or'}  
    ${undefined} | ${''} `('Transforms multiple condtional statments with behavior $behavior',
  ({ behavior, expected }) => {
    const parent = {
      enableWhen: [
        {
          question: 'testQuestionID',
          operator: '=',
          answerBoolean: true,
        },
        {
          question: 'testQuestionID2',
          operator: '=',
          answerBoolean: true,
        },
      ],
      enableBehavior: behavior,
    };

    const output = {
      visibleIf: `{testQuestionID} = true ${expected} {testQuestionID2} = true`,
    };

    if (behavior === undefined) {
      expect(() => { transformEnableWhenLogic(parent, {}); }).toThrow('Must have enableBehavior');
    } else {
      expect(transformEnableWhenLogic(parent, {})).toEqual(output);
    }
  });
});
