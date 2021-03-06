const axios = require('axios');
const { uuid } = require('uuidv4');
const CryptoJS = require('crypto-js');

const demoServerBaseUrl = 'https://orange.testlab.nhs.uk/gpconnect-demonstrator/v1/fhir';

// Code taken from postman collection shared on https://orange.testlab.nhs.uk/
const generateJwtToken = (baseUrl) => {
  const requestingOrganizationODSCode = 'GPC001';

  // Construct the JWT token for the request
  const currentTime = new Date();
  const expiryTime = new Date(currentTime.getTime() + 300000); // 5 mins after current time
  const jwtCreationTime = Math.round(currentTime.getTime() / 1000);
  const jwtExpiryTime = Math.round(expiryTime.getTime() / 1000);

  const header = {
    alg: 'none',
    typ: 'JWT',
  };

  const payload = {
    iss: 'http://gpconnect-postman-url',
    sub: '1',
    aud: baseUrl,
    exp: jwtExpiryTime,
    iat: jwtCreationTime,
    reason_for_request: 'directcare',
    requested_scope: 'patient/*.read',
    requesting_device: {
      resourceType: 'Device',
      id: '1',
      identifier: [
        {
          system: 'Web Interface',
          value: 'Postman example consumer',
        },
      ],
      model: 'Postman',
      version: '1.0',
    },
    requesting_organization: {
      resourceType: 'Organization',
      identifier: [
        {
          system: 'https://fhir.nhs.uk/Id/ods-organization-code',
          value: requestingOrganizationODSCode,
        },
      ],
      name: 'Postman Organization',
    },
    requesting_practitioner: {
      resourceType: 'Practitioner',
      id: '1',
      identifier: [
        {
          system: 'https://fhir.nhs.uk/Id/sds-user-id',
          value: 'G13579135',
        },
        {
          system: 'https://fhir.nhs.uk/Id/sds-role-profile-id',
          value: '111111111',
        },
      ],
      name: [
        {
          family: 'Demonstrator',
          given: ['GPConnect'],
          prefix: ['Mr'],
        },
      ],
    },
  };

  const base64url = (source) => {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
  };

  // Encode the JWT data into the base64url encoded string
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
  const encodedPayload = base64url(stringifiedPayload);
  return `${encodedHeader}.${encodedPayload}.`;
};

const jwtString = generateJwtToken(demoServerBaseUrl);

const authHeaders = (interaction) => ({
  Authorization: `Bearer ${jwtString}`,
  Accept: 'application/fhir+json',
  'Ssp-From': '200000000359',
  'Ssp-To': '918999198993',
  'Ssp-TraceID': uuid(),
  'Ssp-InteractionID': interaction,
});

const retrievePatient = (baseurl, nhsNo) => {
  const config = {
    params: {
      identifier: `https://fhir.nhs.uk/Id/nhs-number|${nhsNo}`,
    },
    headers: authHeaders(
      'urn:nhs:names:services:gpconnect:fhir:rest:search:patient-1',
    ),
  };

  return axios
    .get(`${baseurl}/Patient`, config)
    .then((result) => result.data.entry[0].resource)
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('error retrieving for:', nhsNo);
    });
};

const retrieveStructuredRecord = (baseurl, nhsNo) => {
  const body = {
    resourceType: 'Parameters',
    parameter: [
      {
        name: 'patientNHSNumber',
        valueIdentifier: {
          system: 'https://fhir.nhs.uk/Id/nhs-number',
          value: nhsNo,
        },
      },
      {
        name: 'includeAllergies',
        part: [
          {
            name: 'includeResolvedAllergies',
            valueBoolean: true,
          },
        ],
      },
      {
        name: 'includeMedication',
        part: [
          {
            name: 'includePrescriptionIssues',
            valueBoolean: true,
          },
          {
            name: 'medicationSearchFromDate',
            valueDate: '2015-01-01',
          },
        ],
      },
    ],
  };

  return axios({
    method: 'POST',
    url: `${baseurl}/Patient/$gpc.getstructuredrecord`,
    data: body,
    headers: {
      ...authHeaders(
        'urn:nhs:names:services:gpconnect:fhir:operation:gpc.getstructuredrecord-1',
      ),
      'Content-Type': 'application/fhir+json',
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('error retrieving structured record', error);
    });
};

const GPConnectDemonstratorApi = {
  getPatient: (nhsNo) => retrievePatient(demoServerBaseUrl, nhsNo),
  getStructuredRecord: (nhsNo) => retrieveStructuredRecord(demoServerBaseUrl, nhsNo),
};

export default GPConnectDemonstratorApi;
