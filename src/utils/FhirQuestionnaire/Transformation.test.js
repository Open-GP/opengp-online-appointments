import Transform, { Transformer } from './Transform';
import TestCases from './Test Cases/AllTestCases';

const { getEnableWhenLogic } = Transformer;

describe('Transforms FHIR Questionnair to Survey JS JSON Format', () => {
  test.each(TestCases)('%o', ({ input, output }) => {
    expect(Transform(input)).toEqual(output);
  });

  test('Boolean condtional logic', () => {
    const parent = {
      enableWhen: [
        {
          question: 'testQuestionID',
          operator: '=',
          answerBoolean: 'true',
        },
      ],
    };

    const output = {
      visibleIf: '{testQuestionID} = true',
    };

    expect(getEnableWhenLogic(parent, {})).toEqual(output);
  });
});
