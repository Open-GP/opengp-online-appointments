import firstPatient from "../data/patients/1.json"
import secondPatient from "../data/patients/2.json"

class Api {

    constructor() {
        this.patientsJson = {
            "1": firstPatient,
            "2": secondPatient
        }
    }

    getPatients() {
        return [
            new Patient("1", "Garth WRIGHT"),
            new Patient("2", "Mike MEAKIN")
        ]
    }

    getPatient(id) {
        return this.patientsJson[id]
    }
}

class Patient {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export default Api;