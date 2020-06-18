import {Transform} from './ToSurvey'

describe("Transforsm FHIR Questionnair to Survey JS", () => {
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

    test('It transform a string question', () => {
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


    test('It transform a boolean question', () => {
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
                                    value: "item1",
                                    text: "Yes"
                                },
                                {
                                    value: "item2",
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
                                    value: "item1",
                                    text: "Yes"
                                },
                                {
                                    value: "item2",
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
                                    value: "item1",
                                    text: "Yes"
                                },
                                {
                                    value: "item2",
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
                                    value: "item1",
                                    text: "Yes"
                                },
                                {
                                    value: "item2",
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
                                    value: "item1",
                                    text: "Yes"
                                },
                                {
                                    value: "item2",
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