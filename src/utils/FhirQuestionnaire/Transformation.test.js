import {Transform} from './ToSurvey'

describe("Transforms FHIR Questionnair to Survey JS", () => {
    test('It should make an empty questionnair', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: [
            "Patient"
            ],
            item: []
        }

        const output = {
            "pages": []
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a string question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "1",
                    text: "What is your gender?",
                    type: "string"
                }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "1",
                    title: "What is your gender?",
                    elements: [
                        {
                            type: "text",
                            title: "What is your gender?",
                            name: "1",
                            required: false,
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a date question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "1",
                    text: "What is your date of birth?",
                    type: "date"
                }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "1",
                    title: "What is your date of birth?",
                    elements: [
                        {
                            type: "text",
                            title: "What is your date of birth?",
                            name: "1",
                            required: false,
                            inputType: "date",
                            max: "2999-12-31"
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a dateTime question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "vitaminiKDose1",
                    text: "1st dose",
                    type: "dateTime"
                  },
            ]
        }

        const output = {
            "pages": [
                {
                    name: "vitaminiKDose1",
                    title: "1st dose",
                    elements: [
                        {
                            type: "text",
                            title: "1st dose",
                            name: "vitaminiKDose1",
                            required: false,
                            inputType: "datetime-local",
                            max: "2999-12-31"
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });
    test('It transforms a decimal question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "birthWeight",
                    text: "Birth weight (kg)",
                    type: "decimal"
                  }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "birthWeight",
                    title: "Birth weight (kg)",
                    elements: [
                        {

                            title: "Birth weight (kg)",
                            name: "birthWeight",
                            required: false,
                            type: "text",
                            inputType: "number",
                            validators: [
                                {
                                    type: "regex",
                                    text: "Must be a decimal number",
                                    regex: "-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });


    test('It transforms a integer question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "Age",
                    text: "Age in years",
                    type: "integer"
                  }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "Age",
                    title: "Age in years",
                    elements: [
                        {

                            title: "Age in years",
                            name: "Age",
                            required: false,
                            type: "text",
                            inputType: "number",
                            validators: [
                                {
                                    type: "regex",
                                    text: "Must be whole number",
                                    regex: "^([0]|[-+]?[1-9][0-9]*)$"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });


    test('It transforms a boolean question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    linkId: "1",
                    text: "Do you have allergies?",
                    type: "boolean"
                }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "1",
                    title: "Do you have allergies?",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "1",
                            required: false,
                            title: "Do you have allergies?",
                            choices: [
                                {
                                    value: true,
                                    text: "Yes"
                                },
                                {
                                    value: false,
                                    text: "No"
                                }
                            ]      
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a choice question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    "linkId": "vitaminKgiven",
                    "text": "Vitamin K given",
                    "type": "choice",
                    "answerOption": [
                      {
                        "valueCoding": {
                          "code": "INJECTION"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "INTRAVENOUS"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "ORAL"
                        }
                      }
                    ]
                }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "vitaminKgiven",
                    title: "Vitamin K given",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "vitaminKgiven",
                            required: false,
                            title: "Vitamin K given",
                            choices: [
                                {
                                    value: "INJECTION",
                                    text: "INJECTION"
                                },
                                {
                                    value: "INTRAVENOUS",
                                    text: "INTRAVENOUS"
                                },
                                {
                                    value: "ORAL",
                                    text: "ORAL"
                                }
                            ]      
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a open-choice question', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [  
                {
                    "linkId": "vitaminKgiven",
                    "text": "Vitamin K given",
                    "type": "open-choice",
                    "answerOption": [
                      {
                        "valueCoding": {
                          "code": "INJECTION"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "INTRAVENOUS"
                        }
                      },
                      {
                        "valueCoding": {
                          "code": "ORAL"
                        }
                      }
                    ]
                }
            ]
        }

        const output = {
            "pages": [
                {
                    name: "vitaminKgiven",
                    title: "Vitamin K given",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "vitaminKgiven",
                            required: false,
                            title: "Vitamin K given",
                            hasOther: true,
                            choices: [
                                {
                                    value: "INJECTION",
                                    text: "INJECTION"
                                },
                                {
                                    value: "INTRAVENOUS",
                                    text: "INTRAVENOUS"
                                },
                                {
                                    value: "ORAL",
                                    text: "ORAL"
                                }
                            ]      
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a group of boolean questions', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [ 
                {
                    linkId: "1",
                    text: "General questions",
                    type: "group",
                    item: [
                        {
                            linkId: "1",
                            text: "Do you have allergies?",
                            type: "boolean"
                        },
                        {
                            linkId: "2",
                            text: "Do you take any medication for allergies?",
                            type: "boolean"
                        }
                    ]
                }
            ]
        }

        const output = {
            pages: [
                {
                    name: "1",
                    title:"General questions",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "1",
                            required: false,
                            title: "Do you have allergies?",
                            choices: [
                                {
                                    value: true,
                                    text: "Yes"
                                },
                                {
                                    value: false,
                                    text: "No"
                                }
                            ]       
                        },
                        {
                            type: "radiogroup",
                            name: "2",
                            required: false,
                            title: "Do you take any medication for allergies?",
                            choices: [
                                {
                                    value: true,
                                    text: "Yes"
                                },
                                {
                                    value: false,
                                    text: "No"
                                }
                            ]    
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });

    test('It transforms a question and a group of boolean questions', () => {
        const input = {
            resourceType: "Questionnaire",
            status: "active",
            subjectType: ["Patient"],
            item: [ 
                {
                    linkId: "1",
                    text: "What is your gender?",
                    type: "string"
                },
                {
                    linkId: "2",
                    text: "General questions",
                    type: "group",
                    item: [
                        {
                            linkId: "1",
                            text: "Do you have allergies?",
                            type: "boolean"
                        },
                        {
                            linkId: "2",
                            text: "Do you take any medication for allergies?",
                            type: "boolean"
                        }
                    ]
                }
            ]
        }

        const output = {
            pages: [
                {
                    name: "1",
                    title: "What is your gender?",
                    elements: [
                        {
                            type: "text",
                            title: "What is your gender?",
                            name: "1",
                            required: false,
                        }
                    ]
                },
                {
                    name: "2",
                    title:"General questions",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "1",
                            required: false,
                            title: "Do you have allergies?",
                            choices: [
                                {
                                    value: true,
                                    text: "Yes"
                                },
                                {
                                    value: false,
                                    text: "No"
                                }
                            ]       
                        },
                        {
                            type: "radiogroup",
                            name: "2",
                            required: false,
                            title: "Do you take any medication for allergies?",
                            choices: [
                                {
                                    value: true,
                                    text: "Yes"
                                },
                                {
                                    value: false,
                                    text: "No"
                                }
                            ]    
                        }
                    ]
                }
            ]
        }

        expect(Transform(input)).toEqual(output);
    });
});