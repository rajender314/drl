import React from 'react';
import {
    Container,
} from './icon-components';


import {
    Cardiologist,
    GeneralPhysician,
    Oncology,
    OccupationalTherapy,
    Orthopaedician_Rheumatologist,
    Otorhinolaryngology,
    Pathology,
    PediatricSurgery,
    Pediatrics,
    PhysicalMedicine_Rehabilitation,
    PlasticSurgery,
    Psychiatry,
    Chest_Pulmonologist,
    RadiationOncology,
    Rheumatology,
    SleepMedicine,
    SportsMedicine,
    Surgery,
    Urologist,
    VascularSurgery,
    Gynaecology,
    ConsultantPhysician,
    ENTSpecialist,
    GeneralPractitioner,
    Ophthalmologist,
    Paediatrician,
    Hematology,
    Anesthesiology,
    CardiothoracicSurgery,
    Dentist,
    Dermatologist,
    DiagnosticRadiology,
    EmergencyMedicine,
    Endocrinologist_Diabetologist,
    FamilyMedicine,
    Gastroenterologist,
    GeneralSurgeon,
    GeriatricMedicine,
    Allergy_Immunology,
    InfectiousDisease,
    IntensiveCare,
    InternalMedicine,
    InterventionalCardiology,
    InterventionalRadiology,
    MedicalGenetics,
    Nephrologist,
    Neurologist,
    Neurosurgery,
    NuclearMedicine,
    Obstetrics_Gynecology
} from './icon-list';
type Props = {
    name: any
    background?: any
};
const iconNames: any = {
    Cardiologist: Cardiologist,
    GeneralPhysician: GeneralPhysician,
    Oncology: Oncology,
    OccupationalTherapy: OccupationalTherapy,
    Orthopaedician_Rheumatologist: Orthopaedician_Rheumatologist,
    Otorhinolaryngology: Otorhinolaryngology,
    Pathology: Pathology,
    PediatricSurgery: PediatricSurgery,
    Pediatrics: Pediatrics,
    PhysicalMedicine_Rehabilitation: PhysicalMedicine_Rehabilitation,
    PlasticSurgery: PlasticSurgery,
    Psychiatry: Psychiatry,
    Chest_Pulmonologist: Chest_Pulmonologist,
    RadiationOncology: RadiationOncology,
    Rheumatology: Rheumatology,
    SleepMedicine: SleepMedicine,
    SportsMedicine: SportsMedicine,
    Surgery: Surgery,
    Urologist: Urologist,
    VascularSurgery: VascularSurgery,
    Gynaecology: Gynaecology,
    ConsultantPhysician: ConsultantPhysician,
    ENTSpecialist: ENTSpecialist,
    GeneralPractitioner: GeneralPractitioner,
    Ophthalmologist: Ophthalmologist,
    Paediatrician: Paediatrician,
    Hematology: Hematology,
    Anesthesiology: Anesthesiology,
    CardiothoracicSurgery: CardiothoracicSurgery,
    Dentist: Dentist,
    Dermatologist: Dermatologist,
    DiagnosticRadiology: DiagnosticRadiology,
    EmergencyMedicine: EmergencyMedicine,
    Endocrinologist_Diabetologist: Endocrinologist_Diabetologist,
    FamilyMedicine: FamilyMedicine,
    Gastroenterologist: Gastroenterologist,
    GeneralSurgeon: GeneralSurgeon,
    GeriatricMedicine: GeriatricMedicine,
    Allergy_Immunology: Allergy_Immunology,
    InfectiousDisease: InfectiousDisease,
    IntensiveCare: IntensiveCare,
    InternalMedicine: InternalMedicine,
    InterventionalCardiology: InterventionalCardiology,
    InterventionalRadiology: InterventionalRadiology,
    MedicalGenetics: MedicalGenetics,
    Nephrologist: Nephrologist,
    Neurologist: Neurologist,
    Neurosurgery: Neurosurgery,
    NuclearMedicine: NuclearMedicine,
    Obstetrics_Gynecology: Obstetrics_Gynecology
}
export function Specialization({ name, background = false }: Props) {
    try {
        name = name.replace(/ /g, '');
        if (name.includes('/')) {
            name = name.replace(/\//g, '_');
        }
        if (name.includes('&') || name.includes('&&')) {
            name = name.replace(/&/g, '_');
        }

        let Component: any
        if (iconNames[name]) {
            Component = iconNames[name];
        } else if (name.includes(',')) {
            name = name.split(',')
            if (Object.keys(iconNames).indexOf(name[0]) > -1) {

                Component = iconNames[name[0]];
            } else {
                Component = iconNames['GeneralPhysician'];
            }
        }
        else {

            Component = iconNames['GeneralPhysician'];
        }
        //return <Component isBackground={true} />;
        let args: object = { isBackground: background };
        return React.createElement(Component, args);
    } catch (error) {
        let Icon = iconNames['GeneralPhysician'];
        return <Icon />;
    }

}
