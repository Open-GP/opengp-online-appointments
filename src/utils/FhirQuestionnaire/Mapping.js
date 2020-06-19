export const FhirQuestionTypes = {
    boolean:  {
        type: "radiogroup",
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
    decimal: {
        type: "text",
        inputType: "number",
        validators: [
            {
                type: "regex",
                text: "Must be a decimal number",
                regex: "-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?"
            }
        ]
    },
    integer: {
        type: "text",
        inputType: "number",
        validators: [
            {
                type: "regex",
                text: "Must be whole number",
                regex: "^([0]|[-+]?[1-9][0-9]*)$"
            }
        ]
    },
    date: {
        type: "text",
        inputType: "date",
        max: "2999-12-31"
    },
    dateTime: {
        type: "text",
        inputType: "datetime-local",
        max: "2999-12-31"
    },
    string: { 
        type:"text"
    },
    text: {},
    url: {},
    choice: {},
    openChoice: {},
    attachment: {},
    refrence: {},
    quanity: {}
}