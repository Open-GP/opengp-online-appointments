import Transform, { Transformer } from './Transform';
import TestCases from './Test Cases/AllTestCases';

const { transformEnableWhenLogic } = Transformer;

describe('Transforms FHIR Questionnair to Survey JS JSON Format', () => {
  test.each(TestCases)('%o', ({ input, output }) => {
    expect(Transform(input)).toEqual(output);
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
