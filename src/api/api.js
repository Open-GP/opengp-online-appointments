import GPConnectDemonstratorApi from "./GPConnectDemonstratorApi";

const Api = {

    defaultNhsNos: ["9658218865", "9658218873", "9658218989"],

    getPatientSummaries: async () => {
        const responses = await Promise.all(Api.defaultNhsNos.map(nhsNo => GPConnectDemonstratorApi.getPatient(nhsNo)));

        return responses
            .filter(response => !!response)
            .map(fhirPatient => new PatientSummary(fhirPatient))
    },

    getFhirPatient: nhsNo =>  GPConnectDemonstratorApi.getPatient(nhsNo)
};

class PatientSummary {

    constructor(fhirPatient) {
        this.nhsNo = fhirPatient.identifier[0].value;
        this.name = fhirPatient.name[0].text;
    }
}

export default Api;