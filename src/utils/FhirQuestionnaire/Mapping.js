export const FhirQuestionTypes = {
    boolean:  {
        type: "radiogroup",
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
    decimal: {},
    interger: {},
    date: {},
    dateTime: {},
    string: {type:"text"},
    text: {},
    url: {},
    choice: {},
    openChoice: {},
    attachment: {},
    refrence: {},
    quanity: {}
}