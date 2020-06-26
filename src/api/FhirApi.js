import GPConnectDemonstratorApi from './GPConnectDemonstratorApi';

class PatientSummary {
  constructor(fhirPatient) {
    this.nhsNo = fhirPatient.identifier[0].value;
    this.name = fhirPatient.name[0].text;
  }
}

const getFirst = (structuredRecord, resourceType) => {
  const matchingResources = structuredRecord.entry
    .filter((resource) => resource.resource.resourceType === resourceType);
  if (matchingResources.length > 0) {
    return matchingResources[0].resource;
  }
  return {};
};

const getList = (structuredRecord, resourceType) => {
  const matchingResources = structuredRecord.entry
    .filter((resource) => resource.resource.resourceType === resourceType);
  return matchingResources.map((m) => m.resource);
};

const FhirApi = {

  defaultNhsNos: ['9658218865', '9658218873', '9658218989'],

  getPatientSummaries: async () => {
    const responses = await Promise.all(FhirApi.defaultNhsNos
      .map((nhsNo) => GPConnectDemonstratorApi.getPatient(nhsNo)));

    return responses
      .filter((response) => !!response)
      .map((fhirPatient) => new PatientSummary(fhirPatient));
  },

  getPatientInformation: async (nhsNo) => {
    const structuredRecord = await GPConnectDemonstratorApi.getStructuredRecord(nhsNo);

    const fhirPatient = getFirst(structuredRecord, 'Patient');
    const fhirMedicationStatements = getList(structuredRecord, 'MedicationStatement')
      .sort((a, b) => new Date(b.dateAsserted) - new Date(a.dateAsserted));
    // console.log(fhirMedicationStatements);
    return { fhirPatient, fhirMedicationStatements };
  },

  getFhirPatient: (nhsNo) => GPConnectDemonstratorApi.getStructuredRecord(nhsNo),
};

export default FhirApi;
